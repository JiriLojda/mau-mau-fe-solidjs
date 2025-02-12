import { type Component } from 'solid-js';

import styles from './App.module.css';
import { Table } from './components/Table';
import { Hand } from './components/Hand';
import { cardHeight } from './constants';
import { DrawDeck } from './components/DrawDeck';
import { DiscardPile } from './components/DiscardPile';
import { noop } from './utils/function';

export const App: Component = () => {

  return (
    <div class={styles.App} style={{ '--card-height': `${cardHeight}px` }}>
      <Table
        drawDeck={<DrawDeck numberOfCards={5} />}
        discardPile={<DiscardPile onClick={noop} cards={[{ suit: "Spades", value: "Ten" }, { suit: "Clubs", value: "King" }, { suit: "Hearts", value: "Seven" }]} />}
        renderPlayers={[
          dir => <Hand
            cards={[{ suit: "Spades", value: "Ten" }, { suit: "Clubs", value: "King" }, { suit: "Hearts", value: "Seven" }]}
            onCardClick={() => { }}
            direction={dir}
          />,
          dir => <Hand
            cards={[{ suit: "Diamonds", value: "Ace" }, { suit: "Spades", value: "Queen" }, { suit: "Clubs", value: "Nine" }]}
            onCardClick={() => { }}
            direction={dir}
          />,
          dir => <Hand
            cards={[{ suit: "Hearts", value: "King" }, { suit: "Diamonds", value: "Nine" }, { suit: "Spades", value: "Eight" }]}
            onCardClick={() => { }}
            direction={dir}
          />,
          dir => <Hand
            cards={[{ suit: "Clubs", value: "Ace" }, { suit: "Hearts", value: "Jack" }, { suit: "Diamonds", value: "Seven" }]}
            onCardClick={() => { }}
            direction={dir}
          />
        ]}
      />
    </div>
  );
};
