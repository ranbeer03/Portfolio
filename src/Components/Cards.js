import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/GalleryPage.css'; 
import '../App.css';
import './Card.css';

const Card = ({ id, name, description, imageUrl, size, medium, sizeRange, subjectMatter, Model3D }) => {
  const navigate = useNavigate();
  const handleBuyClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="card-container">
      <div className="card-body">
        <div className="card-item card-title" style={{ transform: 'translateZ(50px)' }}>
          {name}
        </div>
        <div className="card-item card-image-container" style={{ transform: 'translateZ(100px)' }}>
          <img src={imageUrl} alt={name} className="card-image" />
        </div>
        <div className="card-item card-buttons" style={{ transform: 'translateZ(20px)' }}>
          <button className="card-item scroll-button" onClick={handleBuyClick}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
  