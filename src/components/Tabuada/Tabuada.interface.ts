import { Operations } from "./enums";

export interface OperationInputProps {
  firstNumber: number;
  secondNumber: number;
  operation: Operations;
  onSuccess: (value: number) => void;
  storedAnswer?: number;
}
