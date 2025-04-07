import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/GalleryPage.css'; 
import '../App.css';
import './Card.css';

const Card = ({ id, name, description, imageUrl, size, medium, sizeRange, subjectMatter, Model3D }) => {
  const navigate = useNavigate();
  const cardContainerRef = useRef(null);
  const cardBodyRef = useRef(null);
  // Use a ref to store the requestAnimationFrame id so we don’t schedule multiple updates.
  const animationFrameRef = useRef(null);

  const handleBuyClick = () => {
    navigate(`/product/${id}`);
  };

  const handleMouseMove = (e) => {
    if (animationFrameRef.current) return;
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!cardContainerRef.current || !cardBodyRef.current) return;

      const rect = cardContainerRef.current.getBoundingClientRect();
      // Calculate rotation values; adjust the divisor (here 25) to control sensitivity.
      const rotateY = (e.clientX - rect.left - rect.width / 2) / 25;
      const rotateX = -(e.clientY - rect.top - rect.height / 2) / 25;
      cardBodyRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      animationFrameRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (cardBodyRef.current) {
      cardBodyRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <div 
      className="card-container"
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-body" ref={cardBodyRef}>
        <div className="card-item card-title" style={{ transform: 'translateZ(50px)' }}>
          {name}
        </div>
        <div className="card-item card-image-container" style={{ transform: 'translateZ(100px)' }}>
          <img src={imageUrl} alt={name} className="card-image" />
        </div>
        <div className="card-item card-buttons" style={{ transform: 'translateZ(20px)' }}>
          <button className="card-item scroll-button" onClick={handleBuyClick}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
