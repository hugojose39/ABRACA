import { useEffect, useState } from "react";
import cx from "classnames";

import AppLayout from "../../layout/App/AppLayout";

import IconMemoryGame from "../../assets/img/icon-memory-game.png";
import Logo from "../../assets/img/logo.png";

import style from './styles.module.scss';

interface CardType {
  id: number;
  label: string;
  name: string;
  isFlipped: boolean;
  passed?: boolean;
  order: number;
}

interface CardProps {
  card: CardType;
  handleClick: (card: CardType) => void;
}

const cardData: CardType[]  = [
  {id: 1, label: '🍏', name: 'Maçã' },
  {id: 2, label: '🍏', name: 'Maçã' },
  {id: 3, label: '🍉', name: 'Melancia' },
  {id: 4, label: '🍉', name: 'Melancia' },
  {id: 5, label: '🍌', name: 'Banana' },
  {id: 6, label: '🍌', name: 'Banana' },
  {id: 7, label: '🍊', name: 'Laranja' },
  {id: 8, label: '🍊', name: 'Laranja' },
  {id: 9, label: '🍓', name: 'Morango' },
  {id: 10, label: '🍓', name: 'Morango' },
  {id: 11, label: '🍍', name: 'Abacaxi' },
  {id: 12, label: '🍍', name: 'Abacaxi' },
  {id: 13, label: '🥥', name: 'Coco' },
  {id: 14, label: '🥥', name: 'Coco' },
  {id: 15, label: '🍑', name: 'Pêssego' },
  {id: 16, label: '🍑', name: 'Pêssego' },
].map(card => ({ ...card, isFlipped: false, order: Math.floor(Math.random() * 8) }));

function Card({ card, handleClick }: CardProps) {
  return (
    <div 
      onClick={() => handleClick(card)}
      className={cx(style.card, { [style.cardPassed]: card.passed })}
      >
        <div className={style.card_content}>
          {! card.isFlipped && ! card.passed && (
            <img
              src={Logo}
              alt="Logo"
              className={style.card_image}
            />
          )}

          {(card.isFlipped || card.passed) && (
            <>
              <span className={style.emoji}>{card.label}</span>
            
              <span className={style.name}>{card.name}</span>
            </>
          )}
        </div>
    </div>
  );
}

export default function JogoDaMemoria() {
  const [cards, setCards] = useState(cardData);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [tries, setTries] = useState(0); 
  const [wait, setWait] = useState(false);

  const initializeGame = () => {
    const newCardData = cardData.map(card => ({ ...card, isFlipped: false, order: Math.floor(Math.random() * 8) }));
    setCards(newCardData);
  };

  const flipCard = (cardToFlip: CardType) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardToFlip.id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  const markCardAsPassed = (cardToMark: CardType) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardToMark.id ? { ...card, passed: true } : card
      )
    );
  };

  const checkCards = (secondCard: CardType) => {
    if(! firstCard) { 
      return;
    }

    if (secondCard.name === firstCard.name) {
      markCardAsPassed(secondCard);
      markCardAsPassed(firstCard);

      return;
    } 

    setWait(true);
    setTimeout(() => {
      flipCard(secondCard);
      flipCard(firstCard);
      setWait(false);
    }, 1500);
  };
  

  const handleCardFlip = (clickedCard: CardType) => {
    if (! clickedCard.isFlipped && ! wait) {
      flipCard(clickedCard);
      
      if (!firstCard) {
        setFirstCard(clickedCard);
      } else {
        setTries(prevTries => prevTries + 1);
        checkCards(clickedCard);
        setFirstCard(null);
      }
    }
  };

  const flipAllCards = () => {
    setCards(prevCards =>
      prevCards.map(card =>
        ({ ...card, isFlipped: true })
      )
    );
  }

  const flipCardsAndSetTimeout = () => {
    flipAllCards();

    setTimeout(() => {
      flipAllCardsBack();
    }, 3000);
  }

  const flipAllCardsBack = () => {
    setCards(prevCards =>
      prevCards.map(card =>
        ({ ...card, isFlipped: false })
      )
    );
  }
  
  const isGameOver = cards.every(card => card.passed);

  const handleRestartGame = () => {
    setCards(cardData);
    setTries(0);
    flipCardsAndSetTimeout();
  }

  useEffect(() => {
    initializeGame();
    flipCardsAndSetTimeout();

  }, []);

  return (
    <AppLayout
      primaryColorBackground="#21ae1c"
      secondaryColorBackground="#24ce43"
      menuColor={"#21ae1ca1"}
      imageLayout={IconMemoryGame}
      pageTitle="Jogo da Memória"
      imageDescription="Icone do jogo da memória"
    >
      {isGameOver && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2>{`Parabens você ganhou em ${tries} tentativas!`}</h2>
          <button onClick={handleRestartGame} className={style.button}>Jogar novamente</button>
        </div>
      )}

      {! isGameOver && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2>Encontre os pares!</h2>
          
          <h3>{`Tentativas: ${tries}`}</h3>
        </div>
      )}

      <div className={style.cardWrapper}>
        {cards.sort((a, b) => a.order - b.order).map(card => (
          <Card key={card.id} card={card} handleClick={handleCardFlip} />
        ))}
      </div>
    </AppLayout>
  );
}
