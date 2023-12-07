import { ChangeEvent, useEffect, useState } from "react";
import cx from 'classnames';

import { Operations } from "../enums";

import { OperationInputProps } from "../Tabuada.interface";

import styles from './styles.module.scss';

export default function OperationInput({
  firstNumber,
  secondNumber,
  operation,
  onSuccess,
  storedAnswer,
}: OperationInputProps) {
  const [value, setValue] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (storedAnswer) {
      setValue(storedAnswer);
      setIsSuccess(true);
      setError('');
    } else {
      setValue(0);
      setIsSuccess(false);
    }
  }, [storedAnswer, operation]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
    setError('');
  }

  const verifyAnswer = () => {
    const operationCalc = {
      [Operations.Sum]: firstNumber + secondNumber,
      [Operations.Subtraction]: firstNumber - secondNumber,
      [Operations.Multiplication]: firstNumber * secondNumber,
      [Operations.Division]: parseFloat((firstNumber / secondNumber).toFixed(1)),
    }

    console.log(operationCalc[operation], value)

    if (value === operationCalc[operation]) {
      setIsSuccess(true);
      onSuccess(value);
    } else {
      setError('Resposta incorreta');
    }
  }
  
  return ( 
    <div className={cx(styles.cardWrapper, { 
      [styles.cardWrapperError]: error !== '', 
      [styles.cardWrapperSuccess]: isSuccess,
    })}
    >
      <div className={styles.operationWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.input}>
            {firstNumber}
          </div>

          {operation === Operations.Sum && '+'}
          {operation === Operations.Subtraction && '-'}
          {operation === Operations.Multiplication && '×'}
          {operation === Operations.Division && '÷'}

          <div className={styles.input}>
            {secondNumber}
          </div>

          =

          <input type="number" value={value} onChange={handleChange} disabled={isSuccess} className={styles.textInput} step="any" min={0} />
        </div>

        <button onClick={verifyAnswer} disabled={isSuccess} className={styles.button}>
          Verificar
        </button>
      </div>

      {error && <p>{error}</p>}
    </div>
  )
}
