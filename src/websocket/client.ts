import { createStore } from "solid-js/store";
import type { ClientMessage, ServerMessage } from "./schemas";
import { ServerMessageSchema } from "./schemas";

const formatError = (error: unknown): string => {
  console.error(error);
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }
  return String(error);
};

export class WebSocketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebSocketError";
  }
}

type WebSocketState = {
  connection: WebSocket | null;
  messages: readonly ServerMessage[];
  errors: readonly WebSocketError[];
};

export const createWebSocketClient = (serverUrl: string) => {
  const [state, setState] = createStore<WebSocketState>({
    connection: null,
    messages: [],
    errors: [],
  });

  const addMessage = (message: ServerMessage) => setState("messages", [...state.messages, message]);

  const addError = (error: WebSocketError) => setState("errors", [...state.errors, error]);

  const setConnection = (connection: WebSocket | null) => setState("connection", connection);

  const clearMessages = () => setState("messages", []);

  const clearErrors = () => setState("errors", []);

  const connect = (): Promise<void> =>
    new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(serverUrl);
        setConnection(ws);

        ws.onopen = () => {
          resolve();
        };

        ws.onmessage = event => {
          try {
            console.log("onmessage", event.data);
            const data = JSON.parse(event.data);
            const parsed = ServerMessageSchema.safeParse(data);

            if (!parsed.success) {
              console.log("invalid message format", parsed.error);
              const error = new WebSocketError(`Invalid message format: ${parsed.error.message}`);
              addError(error);
              return;
            }

            console.log("addMessage", parsed.data);
            addMessage(parsed.data);
          } catch (error) {
            addError(new WebSocketError(`Failed to parse message: ${formatError(error)}`));
          }
        };

        ws.onerror = () => {
          const wsError = new WebSocketError("Unable to connect to game server");
          addError(wsError);
          reject(wsError);
        };

        ws.onclose = () => {
          addError(new WebSocketError("WebSocket connection closed"));
          setConnection(null);
        };
      } catch (error) {
        const wsError = new WebSocketError(`Failed to connect: ${formatError(error)}`);
        addError(wsError);
        reject(wsError);
      }
    });

  const send = (message: ClientMessage): Promise<void> => {
    const connection = state.connection;
    if (!connection || connection.readyState !== WebSocket.OPEN) {
      const error = new WebSocketError("WebSocket is not connected");
      addError(error);
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      try {
        connection.send(JSON.stringify(message));
        resolve();
      } catch (error) {
        const wsError = new WebSocketError(`Failed to send message: ${formatError(error)}`);
        addError(wsError);
        reject(wsError);
      }
    });
  };

  const disconnect = (): Promise<void> => {
    const connection = state.connection;
    if (!connection) return Promise.resolve();

    return new Promise(resolve => {
      connection.onclose = () => {
        setConnection(null);
        resolve();
      };
      connection.close();
    });
  };

  return {
    connect,
    send,
    disconnect,
    state,
    clearMessages,
    clearErrors,
  };
};
