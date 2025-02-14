import { Component, Index, JSX } from "solid-js";
import { table, bottomPlayer, leftPlayer, topPlayer, rightPlayer, decks } from './Table.module.css';
import { match } from "ts-pattern";
import { Direction } from "../models/direction";

type Props = Readonly<{
  renderCurrentPlayer: (dir: Direction) => JSX.Element;
  renderOtherPlayers: ReadonlyArray<(dir: Direction) => JSX.Element>;
  drawDeck: JSX.Element;
  discardPile: JSX.Element;
}>;

export const Table: Component<Props> = props => {
  const playerDirection = (playerIndex: number) =>
    props.renderOtherPlayers.length === 1 && playerIndex === 0
      ? Direction.Down
      : match(playerIndex)
        .with(0, () => Direction.Right)
        .with(1, () => Direction.Down)
        .with(2, () => Direction.Left)
        .otherwise(() => Direction.Up);

  return (
    <div class={table}>
      {/* Current player is always at the bottom */}
      <div class={bottomPlayer}>
        {props.renderCurrentPlayer(Direction.Up)}
      </div>

      {/* Other players */}
      <Index each={props.renderOtherPlayers}>
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

const directionToClass = (direction: Direction) =>
  match(direction)
    .with(Direction.Up, () => bottomPlayer)
    .with(Direction.Right, () => leftPlayer)
    .with(Direction.Down, () => topPlayer)
    .with(Direction.Left, () => rightPlayer)
    .exhaustive();
