import React from "react";

// Css
import "./FilterComponent.css";

// Type
interface FilterComponentProps {
  onFilterChange: (filter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;
    onFilterChange(newFilter);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter countries..."
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default FilterComponent;
