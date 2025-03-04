import { FilterOption } from "./types";

type FilterSectionProps = {
  filter: FilterOption;
  search: string;
  setFilter: React.Dispatch<React.SetStateAction<FilterOption>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterSection: React.FC<FilterSectionProps> = ({
  setFilter,
  setSearch,
}) => {
  return (
    <div className="flex justify-between items-center gap-1">
      <div>
        <label className="mr-2">Filter:</label>
        <select
          onChange={(e) => setFilter(e.target.value as FilterOption)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search orders..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
