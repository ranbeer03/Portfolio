import React, {useEffect} from 'react';
import Card from './Cards';
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

  // const getFilteredCards = (filterType) => {
  //   return artData.filter(card => card[activeSection] === filterType);
  // };

  // const section = sectionConfig[activeSection];
  // if (!section) return null;

  // const renderCardsForOption = (option) => {
  //   const filteredCards = getFilteredCards(option.id);
  //   return (
  //       <div className='cards-container' key={option.id}>
  //         <h2 id={option.id}>{option.label}</h2>
  //         <div  className='row-container'>
  //           {filteredCards.map((card) => (
  //                <Card key={card.id} id={card.id} {...card} />
  //           ))}
  //         </div>
  //       </div>
  //   );
  // };

  // return (
  //       <div className='main-container'>
         
  //           {section.options.map(renderCardsForOption)}
  //       </div>
  // );
};

export default ShopCards;
