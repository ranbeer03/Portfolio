import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import '../Pages/GalleryPage.css'; 
import '../App.css'
import './Card.css';

const ModelWrapper = ({ model: Model3D }) => {
  const modelRef = useRef();

  useFrame(({ camera, clock }) => {
    if (modelRef.current) {
      camera.lookAt(modelRef.current.position);
    }
  });

  return <Model3D ref={modelRef} />;
}

const Card = ({ id, name, description, imageUrl, size, medium, sizeRange, subjectMatter, Model3D }) => {
  
  const navigate = useNavigate();
  const handleBuyClick = () => {
    navigate(`/product/${id}`);
  };
  return (
      <div className="card2">
          <img src={imageUrl} alt={name} className="card-image" />
          <p className="card-size">{name}</p>

        {/*<div className='card-right'>*/}
        {/*  <h2 className="card-name">{name}</h2>*/}
        {/*  <p className="card-description">{description}</p>*/}
        {/*  <p className="card-description">Medium: {medium}</p>*/}
        {/*</div>*/}
        <button className='scroll-button' onClick={handleBuyClick}>Buy</button>
      </div>
  );
};

export default Card;
