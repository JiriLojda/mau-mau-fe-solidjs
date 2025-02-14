import { JSX } from "solid-js/jsx-runtime";
import { cardHeight, cardWidth } from "../constants";
import { clickable, nonClickable } from './Card.module.css';

type Props = Readonly<{
  style?: JSX.CSSProperties;
  onClick?: () => void;
}>;

export const CardBack = (props: Props) => (
  <img
    class={props.onClick ? clickable : nonClickable}
    style={props.style}
    src={`/src/assets/images/card-back.png`}
    width={cardWidth}
    height={cardHeight}
    onClick={props.onClick}
  />
);
