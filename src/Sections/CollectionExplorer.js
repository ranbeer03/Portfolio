// CollectionExplorer.js
import React from 'react';
import './CollectionExplorer.css';
import './NewCollection.css';
import '../App.css';

const CollectionExplorer = ({ onButtonHover, onButtonClick }) => {
  return (
    <div className="collection-explorer-container">
      <h1 className="header">Explore By Collection</h1>
      <div className="explorer-button-container">
        <button 
          className="scroll-button" 
          onMouseEnter={() => onButtonHover("Pop Art")}
          onMouseLeave={() => onButtonHover(null)}
          onClick={() => onButtonClick("Pop Art")}
        >
          Pop Art
        </button>
        <button 
          className="scroll-button" 
          onMouseEnter={() => onButtonHover("Monopoly")}
          onMouseLeave={() => onButtonHover(null)}
          onClick={() => onButtonClick("Monopoly")}
        >
          Monopoly
        </button>
        <button 
          className="scroll-button" 
          id="medium"
          onMouseEnter={() => onButtonHover("Animals")}
          onMouseLeave={() => onButtonHover(null)}
          onClick={() => onButtonClick("Animals")}
        >
          Animals
        </button>
      </div>
    </div>
  );
};

export default CollectionExplorer;
