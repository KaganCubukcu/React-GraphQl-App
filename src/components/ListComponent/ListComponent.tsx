import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

//Components
import CardComponent from "../CardComponent/CardComponent";
import Button from "../ButtonComponent/ButtonComponent";
import FilterComponent from "../FilterComponent/FilterComponent";
import Pagination from "../Pagination/Pagination";
import "./ListComponent.css";

//Type
import { Country } from "../../types/Country";

//Query
const LIST_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const ITEMS_PER_PAGE = 10;

const ListComponent: React.FC = () => {
  // Data from Apollo Client
  const { data, loading, error } = useQuery(LIST_COUNTRIES, {
    notifyOnNetworkStatusChange: true,
  });

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Filters and separates countries into pages
  const countries = data ? data.countries : [];
  const indexOfLastCountry = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCountry = indexOfLastCountry - ITEMS_PER_PAGE;
  const currentCountries = countries
    .filter((country: Country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    )
    .slice(indexOfFirstCountry, indexOfLastCountry);

  // Automatically selects a country when the data arrives
  useEffect(() => {
    if (data && data.countries.length > 0) {
      const indexToSelect = Math.min(9, data.countries.length - 1);
      setSelectedCountry(data.countries[indexToSelect]);
    }
  }, [data]);

  // Automatically selects the last item when the page changes
  useEffect(() => {
    if (currentCountries.length > 0) {
      setSelectedCountry(currentCountries[currentCountries.length - 1]);
    }
  }, [currentPage]);

  // Automatically selects a country when the filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (currentCountries.length > 0) {
      const indexToSelect = Math.min(9, currentCountries.length - 1);
      setSelectedCountry(currentCountries[indexToSelect]);
    } else {
      setSelectedCountry(null);
    }
  };

  // Updates the selected country when the country is clicked
  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  // Filtered countries
  const filteredCountries = countries.filter((country: Country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Checks loading or error conditions
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="list">
      <FilterComponent onFilterChange={handleFilterChange} />
      <div className="card-container">
        {currentCountries.length > 0 ? (
          currentCountries.map((country: Country, index: number) => (
            <CardComponent
              key={index}
              country={country}
              onClick={() => handleCountryClick(country)}
              selected={selectedCountry === country}
            />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
      <div>
        <Button
          text="Previous"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination
          countries={filteredCountries}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <Button
          text="Next"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(countries.length / ITEMS_PER_PAGE)
          }
        />
      </div>
    </div>
  );
};

export default ListComponent;
