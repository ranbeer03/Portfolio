import React, {useState} from 'react';
import Card from '../Components/Cards';
import Joker from '../Components/3DModels/Joker';

import BeautyInBloom from '../Components/3DModels/BeautyInBloom';
import Beetle from '../Components/3DModels/Beetle';
import Simpson from '../Components/3DModels/Simpson';
import BlueFlower from '../Components/3DModels/BlueFlower';
import Fox from '../Components/3DModels/Fox';
import ThreeWomen from '../Components/3DModels/ThreeWomen';
import Dali from '../Components/3DModels/Dali';
import SanjayDutt from '../Components/3DModels/SanjayDutt';
import Norman from '../Components/3DModels/Norman';
import GoldenLeaf from '../Components/3DModels/GoldenLeaf';
import BlueGalaxy from '../Components/3DModels/BlueGalaxy';
import Flower from '../Components/3DModels/Flower';
import PinkSky from '../Components/3DModels/PinkSky';
import './GalleryPage.css'; 
import '../App.css'
import ShopCards from "../Components/ShopCards";
import { artData } from 'autoprefixer';



const GalleryPage = () => {

  const [activeButton, setActiveButton] = useState("medium");

  // Get filtered cards based on active button
  const getFilteredCards = (filterType) => {
    return artData.filter(card => card[activeButton] === filterType);
  }

  const renderCards = (filterType) => {
    return getFilteredCards(filterType).map((card, index) => (
      <div className='cards'>
      <Card
        key={index}
        name={card.name}
        description={card.description}
        imageUrl={card.imageUrl}
        size={card.size}
        medium={card.medium}
        type={card.type}
        sizeRange={card.sizeRange}
        subjectMatter={card.subjectMatter}
        Model3D={card.Model3D}
      />
      </div>
    ))
  }

  return (
  <div className="Gallery">
    <div className="header">
      <span className="background-title">Shop</span>
    </div>

    <div className="label-button-container">
      <button className={`label-button ${activeButton === 'medium' ? 'active' : ''}`} id="medium" onClick={() => setActiveButton('medium')}>Medium</button>
      <button className={`label-button ${activeButton === 'sizeRange' ? 'active' : ''}`} id="sizeRange" onClick={() => setActiveButton('sizeRange')}>Size</button>
      <button className={`label-button ${activeButton === 'subjectMatter' ? 'active' : ''}`} id="subjectMatter" onClick={() => setActiveButton('subjectMatter')}>Subject Matter</button>
      <button className={`label-button ${activeButton === 'type' ? 'active' : ''}`} id="type" onClick={() => setActiveButton('type')}>Type</button>
    </div>


    <ShopCards activeSection={activeButton}/>
    </div>
  );
}

export default GalleryPage;

