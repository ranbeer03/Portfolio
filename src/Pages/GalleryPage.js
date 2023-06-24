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
import './GalleryPage.css'; // We will create this file for styling.

const GalleryPage = () => {

  const [activeButton, setActiveButton] = useState("medium");

  const cards = [
    {
      name: "BEAUTY IN BLOOM",
      description: "This piece of art exists within its true bohemian element by integrating an eclectic fusion of textures, patterns and colours. The painting parallels the beauty of an elegant woman with that of a flower. The eccentric outline of the facial structure and the wide array of colours add an unconventional layer to this graceful portrait.",
      imageUrl: "./Images/BeautyInBloom.jpg",
      size: "19 X 16 inches",
      medium: "acrylics",
      type: 'abstract' ,
      sizeRange:'large' ,
      subjectMatter: 'portrait',
      Model3D: BeautyInBloom
    },
    {
      name: "EVERY SISTERHOOD HAS RULES",
      description: "This piece of modern art showcases the subtle strength of feminine companionship. A single white outline runs throughout the positive space to form three separate female structures, exhibiting an underlying connection amongst the females. It embodies three clear and stimulating colours to highlight the strength in femininity.",
      imageUrl: "./Images/3Women.jpg",
      size: "5.3 x 8.3 inches",
      medium: "acrylics",
      type: 'abstract', 
      sizeRange: 'large',
      subjectMatter: 'portrait',
      Model3D: ThreeWomen
    },
    {
      name: "THE BEETLE",
      description: "This particular piece seeks to capture the sprightly spirit of an all-time favourite vehicle. It embodies a detailed reflection of the Beetle and utilises a wide array of vibrant colours. A geometrical/ structured outline of the car is positioned upon a free-flowing backdrop to highlight each component of the subject matter.",
      imageUrl: "./Images/Beetle.jpg",
      size: "16 x 16 inches",
      medium: "acrylics",
      type: 'surrealistic' ,
      sizeRange: 'large',
      subjectMatter: 'abstract',
      Model3D: Beetle
    },
    {
      name: "THE HUNGRY SIMPSON",
      description: "By utilising an array of vibrant colours, the Hungry Simpson is a joyful portrait of a beloved fictional character. This contemporary piece effectively utilises its positive space to create an energetic and lively aesthetic. This detailed three dimensional artwork reflects a natural sense of depth and space. ",
      imageUrl: "./Images/Simpson.jpg",
      size: "12 x 10 inches",
      medium: "acrylics",
      type: 'abstract',
      sizeRange: 'medium', 
      subjectMatter: 'portrait',
      Model3D: Simpson
    },
    {
      name: "SANJAY DUTT",
      description: "This particular piece is a visual representation of an Indian actor Sanjay Dutt in his antagonistic role of Adheera in KGF: Chapter 2. The expression of sitter here also captures the fearless, powerful and ruthless character of Adheera.",
      imageUrl: "./Images/SanjayDutt.jpg",
      size: "24 x 16 inches",
      medium: "charcoal",
      type: 'realistic' ,
      sizeRange: 'large', 
      subjectMatter: 'portrait',
      Model3D: SanjayDutt
    },
    {
      name: "NORMAN REEDUS",
      description: "This is a realistic portrait of an American actor and model Norman Reedus in his role of Daryl Dixon from the show Walking Dead. The sitter's expression here tells us about the character he plays, who despite his hardened personality, is not without a soft, emotional side.",
      imageUrl: "./Images/Norman.jpg",
      size: "24 x 16 inches",
      medium: "charcoal",
      type: 'realistic' ,
      sizeRange: 'large', 
      subjectMatter: 'portrait',
      Model3D: Norman
    },
    {
      name: "CELESTIAL TIDE",
      description: "An asterism of stars spills across the night sky as a young man, sitting on the edge, attempts to absorb this celestial tide.",
      imageUrl: "./Images/BlueGalaxy.jpg",
      size: "4 x 4 inches",
      medium: "acrylics",
      type:'surrealistic', 
      sizeRange:'small',
      subjectMatter:'nature',
      Model3D: BlueGalaxy
    },
    {
      name: "FALLEN ANGELS",
      description: "This piece of art captures the beauty of a peaceful pink sky on a cold Christmas day. The pink notes in the sky envelope in shadow the snow- covered Christmas tress, watching over the fallen angel.",
      imageUrl: "./Images/PinkSky.jpg",
      size: "4 x 4 inches",
      medium: "acrylics",
      type: 'realistic',
      sizeRange: 'small',
      subjectMatter: 'nature',
      Model3D: PinkSky
    },
    {
      name:"SHADES OF SPRING",
      description:"This artwork captures the various blazing colors of springtime into one flower to represent the essence of the season. A cool blue combines with brilliant shades of yellow and green to create a unique chromatic piece.",
      imageUrl: "./Images/Flower.jpg",
      size: "4 x 4 inches",
      medium: "acrylics",
      type: 'abstract',
      sizeRange: 'small',
      subjectMatter: 'nature',
      Model3D: Flower
    },
    {
      name:"UNNATURAL BEAUTY",
      description:"This painting embodies an overlap between natural and man-made as it showcases an artistic pattern of leaves in a rather unnatural combination of silver and gold.",
      imageUrl:"./Images/GoldenLeaf.jpg",
      size:"4 x 4 inches",
      medium:"acrylics",
      type:'abstract',
      sizeRange:'small',
      subjectMatter:'nature',
      Model3D: GoldenLeaf
    },
    {
      name:"SAPPHIRE SYMPHONY",
      description: "The sapphire flowers in this piece have a little transparency which allows for a freshness and luminosity in its washes and makes it alluring. These flowers capture an essence of peace, serenity, openness and relaxation that help bring focus and calm the mind.",
      imageUrl: "./Images/BlueFlower.jpg",
      size: "5.3 x 8.3 inches",
      medium: "water-colors",
      type: 'abstract' ,
      sizeRange: 'medium',
      subjectMatter: 'nature',
      Model3D: BlueFlower
    },
    {
      name: "TWO OF A KIND",
      description: "TThis artwork showcases two foxes trying to to hold onto each other as their souls slowly fade into the oblivion. The same hues of orange, red and yellow are used in the composition of both subjects to reflect how identical they are at their core.",
      imageUrl: "./Images/Fox.jpg",
      size: "5.3 x 8.3 inches",
      medium: "water-colors",
      type: 'abstract',
      sizeRange: 'medium', 
      subjectMatter: 'nature',
      Model3D: Fox
    },
    {
      name:"A HAPPY FACE",
      description:"This artwork seeks to capture the essence of a troubled character by utilising various colour schemes in a low poly portrait. It incorporates a set of provocative colours to set a sharp and stimulating mood. The portrait is set against a black backdrop and aims to reflect the multifaceted character of the joker",
      imageUrl:"./Images/Joker.jpg",
      size:"5.3 x 8.3 inches",
      medium: "poster-colors",
      type:'abstract',
      sizeRange:'medium',
      subjectMatter:'portrait',
      Model3D:Joker
    },
    {
      name:"DALÍ",
      description:"This abstracted piece of art captures the sharp-eyed expression of the infamous Spanish artist Salvador Dali. To seize the essence of his look and pay tribute to Dali’s bizarre artistry, this artwork incorporates a range of distinctive colours within his portrait. These vivid colours are placed in hard- edged geometrical fragments across his face as a homage to Dali’s technicality and precise craftsmanship.",
      imageUrl:"./Images/Dali.jpg",
      size:"18 x 18 inches",
      medium:"poster-colors",
      type:'abstract',
      sizeRange:'large',
      subjectMatter:'portrait',
      Model3D: Dali
    },
    {
      name:"THE HUNGRY SIMPSON",
      description:"By utilising an array of vibrant colours, the Hungry Simpson is a joyful portrait of a beloved fictional character. This contemporary piece effectively utilises its positive space to create an energetic and lively aesthetic. This detailed three dimensional artwork reflects a natural sense of depth and space. ",
      imageUrl:"./Images/Simpson.jpg",
      size:"12 x 10 inches",
      medium:"acrylics",
      type:'abstract',
      sizeRange:'medium',
      subjectMatter:'portrait',
      Model3D:Joker
    }
  ]

  // Get filtered cards based on active button
  const getFilteredCards = (filterType) => {
    return cards.filter(card => card[activeButton] === filterType);
  }

  // Render cards
  const renderCards = (filterType) => {
    return getFilteredCards(filterType).map((card, index) => (
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
    ))
  }

  return (
  <div className="Gallery">
    <div className="header">
      <span className="background-title">ARTWORK</span>
      <span className="overlay-title">Gallery</span>
    </div>

    <div className="label-container">
      <button className={`label-button ${activeButton === 'medium' ? 'active' : ''}`} id="medium" onClick={() => setActiveButton('medium')}>Medium</button>
      <button className={`label-button ${activeButton === 'sizeRange' ? 'active' : ''}`} id="sizeRange" onClick={() => setActiveButton('sizeRange')}>Size</button>
      <button className={`label-button ${activeButton === 'subjectMatter' ? 'active' : ''}`} id="subjectMatter" onClick={() => setActiveButton('subjectMatter')}>Subject Matter</button>
      <button className={`label-button ${activeButton === 'type' ? 'active' : ''}`} id="type" onClick={() => setActiveButton('type')}>Type</button>
    </div>


    <div className='main-main-container'>
      {activeButton === "medium" && (
        <div className='main-container'>
          <div className="button-container">
            <a href="#acrylics" className="scroll-button">Acrylics </a>
            <a href="#poster-colors" className="scroll-button">Poster Colors</a>
            <a href="#water-colors" className="scroll-button">Water Colors</a>
            <a href="#charcoal" className="scroll-button">Charcoal</a>
          </div>

          <div className='card-container'> 
            <h3 className='main-heading' id="acrylics">Acrylics</h3>
            {renderCards('acrylics')}
            <h3 className='main-heading' id="poster-colors">Poster Colors</h3>
            {renderCards('poster-colors')}
            <h3 className='main-heading' id="water-colors">Water Colors</h3>
            {renderCards('water-colors')}
            <h3 className='main-heading' id="charcoal">Charcoal</h3>
            {renderCards('charcoal')}
          </div>
        </div>
      )}
      {activeButton === "type" && (
        <div className='main-container'>
          <div className="button-container">
            <a href="#abstract" className="scroll-button">Abstract</a>           
            <a href="#realistic" className="scroll-button">Realistic</a>           
            <a href="#surrealistic" className="scroll-button">Surrealistic</a>          
            <a href="#minimalistic" className="scroll-button">Minimalistic</a>            
          </div>
          
          <div className='card-container'> 
            <h3 className='main-heading' id="abstract">Abstracts</h3>
            {renderCards('abstract')}
            <h3 className='main-heading' id="realistic">Realistic</h3>
            {renderCards('realistic')}
            <h3 className='main-heading' id="surrealistic">Surrealistic</h3>
            {renderCards('surrealistic')}
            <h3 className='main-heading' id="minimalistic">Minimalistic</h3>
            {renderCards('minimalistic')}
          </div>
        </div>
      )}
      {activeButton === "sizeRange" && (
        <div className='main-container'>
          <div className="button-container">
            <a href="#small" className="scroll-button">Small</a>
            <a href="#medium-size" className="scroll-button">Medium</a>
            <a href="#large" className="scroll-button">Large</a>
            <a href="#extra-large" className="scroll-button">Extra Large</a>
          </div>
          <div className='card-container'> 
            <h3 className='main-heading' id="small">Small</h3>
            {renderCards('small')}
            <h3 className='main-heading' id="medium-size">Medium</h3>
            {renderCards('medium')}
            <h3 className='main-heading' id="large">Large</h3>
            {renderCards('large')}
            <h3 className='main-heading' id="extra-large">Extra Large</h3>
            {renderCards('extra-large')}
          </div>
        </div>
      )}
      {activeButton === "subjectMatter" && (
        <div className='main-container'>
          <div className="button-container">
            <a href="#portrait" className="scroll-button">Portrait</a>
            <a href="#nature" className="scroll-button">Nature</a>
            <a href="#abstract" className="scroll-button">Abstract</a>
          </div>
          <div className='card-container'> 
            <h3 className='main-heading' id="portrait">Portrait</h3>
            {renderCards('portrait')}
            <h3 className='main-heading' id="nature">Nature</h3>
            {renderCards('nature')}
            <h3 className='main-heading' id="abstract">Abstract</h3>
            {renderCards('abstract')}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default GalleryPage;
