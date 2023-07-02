import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import './Portfolio.css';
import { cards } from '../Pages/GalleryPage';

const categories = [
  "All",
  "Acrylics",
  "Poster-colors",
  "Water-colors",
  "Charcoal"
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeButton, setActiveButton] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCategoryClick = (medium) => setActiveCategory(medium);

  const filteredImages = activeCategory === "all"
    ? cards
    : cards.filter(image => image.medium === activeCategory);

  const handleImageClick = (image) => {
      setSelectedImage(image);
      setModalIsOpen(true);
  };

  const closeModal = () => {
      setModalIsOpen(false);
  };

  return (
    <div className='portfolio'>
      <div className="header">
          <span className="background-title">MY WORK</span>
          <span className="overlay-title">Portfolio</span>
      </div>
    
      {categories.map((category, index) => (
          <button
            className={`label-button ${activeButton === category ? 'active' : ''}`}
            key={index}
            onClick={() => {handleCategoryClick(category.toLowerCase()); setActiveButton(category);}}
          >
            {category}
          </button>
        ))}
      <div className='image-container'>
        

        {filteredImages.map((image, index) => (
          <div key={index} className="image-wrapper" onClick={() => handleImageClick(image)}>
            <img src={image.imageUrl} alt={image.name} />
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className='modal-card'
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'relative',
            width: '80%',
            maxWidth: '800px', 
            maxHeight: 'auto', 
            overflow: 'auto', 
          }
        }}
      >    
          <div className='back-button-container'>
            <div className='back-button' onClick={closeModal}>
              <i className="fas fa-chevron-left fa-01x info-icon"></i>
            </div>
          </div>
          
          {selectedImage && (
            <div className="card-content">
              <div className="card-left">
                <img className="card-image" src={selectedImage.imageUrl} alt={selectedImage.name} />
                <p className="card-size">Size: {selectedImage.size}</p>
              </div>
              
              <div className='card-right'>
                <h2>{selectedImage.name}</h2>
                <p className="card-description">{selectedImage.description}</p>
                <p>Medium: {selectedImage.medium}</p>
              </div>
            </div>
          )}
      </Modal>
    </div>
  );
}

export default Portfolio;
