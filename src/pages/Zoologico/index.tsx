import { useCallback, useEffect, useState } from "react";

import AppLayout from "../../layout/App/AppLayout";
import IconZoo from "../../assets/img/icon-zoo.png";
import { animals } from "../../constants/zoo";

import styles from "./styles.module.scss";

interface AnimalEmoji {
  emoji: string;
  name: string;
}

const shuffleArray = (array: AnimalEmoji[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getOptions = (correctAnimal: AnimalEmoji, allAnimals: AnimalEmoji[]) => {
  const shuffled = shuffleArray(allAnimals);
  const filtered = shuffled.filter(animal => animal.name !== correctAnimal.name);
  const options = [correctAnimal, ...filtered.slice(0, 3)];

  return shuffleArray(options);
};

export default function Zoologico() {
  const [level, setLevel] = useState(0);
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalEmoji[]>([]);
  const [currentOptions, setCurrentOptions] = useState<AnimalEmoji[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimeout = 2000;

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), feedbackTimeout);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const startGame = () => {
    const shuffledAnimals = shuffleArray(animals);
    setSelectedAnimals(shuffledAnimals);
    setLevel(1);
    setFeedback(null);
    setCurrentOptions(getOptions(shuffledAnimals[0], animals));
  };

  const handleChoice = useCallback((animal: AnimalEmoji) => {
    const correctAnimal = selectedAnimals[level - 1];
    if (animal.name === correctAnimal.name) {
      const nextLevel = level + 1;
      setTimeout(() => setFeedback(null), 1000);
      if (nextLevel <= 8) {
        setLevel(nextLevel);
        setCurrentOptions(getOptions(selectedAnimals[nextLevel - 1], animals));
      } else {
        setLevel(9);
      }
    } else {
      setFeedback('Você errou o animal! Tente novamente.');
    }
  }, [level, selectedAnimals]);

  const displayEndGame = () => (
    <div className={styles.endWrapper}>
      <div>
        <h1>Parabéns!</h1>

        <p>Você acertou todos os animais!</p>
      </div>

      <div className={styles.animalsWrapper}>
        {selectedAnimals.slice(0, 8).map((animal, index) => (
          <div>
            <p key={index}>{animal.name}</p>
            <span className={styles.animals}>{animal.emoji}</span>
          </div>
        ))}
      </div>
    
      <button className={styles.button} onClick={startGame}>Jogar novamente</button>
    </div>
  );

  const displayGame = () => (
    <div className={styles.levelWrapper}>
      <h2>Nível {level}</h2>

      {feedback && <p className={styles.feedback}>{feedback}</p>}

      <p className={styles.animals}>{selectedAnimals[level - 1].emoji}</p>
      
      <div className={styles.optionsWrapper}>
        {currentOptions.map((animal, index) => (
          <button className={styles.button} key={index} onClick={() => handleChoice(animal)}>
            {animal.name}
          </button>
        ))}
      </div>
    </div>
  );

  const displayStart = () => (
    <div className={styles.startWrapper}>
      <h2>Seja bem-vindo ao zoológico!</h2>

      <p>Para começar, clique no botão abaixo.</p>

      <button className={styles.button} onClick={startGame}>Começar</button>
    </div>
  );

  const content = () => {
    if (level === 0) return displayStart();
    
    if (level > 8) return displayEndGame();
   
    return displayGame();
  };

  return (
    <AppLayout
      primaryColorBackground="#d72a2a"
      secondaryColorBackground="#ff3334"
      menuColor={"#d72a2aae"}
      imageLayout={IconZoo}
      pageTitle="Zoológico"
      imageDescription="Icone de elefante"
    >
      <div className={styles.wrapper}>
        {content()}
      </div>
    </AppLayout>
  );
}
