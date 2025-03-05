import { filterOptions, SelectOptions } from "../SelectOptions";
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
    <div className="flex items-center justify-between gap-1">
      <div>
        <label className="mr-2">Filter:</label>
        <select
          onChange={(e) => setFilter(e.target.value as FilterOption)}
          className="rounded border p-2"
        >
          <option value="all">All</option>
          <SelectOptions options={filterOptions} />
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search orders..."
          className="rounded border p-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
