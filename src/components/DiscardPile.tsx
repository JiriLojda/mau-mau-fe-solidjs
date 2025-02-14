import { createEffect, createSignal, Index } from "solid-js";
import { Card } from "../models/card";
import { Card as CardComponent } from './Card';
import { randomInt } from "../utils/random";
import { cardHeight, cardWidth } from "../constants";
import { zip } from "../utils/array";

type Props = Readonly<{
  cards: readonly Card[];
  onClick?: () => void;
}>;

export const DiscardPile = (props: Props) => {
  const [cardRotations, setCardRotations] = createSignal<ReadonlyArray<number>>(props.cards.map(() => randomInt(0, 359)));

  createEffect(() => {
    if (cardRotations().length !== props.cards.length) {
      const remainingRotations = cardRotations().slice(0, props.cards.length);
      const newRotations = props.cards
        .slice(cardRotations().length)
        .map(() => randomInt(0, 359))

      setCardRotations([...remainingRotations, ...newRotations]);
    }
  });

  return (
    <div style={{ position: 'relative', height: `${cardHeight}px`, width: `${cardWidth}px` }}>
      <Index each={zip(props.cards, cardRotations())}>
        {(pair, index) => (
          <CardComponent
            style={{ position: 'absolute', 'z-index': index + 1, left: `${cardHeight / 2}px`, right: `${cardHeight / 2}px`, transform: `rotate(${pair()[1]}deg)` }}
            onClick={index === props.cards.length - 1 ? props.onClick : undefined}
            card={pair()[0]}
          />
        )}
      </Index>
    </div>
  );
}
