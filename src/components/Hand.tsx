import { type Component, For, type JSX } from "solid-js";
import { P, match } from "ts-pattern";
import { cardHeight, cardWidth } from "../constants";
import type { Card as CardType, UnknownCard } from "../models/card";
import { Direction } from "../models/direction";
import { Card } from "./Card";
import { hand } from "./Hand.module.css";

type Props = Readonly<{
  cards: ReadonlyArray<CardType | UnknownCard>;
  onCardClick?: (card: CardType | UnknownCard) => void;
  direction: Direction;
}>;

export const Hand: Component<Props> = props => (
  <section style={handStyle(props.direction, props.cards.length)} class={hand}>
    <For each={props.cards}>
      {(card, index) => (
        <Card
          style={{
            position: "absolute",
            [cardPositionPropName(props.direction)]: `${(cardWidth - cardOverlap) * index()}px`,
            "z-index": index(),
            transform: cardTransform(props.direction),
          }}
          card={card}
          onClick={props.onCardClick ? () => props.onCardClick?.(card) : undefined}
        />
      )}
    </For>
  </section>
);

const cardOverlap = 25;

const cardTransform = (direction: Direction) =>
  match(direction)
    .with(Direction.Up, () => "rotate(0deg)")
    .with(Direction.Right, () => "rotate(90deg) translate(-50%, 25%)")
    .with(Direction.Down, () => "rotate(180deg)")
    .with(Direction.Left, () => "rotate(270deg) translate(50%, -25%)")
    .exhaustive();

const cardPositionPropName = (direction: Direction) =>
  match(direction)
    .with(P.union(Direction.Up, Direction.Down), () => "left" as const)
    .with(P.union(Direction.Right, Direction.Left), () => "top" as const)
    .exhaustive();

const handStyle = (direction: Direction, cardsNum: number): JSX.CSSProperties =>
  match(direction)
    .with(P.union(Direction.Up, Direction.Down), () => ({
      width: `${(cardWidth - cardOverlap) * cardsNum + (cardsNum ? cardOverlap : 0)}px`,
      height: `${cardHeight}px`,
    }))
    .with(P.union(Direction.Right, Direction.Left), () => ({
      height: `${(cardWidth - cardOverlap) * cardsNum + (cardsNum ? cardOverlap : 0)}px`,
      width: `${cardHeight}px`,
    }))
    .exhaustive();
