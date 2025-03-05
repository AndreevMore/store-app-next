export const filterOptions = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "shipped", label: "Shipped" },
];

type Option = {
  value: string;
  label: string;
};

type SelectOptionsProps = {
  options: Option[];
};

export const SelectOptions: React.FC<SelectOptionsProps> = ({ options }) => {
  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};
