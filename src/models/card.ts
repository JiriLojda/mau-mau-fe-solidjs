export type Suite = "hearts" | "diamonds" | "clubs" | "spades";

export type CardType = "ace" | "king" | "queen" | "jack" | "ten" | "nine" | "eight" | "seven";

export type Card = Readonly<{
  cardType: CardType;
  suite: Suite;
}>;

export type UnknownCard = Readonly<{
  cardType: "unknownType";
  suite: "unknownSuite";
}>;

export const allCards: ReadonlyArray<Card> = [
  { suite: "hearts", cardType: "king" },
  { suite: "hearts", cardType: "queen" },
  { suite: "hearts", cardType: "jack" },
  { suite: "hearts", cardType: "ten" },
  { suite: "hearts", cardType: "nine" },
  { suite: "hearts", cardType: "eight" },
  { suite: "hearts", cardType: "seven" },
  { suite: "hearts", cardType: "ace" },
  { suite: "diamonds", cardType: "king" },
  { suite: "diamonds", cardType: "queen" },
  { suite: "diamonds", cardType: "jack" },
  { suite: "diamonds", cardType: "ten" },
  { suite: "diamonds", cardType: "nine" },
  { suite: "diamonds", cardType: "eight" },
  { suite: "diamonds", cardType: "seven" },
  { suite: "diamonds", cardType: "ace" },
  { suite: "clubs", cardType: "king" },
  { suite: "clubs", cardType: "queen" },
  { suite: "clubs", cardType: "jack" },
  { suite: "clubs", cardType: "ten" },
  { suite: "clubs", cardType: "nine" },
  { suite: "clubs", cardType: "eight" },
  { suite: "clubs", cardType: "seven" },
  { suite: "clubs", cardType: "ace" },
  { suite: "spades", cardType: "king" },
  { suite: "spades", cardType: "queen" },
  { suite: "spades", cardType: "jack" },
  { suite: "spades", cardType: "ten" },
  { suite: "spades", cardType: "nine" },
  { suite: "spades", cardType: "eight" },
  { suite: "spades", cardType: "seven" },
  { suite: "spades", cardType: "ace" },
];
