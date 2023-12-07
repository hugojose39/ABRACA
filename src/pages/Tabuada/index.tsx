import { useState, useEffect, ChangeEvent, useMemo } from "react";
import cx from "classnames";

import AppLayout from "../../layout/App/AppLayout";
import IconMultiplicationTable from "../../assets/img/icon-multiplication-table.png";
import OperationInput from "../../components/Tabuada/OperationInput";
import styles from './styles.module.scss';

enum Operations {
  Sum = 'sum',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division'
}

export default function Tabuada() {
  const [operation, setOperation] = useState<Operations>(Operations.Sum);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('tabuadaAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.removeItem('tabuadaAnswers');
    }
    
    return () => {
      localStorage.removeItem('tabuadaAnswers');
    }
  }, []);


  const handleAnswer = (firstNumber: number, secondNumber: number, answer: number) => {
    const key = `${operation}-${firstNumber}-${secondNumber}`;
    setAnswers(prev => {
      const newAnswers = { ...prev, [key]: answer };
      localStorage.setItem('tabuadaAnswers', JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  const generateSequentialTabuada = () => {
    let result = [];

    for (let i = 1; i <= 10; i++) {
      let temp = [];
      for (let j = 1; j <= 10; j++) {
        if (operation === Operations.Subtraction || operation === Operations.Division) {
          if (i >= j) {
            temp.push([i, j]);
          }
        } else {
          temp.push([i, j]);
        }
      }
      result.push(temp);
    }

    return result;
  };

  const sequentialTabuada = useMemo(() => generateSequentialTabuada(), [operation]);

  const tabuada = sequentialTabuada.map((item, index) => {
    return (
      <div 
        key={index}
        className={styles.card}
      >
        <h2>{index + 1}</h2>

        {item.map((tabuadaNumber, tabuadaIndex) => {
          return (
            <OperationInput
              key={tabuadaIndex + tabuadaNumber[0] + tabuadaNumber[1]}
              firstNumber={tabuadaNumber[0]}
              secondNumber={tabuadaNumber[1]}
              operation={operation}
              onSuccess={(answer: number) => handleAnswer(tabuadaNumber[0], tabuadaNumber[1], answer)}
              storedAnswer={answers[`${operation}-${tabuadaNumber[0]}-${tabuadaNumber[1]}`]}
            />
          )
        })}
      </div>
    )
  });

  const numberOptions = sequentialTabuada.map((_, index) => {
    return (
      <button
        key={index}
        className={cx(styles.numberOption, { [styles.numberOptionActive]: index === number })}
        onClick={() => setNumber(index)}
      >
        {index + 1}
      </button>
    )
  })

  const mobileNumberOptions = sequentialTabuada.map((item, index) => {
    return (
      <option key={index} value={index}>{index + 1}</option>
    )
  })

  return (
    <AppLayout
      primaryColorBackground="#dfa803"
      secondaryColorBackground="#ffbf00"
      menuColor={"#dfa803bb"}
      imageLayout={IconMultiplicationTable}
      pageTitle="Tabuada"
      imageDescription="Icone tabuada"
    >
      <div className={styles.operations}>
        {Object.values(Operations).map((item, index) => {
          return (
            <button
              key={index}
              className={cx(styles.operationToggler, { [styles.operationTogglerActive]: operation === item })}
              onClick={() => setOperation(item)}
            >
              {item === Operations.Sum && 'Soma'}
              {item === Operations.Subtraction && 'Subtração'}
              {item === Operations.Multiplication && 'Multiplicação'}
              {item === Operations.Division && 'Divisão'}
            </button>
          )
        })}
      </div>

      <div className={styles.numberOptions}>
        {numberOptions}
      </div>

      <div className={styles.mobileNumberOptions}>
        <select
          value={number}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setNumber(Number(event.target.value))}
        >
          {mobileNumberOptions}
        </select>
      </div>

      <div className={styles.content}>
        {tabuada[number]}
      </div>
    </AppLayout>
  );   
}
