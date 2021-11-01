import styles from "./Currency.module.css";
interface CurrencyProps {
  name: string;
  currentCurrency: number;
  prevCurrency: number;
  fullName: string;
}
export default function Currency({
  name,
  currentCurrency,
  prevCurrency,
  fullName,
}: CurrencyProps) {
  return (
    <div className={styles.wrapper}>
      <div>
        <span>{name}</span>
        <span
          className={currentCurrency > prevCurrency ? styles.red : styles.green}
        >
          {currentCurrency}
        </span>
      </div>
      <div>{fullName}</div>
    </div>
  );
}
