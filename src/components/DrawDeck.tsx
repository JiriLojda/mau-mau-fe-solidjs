import { match } from "ts-pattern";
import { cardHeight, cardWidth } from "../constants";
import { Component, JSX } from "solid-js";
import { CardBack } from "./CardBack";

type Props = Readonly<{
  numberOfCards: number;
}>;

export const DrawDeck: Component<Props> = props =>
  <div style={{ position: "relative", height: `${cardHeight}px`, width: `${stackWidth}px` }} >
    {
      match(props.numberOfCards)
        .with(0, () => null)
        .with(1, () => <CardBack />)
        .with(2, () => <>
          <CardBack style={{ ...commonStyle, left: 0, 'z-index': 2 }} />
          <CardBack style={{ ...commonStyle, left: `${cardOverlap}px`, 'z-index': 1 }} />
        </>)
        .otherwise(() => <>
          <CardBack style={{ ...commonStyle, left: 0, 'z-index': 3 }} />
          <CardBack style={{ ...commonStyle, left: `${cardOverlap}px`, 'z-index': 2 }} />
          <CardBack style={{ ...commonStyle, left: `${2 * cardOverlap}px`, 'z-index': 1 }} />
        </>)
    }
  </div>

const cardOverlap = 10;

const stackWidth = cardWidth + (2 * cardOverlap);

const commonStyle: JSX.CSSProperties = {
  position: "absolute",
};
