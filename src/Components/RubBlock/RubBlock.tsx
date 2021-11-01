import styles from "./RubBlock.module.css";
interface RubBlockProps {
  inputHandlerRub: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rub: number;
}
export default function RubBlock({ inputHandlerRub, rub }: RubBlockProps) {
  return (
    <div className={styles.block}>
      <span>RUB</span>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputHandlerRub(e);
        }}
        value={rub}
      />
    </div>
  );
}
