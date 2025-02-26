import { createEffect, createSignal } from "solid-js";
import type { GameState } from "../models/GameState";
import { createWebSocketClient } from "./client";
import type { ServerMessage } from "./schemas";

export const useServer = (serverUrl: string) => {
  const [connectionState, setConnectionState] = createSignal<ConnectionState>({
    type: "notConnected",
    submittedUserName: "",
  });
  const [originalPlayerOrder, setOriginalPlayerOrder] = createSignal<readonly string[]>([]);
  const client = createWebSocketClient(serverUrl);

  const handleServerMessage = (message: Readonly<ServerMessage>) => {
    switch (message.type) {
      case "logIn": {
        if ("error" in message) return;
        const currentState = connectionState();
        setConnectionState({
          type: "connectedOutsideGame",
          userName: currentState.type === "notConnected" ? currentState.submittedUserName : "",
          availableGameIds: message.availableGameIds,
        });
        break;
      }
      case "connectToGame": {
        if ("error" in message) return;
        setConnectionState({
          type: "waitingInLobby",
          userName: message.userName,
          gameId: message.gameId,
          usersInGame: message.usersInGame,
          creatorName: message.usersInGame[0], // The first user in the game is always the creator
        });
        break;
      }
      case "startGame": {
        if ("error" in message) return;
        const currentState = connectionState();
        if (currentState.type !== "waitingInLobby") return;

        // Store the original player order when the game starts
        setOriginalPlayerOrder([...currentState.usersInGame]);

        setConnectionState({
          type: "playingGame",
          userName: currentState.userName,
          gameId: currentState.gameId,
          gameState: transformGameState(message, currentState.userName, currentState.usersInGame),
        });
        break;
      }
      case "turn": {
        if ("error" in message) return;
        const currentState = connectionState();
        if (currentState.type !== "playingGame") return;

        setConnectionState({
          ...currentState,
          gameState: transformGameState(message, currentState.userName, originalPlayerOrder()),
        });
        break;
      }
      case "gameEnded": {
        if ("error" in message) return;
        const currentState = connectionState();
        if (currentState.type !== "playingGame") return;

        setConnectionState({
          type: "gameEnded",
          userName: currentState.userName,
          gameId: currentState.gameId,
          winnerName: message.state.nextPlayer.name, // In Mau-Mau, the next player in the final state is the winner
          finalGameState: transformGameState(message, currentState.userName, originalPlayerOrder()),
        });
        break;
      }
      case "disconnectFromGame": {
        if ("error" in message) return;
        const currentState = connectionState();
        if (currentState.type === "notConnected") return;

        setOriginalPlayerOrder([]);
        setConnectionState({
          type: "connectedOutsideGame",
          userName: currentState.userName,
          availableGameIds: [],
        });
        break;
      }
    }
  };

  createEffect(() => {
    if (client.state.messages.length > 0) {
      client.state.messages.forEach(handleServerMessage);
      client.clearMessages();
    }
  });

  const connect = async (userName: string) => {
    setConnectionState({ ...connectionState(), submittedUserName: userName });
    await client.connect();
    await client.send({ type: "logIn", userName });
  };

  const createGame = async () => {
    const currentState = connectionState();
    if (currentState.type !== "connectedOutsideGame") return;

    await client.send({ type: "createGame" });
  };

  const joinGame = async (gameId: string) => {
    const currentState = connectionState();
    if (currentState.type !== "connectedOutsideGame") return;

    await client.send({ type: "connectToGame", gameId });
  };

  const startGame = async () => {
    const currentState = connectionState();
    if (
      currentState.type !== "waitingInLobby" ||
      currentState.userName !== currentState.creatorName
    )
      return;

    await client.send({ type: "startGame" });
  };

  const disconnect = async () => {
    const currentState = connectionState();
    if (currentState.type === "notConnected") return;

    if (
      currentState.type === "waitingInLobby" ||
      currentState.type === "playingGame" ||
      currentState.type === "gameEnded"
    ) {
      await client.send({ type: "disconnectFromGame" });
    }
    await client.disconnect();
    setOriginalPlayerOrder([]);
    setConnectionState({ type: "notConnected", submittedUserName: "" });
  };

  const getApi = (): ConnectionApi => {
    const state = connectionState();
    switch (state.type) {
      case "notConnected":
        return {
          state,
          connect,
        };
      case "connectedOutsideGame":
        return {
          state,
          createGame,
          joinGame,
          disconnect,
        };
      case "waitingInLobby":
        return {
          state,
          startGame,
          disconnect,
          canStartGame: state.userName === state.creatorName,
        };
      case "playingGame":
        return {
          state,
          client,
          disconnect,
        };
      case "gameEnded":
        return {
          state,
          disconnect,
        };
    }
  };

  return getApi;
};

