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
            "z-index": index(),
            ...cardTransformProps(props.direction),
            ...cardPositionProps(props.direction, index()),
          }}
          card={card}
          onClick={props.onCardClick ? () => props.onCardClick?.(card) : undefined}
        />
      )}
    </For>
  </section>
);

const cardOverlap = 25;

const cardTransformProps = (direction: Direction): JSX.CSSProperties =>
  match(direction)
    .with(Direction.Up, () => ({ transform: "rotate(0deg)" }))
    .with(Direction.Right, () => ({ transform: "rotate(90deg)", "transform-origin": "50% 25%" }))
    .with(Direction.Down, () => ({ transform: "rotate(180deg)" }))
    .with(Direction.Left, () => ({ transform: "rotate(270deg)", "transform-origin": "50% 25%" }))
    .exhaustive();

const cardPositionProps = (direction: Direction, index: number): JSX.CSSProperties => {
  const moveBy = (cardWidth - cardOverlap) * index;

  return match(direction)
    .with(P.union(Direction.Up, Direction.Down), () => ({ left: `${moveBy}px` }))
    .with(Direction.Right, () => ({ top: `${moveBy}px`, right: "0" }))
    .with(Direction.Left, () => ({ top: `${moveBy}px`, left: "0" }))
    .exhaustive();
};

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
