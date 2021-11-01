import { useEffect, useState } from "react";
import { CurrencyProps } from "./types";
import styles from "./App.module.css";
import axios from "axios";
import Currency from "./Components/Currency/Currency";
import Converter from "./Components/Converter/Converter";
import RubBlock from "./Components/RubBlock/RubBlock";

const App = (): JSX.Element => {
  const [currency, setCurrency] = useState<CurrencyProps[]>([]);
  const [rub, setRub] = useState<number>(1);
  const [currencyConverter, setCurrencyConverter] = useState<number>(1);
  const [result, setResult] = useState<string>("введите вашу сумму в рублях");

  useEffect(() => {
    axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js")
      .then(({ data: { Valute } }: any) => {
        const arr: CurrencyProps[] = [];
        for (let key in Valute) {
          arr.push(Valute[key]);
        }
        setCurrency(arr);
      });
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      axios
        .get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(({ data: { Valute } }: any) => {
          const arr: CurrencyProps[] = [];
          for (let key in Valute) {
            arr.push(Valute[key]);
          }
          setCurrency(arr);
        });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currency]);

  const inputHandlerRub = (e: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseFloat(e.target.value);
    setRub(number);
    setResult((number / currencyConverter).toFixed(2));
  };
  const inputHandlerCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let number = parseFloat(e.target.value);
    setCurrencyConverter(number);
    setRub(rub);
    setResult((rub / number).toFixed(2));
  };
  return (
    <div className={styles.wrapper}>
      <h1> currency converter</h1>
      <div className={styles.currency}>
        {currency.map((item) => {
          return (
            <Currency
              key={item.ID}
              name={item.CharCode}
              currentCurrency={item.Value}
              prevCurrency={item.Previous}
              fullName={item.Name}
            />
          );
        })}
      </div>
      <RubBlock inputHandlerRub={inputHandlerRub} rub={rub} />
      <select onChange={inputHandlerCurrency}>
        <option>Выбери из списка валюту</option>
        {currency.map((item) => {
          return (
            <Converter
              key={item.ID}
              name={item.CharCode}
              price={item.Value}
              nominal={item.Nominal}
            />
          );
        })}
      </select>
      <div>{result}</div>
    </div>
  );
};

export default App;
