import { Card, Suit } from "../models/card";

export type GameState = Readonly<{
  drawDeck: readonly Card[];
  topDiscard: Card;
  topDiscardState: TopDiscardState;
  discardPile: readonly Card[];
  playerHand: readonly Card[];
  otherPlayers: ReadonlyArray<Player>;
  nextPlayer: NextPlayer;
}>;

type Player = Readonly<{
  name: string;
  hand: readonly Card[];
}>;

type NextPlayer =
  | Readonly<{ type: "otherPlayer"; player: Player }>
  | Readonly<{ type: "thisPlayer" }>;

type TopDiscardState =
  | Readonly<{ state: "noEffect" }>
  | Readonly<{ state: "aceActive" }>
  | Readonly<{ state: "sevenActive", cardsToDraw: number }>
  | Readonly<{ state: "queenActive", chosenSuit: Suit }>;
