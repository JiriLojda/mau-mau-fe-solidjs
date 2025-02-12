import { JSX } from "solid-js/jsx-runtime";
import { cardHeight, cardWidth } from "../constants";

type Props = Readonly<{
  style?: JSX.CSSProperties;
  onClick?: () => void;
}>;

export const CardBack = (props: Props) => (
  <img
    style={props.style}
    src={`/src/assets/images/card-back.png`}
    width={cardWidth}
    height={cardHeight}
    onClick={props.onClick}
  />
);
