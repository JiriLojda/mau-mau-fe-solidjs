import { type Component, Match, Switch, createEffect } from "solid-js";
import { App as app, background, content } from "./App.module.css";
import { BackgroundTable } from "./components/BackgroundTable";
import { Game } from "./components/Game";
import { LoginDialog } from "./components/LoginDialog";
import { cardHeight } from "./constants";
import {
  type ConnectedOutsideGameState,
  type GameEndedState,
  type NotConnectedApi,
  type PlayingGameState,
  type WaitingInLobbyState,
  useServer,
} from "./websocket/useServer";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const App: Component = () => {
  const api = useServer(serverUrl);

  createEffect(() => {
    console.log("api", api().state);
  });

  return (
    <div class={app} style={{ "--card-height": `${cardHeight}px` }}>
      <div class={content}>
        <Switch>
          <Match when={api().state.type === "notConnected"}>
            <div class={background}>
              <BackgroundTable />
            </div>
            <LoginDialog onLogin={(api() as NotConnectedApi).connect} />
          </Match>
          <Match when={api().state.type === "connectedOutsideGame"}>
            <div>Connected as {(api().state as ConnectedOutsideGameState).userName}</div>
          </Match>
          <Match when={api().state.type === "waitingInLobby"}>
            <div>Waiting in lobby {(api().state as WaitingInLobbyState).gameId}</div>
          </Match>
          <Match when={api().state.type === "playingGame"}>
            <Game
              gameState={(api().state as PlayingGameState).gameState}
              onDrawDeckClick={() => console.log("draw deck clicked")}
              onDiscardPileClick={() => console.log("discard pile clicked")}
              onCurrentPlayerCardClick={card => console.log("current player card clicked", card)}
            />
          </Match>
          <Match when={api().state.type === "gameEnded"}>
            <div>Game ended, winner: {(api().state as GameEndedState).winnerName}</div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
