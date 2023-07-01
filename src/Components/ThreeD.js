import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LoadingBar from './LoadingBar';
import { Html } from '@react-three/drei';
import { cards } from '../Pages/GalleryPage';
import './ThreeD.css'

const ThreeD = () => {
    const [selectedCard, setSelectedCard] = useState(cards.find(card => card.name === 'BEAUTY IN BLOOM'));

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="main-container">
      <div className="header">
        <span className="background-title">Artwork</span>
        <span className="overlay-title">3-D</span>
      </div>

      
      <div className="cards-container">
      <div className="card-content">
            <div className="card-left">
            <div className="canvas-container">
                <div className="canvas-wrapper">
                <Canvas shadows className="canvas" camera={{ position: [-220, 90, -292] }}>
                    <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05} />
                    <ambientLight intensity={0.5} />
                    <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
                    <directionalLight position={[2, 5, -2]} intensity={1} />
                    <Suspense fallback={<Html center><LoadingBar /></Html>}>
                    {selectedCard?.Model3D && <selectedCard.Model3D />}
                    </Suspense>
                </Canvas>
                <div className="circle"></div>
                </div>
            </div>
            </div>
            
            <div className='card-right'>
            <h2>{selectedCard.name}</h2>
            <p className="card-description">{selectedCard.description}</p>
            <p>Medium: {selectedCard.medium}</p>
            <p className="card-size">Size: {selectedCard.size}</p>
            </div>
        </div>
        
      </div>
      <div className="scrollable-cards">
        {cards.map((card) => (
            <button
            key={card.id}
            className={`card-button ${selectedCard?.id === card.id ? 'active' : ''}`}
            onClick={() => handleCardClick(card)}
            style={{ display: 'flex', flexDirection: 'column' }}
            >
            <div style={{ flexBasis: '70%', overflow: 'hidden' }}>
                <img src={card.imageUrl} alt={card.name} style={{ width: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flexBasis: '30%', overflow: 'auto' }}>
                {card.name}
            </div>
            </button>
        ))}
        </div>


    </div>
  );
}

export default ThreeD;
