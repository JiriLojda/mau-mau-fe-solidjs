import { Component } from 'solid-js';
import { GameState } from '../types/GameState';
import { Table } from './Table';
import { Hand } from './Hand';
import { DrawDeck } from './DrawDeck';
import { DiscardPile } from './DiscardPile';
import { Card } from '../models/card';

type GameProps = Readonly<{
  gameState: GameState;
  onDrawDeckClick?: () => void;
  onDiscardPileClick?: () => void;
  onCurrentPlayerCardClick?: (card: Card) => void;
}>;

export const Game: Component<GameProps> = (props) => (
  <Table
    drawDeck={<DrawDeck 
      numberOfCards={props.gameState.drawDeck.length} 
      onClick={props.onDrawDeckClick}
    />}
    discardPile={<DiscardPile
      onClick={props.onDiscardPileClick}
      cards={[props.gameState.topDiscard, ...props.gameState.discardPile]} />}
    renderCurrentPlayer={(dir) => (
      <Hand
        cards={props.gameState.playerHand}
        onCardClick={props.onCurrentPlayerCardClick}
        direction={dir} />
    )}
    renderOtherPlayers={props.gameState.otherPlayers.map(
      player => (dir) => (
        <Hand
          cards={player.hand}
          direction={dir} />
      )
    )} />
); 