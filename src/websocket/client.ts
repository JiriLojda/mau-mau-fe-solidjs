import { createStore } from "solid-js/store";
import type { ClientMessage, ServerMessage } from "./schemas";
import { ServerMessageSchema } from "./schemas";

export class WebSocketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebSocketError";
  }
}

type WebSocketState = {
  connection: WebSocket | null;
  messages: ServerMessage[];
  errors: WebSocketError[];
};

export const createWebSocketClient = (serverUrl: string) => {
  const [state, setState] = createStore<WebSocketState>({
    connection: null,
    messages: [],
    errors: [],
  });

  const addMessage = (message: ServerMessage) =>
    setState("messages", state.messages.length, message);

  const addError = (error: WebSocketError) => setState("errors", state.errors.length, error);

  const setConnection = (connection: WebSocket | null) => setState("connection", connection);

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
            const data = JSON.parse(event.data);
            const parsed = ServerMessageSchema.safeParse(data);

            if (!parsed.success) {
              const error = new WebSocketError(`Invalid message format: ${parsed.error.message}`);
              addError(error);
              return;
            }

            addMessage(parsed.data);
          } catch (error) {
            addError(new WebSocketError(`Failed to parse message: ${String(error)}`));
          }
        };

        ws.onerror = error => {
          const wsError = new WebSocketError(`WebSocket error: ${String(error)}`);
          addError(wsError);
          reject(wsError);
        };

        ws.onclose = () => {
          addError(new WebSocketError("WebSocket connection closed"));
          setConnection(null);
        };
      } catch (error) {
        const wsError = new WebSocketError(`Failed to connect: ${String(error)}`);
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
        const wsError = new WebSocketError(`Failed to send message: ${String(error)}`);
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

  const clearMessages = () => setState("messages", []);

  const clearErrors = () => setState("errors", []);

  return {
    connect,
    send,
    disconnect,
    state,
    clearMessages,
    clearErrors,
  };
};
