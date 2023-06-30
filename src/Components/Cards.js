import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

const Card = ({ name, description, imageUrl, size, medium, style, sizeRange, subjectMatter, Model3D }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-left">
          <img src={imageUrl} alt={name} className="card-image" />
          <p className="card-size">Size: {size}</p>
        </div>
        
        <div className='card-right'>
          <h2 className="card-name">{name}</h2>
          <p className="card-description">{description}</p>
          <p className="card-description">Medium: {medium}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
