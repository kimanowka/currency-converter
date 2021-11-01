import React, { useState } from "react";
import { CurrencyProps } from "./types";

interface Props {
  children: React.ReactNode;
}

export interface ContextProps {
  currency: CurrencyProps[];
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyProps[]>>;
  rub: number;
  setRub: React.Dispatch<React.SetStateAction<number>>;
  result: string;
  currencyConverter: number;
  setCurrencyConverter: React.Dispatch<React.SetStateAction<number>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  inputHandlerRub: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputHandlerCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const Context = React.createContext<ContextProps>({
  currency: [],
  setCurrency: () => {},
  rub: 1,
  setRub: () => {},
  result: "1",
  currencyConverter: 1,
  setCurrencyConverter: () => {},
  setResult: () => {},
  inputHandlerRub: () => {},
  inputHandlerCurrency: () => {},
});

export const ContextProvider = ({ children }: Props) => {
  const [currency, setCurrency] = useState<CurrencyProps[]>([]);
  const [rub, setRub] = useState<number>(0);
  const [currencyConverter, setCurrencyConverter] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const inputHandlerRub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert("Введите только число");
      setRub(0);
    } else {
      setRub(Number(e.target.value));
      setResult(((rub / currencyConverter) * 10).toFixed(2));
    }
  };
  const inputHandlerCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyConverter(Number(e.target.value));
    setResult(((rub / currencyConverter) * 10).toFixed(2));
  };
  return (
    <Context.Provider
      value={{
        currency,
        setCurrency,
        rub,
        setRub,
        result,
        setResult,
        inputHandlerRub,
        inputHandlerCurrency,
        currencyConverter,
        setCurrencyConverter,
      }}
    >
      {children}
    </Context.Provider>
  );
};
