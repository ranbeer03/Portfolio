// CollectionExplorer.js
import React, { forwardRef } from 'react';
import './CollectionExplorer.css';
import './NewCollection.css';
import '../App.css';

const CollectionExplorer = forwardRef(({onButtonHover, onButtonClick}, ref ) => {
  return (
    <div ref={ref} className="collection-explorer-container">
      <h1 className="header">Explore By Collection</h1>
      <div className="explorer-button-container">
        <button 
          className="secondary-button" 
          onMouseEnter={() => onButtonHover("Pop Art")}
          onMouseLeave={() => onButtonHover(null)}
          onClick={() => onButtonClick("Pop Art")}
        >
          Pop Art
        </button>
        <button 
          className="secondary-button" 
          onMouseEnter={() => onButtonHover("Monopoly")}
          onMouseLeave={() => onButtonHover(null)}
          onClick={() => onButtonClick("Monopoly")}
        >
          Monopoly
        </button>
        <button 
          className="secondary-button" 
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
});

export default CollectionExplorer;
