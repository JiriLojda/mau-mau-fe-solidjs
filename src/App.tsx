import type { Component } from "solid-js";

import styles from "./App.module.css";
import { Game } from "./components/Game";
import { cardHeight } from "./constants";
import type { GameState } from "./models/GameState";

export const App: Component = () => (
  <div class={styles.App} style={{ "--card-height": `${cardHeight}px` }}>
    <Game
      gameState={sampleGameState}
      onDrawDeckClick={() => console.log("draw deck clicked")}
      onDiscardPileClick={() => console.log("discard pile clicked")}
      onCurrentPlayerCardClick={card => console.log("current player card clicked", card)}
    />
  </div>
);

const sampleGameState: GameState = {
  drawPile: [
    { cardType: "unknownType", suite: "unknownSuite" },
    { cardType: "unknownType", suite: "unknownSuite" },
    { cardType: "unknownType", suite: "unknownSuite" },
    { cardType: "unknownType", suite: "unknownSuite" },
    { cardType: "unknownType", suite: "unknownSuite" },
  ],
  topCard: { suite: "spades", cardType: "ten" },
  topCardState: { state: "noEffect" },
  discardPile: [
    { suite: "clubs", cardType: "king" },
    { suite: "hearts", cardType: "seven" },
  ],
  thisPlayer: {
    name: "Player 1",
    hand: [
      { suite: "spades", cardType: "ten" },
      { suite: "clubs", cardType: "king" },
      { suite: "hearts", cardType: "seven" },
    ],
  },
  otherPlayers: [
    {
      name: "Player 2",
      hand: [
        { suite: "diamonds", cardType: "ace" },
        { suite: "spades", cardType: "queen" },
        { suite: "clubs", cardType: "nine" },
      ],
    },
    {
      name: "Player 3",
      hand: [
        { suite: "hearts", cardType: "king" },
        { suite: "diamonds", cardType: "nine" },
        { suite: "spades", cardType: "eight" },
      ],
    },
    {
      name: "Player 4",
      hand: [
        { suite: "clubs", cardType: "ace" },
        { suite: "hearts", cardType: "jack" },
        { suite: "diamonds", cardType: "seven" },
      ],
    },
  ],
  nextPlayerName: "Player 2",
};
