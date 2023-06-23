import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import './Portfolio.css'

const images = [
  {
    src: "./Images/BeautyInBloom.jpg",
    width: 4,
    height: 4.75,
    medium: "acrylics",
    title: "Description of image 1"
  },
  {
    src: "./Images/3Women.jpg",
    width: 6,
    height: 4,
    medium: "acrylics",
    title: "Description of image 2"
  },
  {
    src: "./Images/Beetle.jpg",
    width: 4,
    height: 4,
    medium: "acrylics",
    title: "Description of image 1"
  },
  {
    src: "./Images/BlueFlower.jpg",
    width: 1.325,
    height: 2.075,
    medium: "water-colors",
    title: "Description of image 2"
  },
  {
    src: "./Images/BlueGalaxy.jpg",
    width: 1.0,
    height: 1.0,
    medium: "acrylics",
    title: "Description of image 1"
  },
  {
    src: "./Images/Dali.jpg",
    width: 4.5,
    height: 4.5,
    medium: "poster-colors",
    title: "Description of image 2"
  },
  {
    src: "./Images/Flower.jpg",
    width: 1,
    height: 1,
    medium: "acrylics",
    title: "Description of image 1"
  },
  {
    src: "./Images/Fox.jpg",
    width: 3,
    height: 4,
    medium: "water-colors",
    title: "Description of image 2"
  },
  {
    src: "./Images/GoldenLeaf.jpg",
    width: 1,
    height: 1,
    medium: "acrylics",
    title: "Description of image 2"
  },
  {
    src: "./Images/Joker.jpg",
    width: 3,
    height: 4,
    medium: "poster-colors",
    title: "Description of image 2"
  },
  {
    src: "./Images/Norman.jpg",
    width: 4,
    height: 6,
    medium: "charcoal",
    title: "Description of image 2"
  },
  {
    src: "./Images/PinkCar.jpg",
    width: 1,
    height: 1,
    medium: "acrylics",
    title: "Description of image car"
  },
  {
    src: "./Images/PinkSky.jpg",
    width: 1,
    height: 1,
    medium: "acrylics",
    title: "Description of image 2"
  },
  {
    src: "./Images/SanjayDutt.jpg",
    width: 4,
    height: 6,
    medium:"charcoal",
    title: "Description of image 2"
  },
  {
    src: "./Images/Simpson.jpg",
    width: 2.5,
    height: 3,
    medium: "acrylics",
    title: "Description of image 2"
  },
  {
    src: "./Images/Krishan.jpg",
    width: 4,
    height: 6,
    medium: "acrylics",
    title: "Description of image 2"
  },
  {
    src: "./Images/Guitar.jpg",
    width: 2.5,
    height: 3,
    medium: "acrylics",
    title: "Description of image 2"
  }
];

const categories = [
  "All",
  "Acrylics",
  "Poster Colors",
  "Water Colors",
  "Charcoal"
];

function Portfolio() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const handleCategoryClick = (medium) => setActiveCategory(medium);
  
    const filteredImages = activeCategory === "all"
      ? images
      : images.filter(image => image.medium === activeCategory);
  
    const openLightbox = (event, { index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    };
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  
    const renderImageModal = () => (
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={filteredImages} />
          </Modal>
        )}
      </ModalGateway>
    );

    const [activeButton, setActiveButton] = useState("All");
  
    return (
      <div className='portfolio'>
        <div className="header">
            <span className="background-title">MY WORK</span>
            <span className="overlay-title">Portfolio</span>
        </div>
    
        <button className={`label-button ${activeButton === 'All' ? 'active' : ''}`} key="all" onClick={() =>{handleCategoryClick('all'); setActiveButton('All');}}>All</button>
        <button className={`label-button ${activeButton === 'Acrylics' ? 'active' : ''}`} key="acrylics" onClick={() =>{handleCategoryClick('acrylics'); setActiveButton('Acrylics');}}>Acrylics</button>
        <button className={`label-button ${activeButton === 'Poster-colors' ? 'active' : ''}`} key="poster-colors" onClick={() =>{handleCategoryClick('poster-colors'); setActiveButton('Poster-colors');}}>Poster Colors</button>
        <button className={`label-button ${activeButton === 'Water-colors' ? 'active' : ''}`} key="water-colors" onClick={() =>{handleCategoryClick('water-colors'); setActiveButton('water-colors');}}>Water Colors</button>
        <button className={`label-button ${activeButton === 'charcoal' ? 'active' : ''}`} key="charcoal" onClick={() =>{handleCategoryClick('charcoal'); setActiveButton('charcoal');}}>Charcoal</button>
        
  
        <Gallery key={activeCategory} photos={filteredImages} onClick={openLightbox} />

    {renderImageModal()}
  </div>
);
  }
  
  export default Portfolio;