import React, {useState} from 'react';
import './GalleryPage.css'; 
import '../App.css'
import ShopCards from "../Components/ShopCards";

const GalleryPage = () => {

  const [activeButton, setActiveButton] = useState("medium");

  return (
  <div className="gallery">

    <h1 className="page-header">Shop</h1>
    <div className="button-container">
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

