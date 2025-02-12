import { Component, Index, JSX } from "solid-js";
import { table, bottomPlayer, leftPlayer, topPlayer, rightPlayer, decks } from './Table.module.css';
import { match } from "ts-pattern";
import { Direction } from "../models/direction";

type Props = Readonly<{
  renderPlayers: RenderPlayersType;
  drawDeck: JSX.Element;
  discardPile: JSX.Element;
}>;

export const Table: Component<Props> = props => {
  const playerDirection = (playerIndex: number) =>
    props.renderPlayers.length === 2 && playerIndex === 1
      ? Direction.Down
      : match(playerIndex)
        .with(0, () => Direction.Up)
        .with(1, () => Direction.Right)
        .with(2, () => Direction.Down)
        .with(3, () => Direction.Left)
        .otherwise(() => Direction.Up);

  return (
    <div class={table}>
      <Index each={props.renderPlayers}>
        {(renderPlayer, index) => {
          const direction = playerDirection(index);
          return (
            <div class={directionToClass(direction)}>
              {renderPlayer()(direction)}
            </div>
          );
        }}
      </Index>
      <div class={decks}>
        {props.discardPile}
        {props.drawDeck}
      </div>
    </div>
  );
};

type RenderPlayersType =
  [(dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element] |
  [(dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element] |
  [(dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element, (dir: Direction) => JSX.Element];

const directionToClass = (direction: Direction) =>
  match(direction)
    .with(Direction.Up, () => bottomPlayer)
    .with(Direction.Right, () => leftPlayer)
    .with(Direction.Down, () => topPlayer)
    .with(Direction.Left, () => rightPlayer)
    .exhaustive();
