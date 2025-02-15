import type { JSX } from "solid-js/jsx-runtime";
import { match } from "ts-pattern";
import { cardHeight, cardWidth } from "../constants";
import type { Card as CardType, UnknownCard } from "../models/card";
import { clickable, nonClickable } from "./Card.module.css";
import { CardBack } from "./CardBack";

type Props = Readonly<{
  style?: JSX.CSSProperties;
  card: CardType | UnknownCard;
  onClick?: () => void;
}>;

export const Card = (props: Props) => {
  if (props.card.cardType === "unknownType") {
    return <CardBack style={props.style} onClick={props.onClick} />;
  }

  return (
    <img
      class={props.onClick ? clickable : nonClickable}
      style={props.style}
      src={`/src/assets/images/${mapCardTypeToImageName(props.card)}.png`}
      width={cardWidth}
      height={cardHeight}
      onClick={props.onClick}
    />
  );
};

const mapCardTypeToImageName = (card: CardType) =>
  match(card)
    .with({ suite: "diamonds", cardType: "king" }, () => "diamondK")
    .with({ suite: "diamonds", cardType: "queen" }, () => "diamondQ")
    .with({ suite: "diamonds", cardType: "jack" }, () => "diamondJ")
    .with({ suite: "diamonds", cardType: "ace" }, () => "diamondA")
    .with({ suite: "diamonds", cardType: "ten" }, () => "diamond10")
    .with({ suite: "diamonds", cardType: "nine" }, () => "diamond9")
    .with({ suite: "diamonds", cardType: "eight" }, () => "diamond8")
    .with({ suite: "diamonds", cardType: "seven" }, () => "diamond7")
    .with({ suite: "hearts", cardType: "king" }, () => "heartK")
    .with({ suite: "hearts", cardType: "queen" }, () => "heartQ")
    .with({ suite: "hearts", cardType: "jack" }, () => "heartJ")
    .with({ suite: "hearts", cardType: "ten" }, () => "heart10")
    .with({ suite: "hearts", cardType: "nine" }, () => "heart9")
    .with({ suite: "hearts", cardType: "eight" }, () => "heart8")
    .with({ suite: "hearts", cardType: "seven" }, () => "heart7")
    .with({ suite: "hearts", cardType: "ace" }, () => "heartA")
    .with({ suite: "clubs", cardType: "king" }, () => "clubK")
    .with({ suite: "clubs", cardType: "queen" }, () => "clubQ")
    .with({ suite: "clubs", cardType: "jack" }, () => "clubJ")
    .with({ suite: "clubs", cardType: "ten" }, () => "club10")
    .with({ suite: "clubs", cardType: "nine" }, () => "club9")
    .with({ suite: "clubs", cardType: "eight" }, () => "club8")
    .with({ suite: "clubs", cardType: "seven" }, () => "club7")
    .with({ suite: "clubs", cardType: "ace" }, () => "clubA")
    .with({ suite: "spades", cardType: "king" }, () => "spadeK")
    .with({ suite: "spades", cardType: "queen" }, () => "spadeQ")
    .with({ suite: "spades", cardType: "jack" }, () => "spadeJ")
    .with({ suite: "spades", cardType: "ten" }, () => "spade10")
    .with({ suite: "spades", cardType: "nine" }, () => "spade9")
    .with({ suite: "spades", cardType: "eight" }, () => "spade8")
    .with({ suite: "spades", cardType: "seven" }, () => "spade7")
    .with({ suite: "spades", cardType: "ace" }, () => "spadeA")
    .exhaustive();
