import type { Component } from "solid-js";
import type { GameState } from "../models/GameState";
import type { Card } from "../models/card";
import { DiscardPile } from "./DiscardPile";
import { DrawDeck } from "./DrawDeck";
import { Hand } from "./Hand";
import { Table } from "./Table";

type GameProps = Readonly<{
  gameState: GameState;
  onDrawDeckClick?: () => void;
  onDiscardPileClick?: () => void;
  onCurrentPlayerCardClick?: (card: Card) => void;
}>;

export const Game: Component<GameProps> = props => (
  <Table
    drawDeck={
      <DrawDeck numberOfCards={props.gameState.drawDeck.length} onClick={props.onDrawDeckClick} />
    }
    discardPile={
      <DiscardPile
        onClick={props.onDiscardPileClick}
        cards={[props.gameState.topDiscard, ...props.gameState.discardPile]}
      />
    }
    renderCurrentPlayer={dir => (
      <Hand
        cards={props.gameState.playerHand}
        onCardClick={props.onCurrentPlayerCardClick}
        direction={dir}
      />
    )}
    renderOtherPlayers={props.gameState.otherPlayers.map(player => dir => (
      <Hand cards={player.hand} direction={dir} />
    ))}
  />
);
