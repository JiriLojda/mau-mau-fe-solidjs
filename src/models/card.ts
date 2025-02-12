export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';

export type CardValue = 'King' | 'Queen' | 'Jack' | 'Ten' | 'Nine' | 'Eight' | 'Seven' | 'Ace';

export type Card = Readonly<{
  suit: Suit;
  value: CardValue;
}>;

export const allCards: ReadonlyArray<Card> = [
  { suit: 'Hearts', value: 'King' },
  { suit: 'Hearts', value: 'Queen' },
  { suit: 'Hearts', value: 'Jack' },
  { suit: 'Hearts', value: 'Ten' },
  { suit: 'Hearts', value: 'Nine' },
  { suit: 'Hearts', value: 'Eight' },
  { suit: 'Hearts', value: 'Seven' },
  { suit: 'Hearts', value: 'Ace' },
  { suit: 'Diamonds', value: 'King' },
  { suit: 'Diamonds', value: 'Queen' },
  { suit: 'Diamonds', value: 'Jack' },
  { suit: 'Diamonds', value: 'Ten' },
  { suit: 'Diamonds', value: 'Nine' },
  { suit: 'Diamonds', value: 'Eight' },
  { suit: 'Diamonds', value: 'Seven' },
  { suit: 'Diamonds', value: 'Ace' },
  { suit: 'Clubs', value: 'King' },
  { suit: 'Clubs', value: 'Queen' },
  { suit: 'Clubs', value: 'Jack' },
  { suit: 'Clubs', value: 'Ten' },
  { suit: 'Clubs', value: 'Nine' },
  { suit: 'Clubs', value: 'Eight' },
  { suit: 'Clubs', value: 'Seven' },
  { suit: 'Clubs', value: 'Ace' },
  { suit: 'Spades', value: 'King' },
  { suit: 'Spades', value: 'Queen' },
  { suit: 'Spades', value: 'Jack' },
  { suit: 'Spades', value: 'Ten' },
  { suit: 'Spades', value: 'Nine' },
  { suit: 'Spades', value: 'Eight' },
  { suit: 'Spades', value: 'Seven' },
  { suit: 'Spades', value: 'Ace' }
];

