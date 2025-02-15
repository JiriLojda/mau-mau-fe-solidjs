import type { JSX } from "solid-js/jsx-runtime";
import { match } from "ts-pattern";
import { cardHeight, cardWidth } from "../constants";
import type { Card as CardType } from "../models/card";
import { clickable, nonClickable } from "./Card.module.css";

type Props = Readonly<{ style?: JSX.CSSProperties; card: CardType; onClick?: () => void }>;

export const Card = (props: Props) => (
  <img
    class={props.onClick ? clickable : nonClickable}
    style={props.style}
    src={`/src/assets/images/${mapCardTypeToImageName(props.card)}.png`}
    width={cardWidth}
    height={cardHeight}
    onClick={props.onClick}
  />
);

const mapCardTypeToImageName = (card: CardType) =>
  match(card)
    .with({ suit: "Diamonds", value: "King" }, () => "diamondK")
    .with({ suit: "Diamonds", value: "Queen" }, () => "diamondQ")
    .with({ suit: "Diamonds", value: "Jack" }, () => "diamondJ")
    .with({ suit: "Diamonds", value: "Ace" }, () => "diamondA")
    .with({ suit: "Diamonds", value: "Ten" }, () => "diamond10")
    .with({ suit: "Diamonds", value: "Nine" }, () => "diamond9")
    .with({ suit: "Diamonds", value: "Eight" }, () => "diamond8")
    .with({ suit: "Diamonds", value: "Seven" }, () => "diamond7")
    .with({ suit: "Hearts", value: "King" }, () => "heartK")
    .with({ suit: "Hearts", value: "Queen" }, () => "heartQ")
    .with({ suit: "Hearts", value: "Jack" }, () => "heartJ")
    .with({ suit: "Hearts", value: "Ten" }, () => "heart10")
    .with({ suit: "Hearts", value: "Nine" }, () => "heart9")
    .with({ suit: "Hearts", value: "Eight" }, () => "heart8")
    .with({ suit: "Hearts", value: "Seven" }, () => "heart7")
    .with({ suit: "Hearts", value: "Ace" }, () => "heartA")
    .with({ suit: "Clubs", value: "King" }, () => "clubK")
    .with({ suit: "Clubs", value: "Queen" }, () => "clubQ")
    .with({ suit: "Clubs", value: "Jack" }, () => "clubJ")
    .with({ suit: "Clubs", value: "Ten" }, () => "club10")
    .with({ suit: "Clubs", value: "Nine" }, () => "club9")
    .with({ suit: "Clubs", value: "Eight" }, () => "club8")
    .with({ suit: "Clubs", value: "Seven" }, () => "club7")
    .with({ suit: "Clubs", value: "Ace" }, () => "clubA")
    .with({ suit: "Spades", value: "King" }, () => "spadeK")
    .with({ suit: "Spades", value: "Queen" }, () => "spadeQ")
    .with({ suit: "Spades", value: "Jack" }, () => "spadeJ")
    .with({ suit: "Spades", value: "Ten" }, () => "spade10")
    .with({ suit: "Spades", value: "Nine" }, () => "spade9")
    .with({ suit: "Spades", value: "Eight" }, () => "spade8")
    .with({ suit: "Spades", value: "Seven" }, () => "spade7")
    .with({ suit: "Spades", value: "Ace" }, () => "spadeA")
    .exhaustive();
