interface ConverterProps {
  name: string;
  price: number;
  nominal: number;
}
export default function Converter({ name, price, nominal }: ConverterProps) {
  return (
    <option value={price}>
      {name}, номиналом : {nominal}
    </option>
  );
}
