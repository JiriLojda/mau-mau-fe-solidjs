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
  drawDeck: [
    { suit: "Hearts", value: "Eight" },
    { suit: "Diamonds", value: "Ten" },
    { suit: "Clubs", value: "Jack" },
    { suit: "Spades", value: "Nine" },
    { suit: "Hearts", value: "Queen" },
  ],
  topDiscard: { suit: "Spades", value: "Ten" },
  topDiscardState: { state: "noEffect" },
  discardPile: [
    { suit: "Clubs", value: "King" },
    { suit: "Hearts", value: "Seven" },
  ],
  playerHand: [
    { suit: "Spades", value: "Ten" },
    { suit: "Clubs", value: "King" },
    { suit: "Hearts", value: "Seven" },
  ],
  otherPlayers: [
    {
      name: "Player 2",
      hand: [
        { suit: "Diamonds", value: "Ace" },
        { suit: "Spades", value: "Queen" },
        { suit: "Clubs", value: "Nine" },
      ],
    },
    {
      name: "Player 3",
      hand: [
        { suit: "Hearts", value: "King" },
        { suit: "Diamonds", value: "Nine" },
        { suit: "Spades", value: "Eight" },
      ],
    },
    {
      name: "Player 4",
      hand: [
        { suit: "Clubs", value: "Ace" },
        { suit: "Hearts", value: "Jack" },
        { suit: "Diamonds", value: "Seven" },
      ],
    },
  ],
  nextPlayer: { type: "thisPlayer" },
};
