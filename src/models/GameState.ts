import type { Card, Suite, UnknownCard } from "./card";

type Player = Readonly<{
  name: string;
  hand: ReadonlyArray<Card | UnknownCard>;
}>;

export type TopCardState =
  | Readonly<{ state: "noEffect" }>
  | Readonly<{ state: "aceActive" }>
  | Readonly<{ state: "sevenActive"; cardsToDraw: number }>
  | Readonly<{ state: "queenPresent"; chosenSuite: Suite }>;

export type GameState = Readonly<{
  thisPlayer: Player;
  otherPlayers: ReadonlyArray<Player>;
  nextPlayerName: string;
  topCard: Card;
  discardPile: ReadonlyArray<Card>;
  drawPile: ReadonlyArray<UnknownCard>;
  topCardState: TopCardState;
}>;