export type NotConnectedState = Readonly<{
  type: "notConnected";
  submittedUserName: string;
}>;

type ConnectedState = Readonly<{
  userName: string;
}>;

export type ConnectedOutsideGameState = Readonly<
  ConnectedState & {
    type: "connectedOutsideGame";
    availableGameIds: readonly string[];
  }
>;

export type WaitingInLobbyState = Readonly<
  ConnectedState & {
    type: "waitingInLobby";
    gameId: string;
    usersInGame: readonly string[];
    creatorName: string;
  }
>;

export type PlayingGameState = Readonly<
  ConnectedState & {
    type: "playingGame";
    gameId: string;
    gameState: GameState;
  }
>;

export type GameEndedState = Readonly<
  ConnectedState & {
    type: "gameEnded";
    gameId: string;
    winnerName: string;
    finalGameState: GameState;
  }
>;

export type ConnectionState =
  | NotConnectedState
  | ConnectedOutsideGameState
  | WaitingInLobbyState
  | PlayingGameState
  | GameEndedState;

export type NotConnectedApi = Readonly<{
  state: NotConnectedState;
  connect: (userName: string) => Promise<void>;
}>;

type ConnectedOutsideGameApi = Readonly<{
  state: ConnectedOutsideGameState;
  createGame: () => Promise<void>;
  joinGame: (gameId: string) => Promise<void>;
  disconnect: () => Promise<void>;
}>;

type WaitingInLobbyApi = Readonly<{
  state: WaitingInLobbyState;
  startGame: () => Promise<void>;
  disconnect: () => Promise<void>;
  canStartGame: boolean;
}>;

type PlayingGameApi = Readonly<{
  state: PlayingGameState;
  client: ReturnType<typeof createWebSocketClient>;
  disconnect: () => Promise<void>;
}>;

type GameEndedApi = Readonly<{
  state: GameEndedState;
  disconnect: () => Promise<void>;
}>;

export type ConnectionApi =
  | NotConnectedApi
  | ConnectedOutsideGameApi
  | WaitingInLobbyApi
  | PlayingGameApi
  | GameEndedApi;

const transformGameState = (
  serverState: Readonly<ServerMessage & { type: "startGame" | "turn" | "gameEnded" }>,
  userName: string,
  originalPlayerOrder: readonly string[],
): GameState => {
  if ("error" in serverState) throw new Error("Cannot transform error state");

  const state = serverState.state;
  const allPlayers = [state.nextPlayer, ...state.restPlayers];
  const thisPlayer = allPlayers.find(p => p.name === userName);
  if (!thisPlayer) throw new Error("Player not found in the game state");

  // Sort other players to maintain the original order from game start
  const otherPlayers = originalPlayerOrder
    .filter(name => name !== userName)
    .map(name => {
      const player = allPlayers.find(p => p.name === name);
      if (!player) throw new Error(`Player ${name} not found in the game state`);
      return player;
    });

  return {
    thisPlayer,
    otherPlayers,
    nextPlayerName: state.nextPlayer.name,
    topCard: state.topCard,
    discardPile: state.discardPile,
    drawPile: state.drawPile,
    topCardState: state.topCardState,
  };
};
