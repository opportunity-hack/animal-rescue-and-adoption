import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

export interface FilterOptions {
  sex: string;
  species: string;
  status: string;
  _id: string;
  name: string;
  behavior: string;
}

const initialFilterOptions: FilterOptions = {
  sex: "",
  species: "",
  status: "",
  _id: "",
  name: "",
  behavior: "",
};

const SearchBar: React.FC<{
  onSearch: (query: string, filters: FilterOptions) => void;
}> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilterOptions);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center bg-gray-200 rounded-lg">
        <input
          type="search"
          placeholder="Search for animals in the database..."
          className="flex-grow p-2 bg-transparent outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="p-2">
          <Search className="w-5 h-5" />
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="p-2">
          <Filter className="w-5 h-5" />
        </button>
      </div>
      {showFilters && (
        <div className="mt-2 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Filters</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(filters).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={value}
                  onChange={(e) =>
                    handleFilterChange(
                      key as keyof FilterOptions,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
