import React, { useState, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

function App() {
  const [showDropdown, setShowDropdown] = useState(null);

  const handleHeaderClick = () => {
    window.location.reload();
  };

  const handleDropdownClick = (dropdownName) => {
    setShowDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".sec-center")) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="App">
      <div className="header-line">
        <p
          id="header-text"
          className="hoverable-text"
          onClick={handleHeaderClick}
        >
          Pathfinding Visualizer
        </p>
      </div>
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
