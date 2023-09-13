import React from "react";
import "./App.css";
import ListComponent from "./components/ListComponent/ListComponent";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>React GraphQL App</h1>
      <ListComponent />
    </div>
  );
};

export default App;
