import React, {useEffect} from 'react';
import Card from '../Components/Cards';
import { artData } from '../Data/Data';
import '../App.css';
import './ShopCards.css'

const sectionConfig = {
  medium: {
    label: "Medium",
    options: [
      { id: "acrylics", label: "Acrylics" },
      { id: "poster-colors", label: "Poster Colors" },
      { id: "water-colors", label: "Water Colors" },
      { id: "charcoal", label: "Charcoal" },
    ],
  },
  type: {
    label: "Type",
    options: [
      { id: "abstract", label: "Abstract" },
      { id: "realistic", label: "Realistic" },
      { id: "surrealistic", label: "Surrealistic" },
      { id: "minimalistic", label: "Minimalistic" },
    ],
  },
  sizeRange: {
    label: "Size",
    options: [
      { id: "small", label: "Small" },
      { id: "medium", label: "Medium" },
      { id: "large", label: "Large" },
      { id: "extraLarge", label: "Extra Large" },
    ],
  },
  subjectMatter: {
    label: "Subject Matter",
    options: [
      { id: "portrait", label: "Portrait" },
      { id: "nature", label: "Nature" },
      { id: "abstract", label: "Abstract" },
    ],
  },
};

const ShopCards = ({ activeSection }) => {

  // Filter cards based on the activeSection field
  const getFilteredCards = (filterType) => {
    return artData.filter(card => card[activeSection] === filterType);
  };

  // Get the config for the current active section
  const section = sectionConfig[activeSection];
  if (!section) return null;

  const renderCardsForOption = (option) => {
    const filteredCards = getFilteredCards(option.id);
    return (
        <div className={"main-container"} key={option.id}>
          <h3 id={option.id}>{option.label}</h3>
          <div  className='row-container'>
            {filteredCards.map((card) => (
                <div  className='cards-container' key={card.id || card.name}>
                 <Card key={card.id} id={card.id} {...card} />

                </div>
            ))}
          </div>
        </div>
    );
  };

  return (
        <div className='main-container'>
          <div className="button-container">
            {section.options.map(option => (
                <a
                    key={option.id}
                    href={`#${option.id}`}
                    className="scroll-button"
                >
                  {option.label}
                </a>
            ))}
          </div>
          <div className='cards-container'>
            {section.options.map(renderCardsForOption)}
          </div>
        </div>
  );
};

export default ShopCards;
