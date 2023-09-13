import React from "react";
import { Country } from "../../types/Country";
import "./Pagination.css";

type PaginationProps = {
  countries: Country[]; // Use the appropriate type (Country[]) instead of 'any[]'
  currentPage: number;
  onPageChange: (page: number) => void;
};

const ITEMS_PER_PAGE = 10;

const Pagination: React.FC<PaginationProps> = ({
  countries,
  currentPage,
  onPageChange,
}) => {
  const numPages = Math.ceil(countries.length / ITEMS_PER_PAGE);
  const pageNumbers = [];

  // Mevcut sayfanın etrafındaki sayfa numaralarını göster
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(numPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }
  if (!pageNumbers.includes(numPages)) {
    pageNumbers.push(numPages);
  }
  return (
    <div className="pagination-container">
      {pageNumbers.map((num) => (
        <button
          key={num}
          disabled={num === currentPage}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
