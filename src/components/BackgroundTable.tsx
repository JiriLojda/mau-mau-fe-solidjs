import type { Component } from "solid-js";
import type { Card } from "../models/card";
import { DiscardPile } from "./DiscardPile";
import { DrawDeck } from "./DrawDeck";
import { Hand } from "./Hand";
import { Table } from "./Table";

export const BackgroundTable: Component = () => (
  <Table
    drawDeck={<DrawDeck numberOfCards={20} />}
    discardPile={<DiscardPile cards={discardPileCards} />}
    renderCurrentPlayer={dir => <Hand cards={bottomPlayerCards} direction={dir} />}
    renderOtherPlayers={[
      dir => <Hand cards={rightPlayerCards} direction={dir} />,
      dir => <Hand cards={topPlayerCards} direction={dir} />,
      dir => <Hand cards={leftPlayerCards} direction={dir} />,
    ]}
  />
);

// Sample cards for each player
const bottomPlayerCards: readonly Card[] = [
  { suite: "hearts", cardType: "ace" },
  { suite: "spades", cardType: "king" },
  { suite: "diamonds", cardType: "queen" },
];

const rightPlayerCards: readonly Card[] = [
  { suite: "clubs", cardType: "jack" },
  { suite: "hearts", cardType: "ten" },
  { suite: "diamonds", cardType: "nine" },
];

const topPlayerCards: readonly Card[] = [
  { suite: "spades", cardType: "eight" },
  { suite: "diamonds", cardType: "seven" },
  { suite: "clubs", cardType: "ace" },
];

const leftPlayerCards: readonly Card[] = [
  { suite: "hearts", cardType: "king" },
  { suite: "spades", cardType: "queen" },
  { suite: "diamonds", cardType: "jack" },
];

const discardPileCards: readonly Card[] = [
  { suite: "clubs", cardType: "ten" },
  { suite: "hearts", cardType: "nine" },
];
