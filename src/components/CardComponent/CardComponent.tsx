import React from "react";
import { Country } from "../../types/Country";
import "./CardComponent.css";

interface CardComponentProps {
  country: Country;
  onClick: () => void;
  selected: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  country,
  onClick,
  selected,
}) => {
  const colors = [
    "#6096B4",
    "#93BFCF",
    "#525E75",
    "#93C6E7",
    "#A7727D",
    "#FD8A8A",
    "#554994",
    "#354259",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`card ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{ backgroundColor: selected ? color : "transparent" }}
    >
      <div className="card-header">
        <h3>{country.name}</h3>
        <span>{country.emoji}</span>
      </div>
      <div className="card-body">
        <table className="table">
          <tbody>
            <tr>
              <td>Native name:</td>
              <td>{country.native}</td>
            </tr>
            <tr>
              <td>Capital:</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>Currency:</td>
              <td>{country.currency}</td>
            </tr>
            <tr>
              <td>Languages:</td>
              <td>
                <ul>
                  {country.languages.map((language) => (
                    <li key={language.code}>
                      {language.code} - {language.name}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardComponent;
