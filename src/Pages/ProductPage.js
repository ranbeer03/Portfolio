import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artData } from '../Components/Data';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = artData.find((item) => item.id === parseInt(id));

  const [productType, setProductType] = useState('original');
  const [frameOption, setFrameOption] = useState('framed');
  const [printSize, setPrintSize] = useState('A5');

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/gallery');
    }
  };

  if (!product) {
    return (
      <div className="product-page">
        <p>Product not found.</p>
        <button onClick={handleBack}>Go back to Gallery</button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back</button>
      </div>
      <div className="product-content">
        {/* Left Section: Title and Image */}
        <div className="product-image-section">
          <h1 className="product-title">{product.name}</h1>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>

        {/* Right Section: Details and Selectors */}
        <div className="product-details-section">
          <p className="product-description">{product.description}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Medium:</strong> {product.medium}</p>
          <p><strong>Size Range:</strong> {product.sizeRange}</p>
          <p><strong>Subject Matter:</strong> {product.subjectMatter}</p>
          
          <div className="selector-section">
            <label htmlFor="type-selector">Type:</label>
            <select 
              id="type-selector"
              value={productType} 
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="original">Original</option>
              <option value="print">Print</option>
            </select>
          </div>

          {productType === 'original' ? (
            <div className="selector-section">
              <label htmlFor="frame-selector">Frame Option:</label>
              <select 
                id="frame-selector"
                value={frameOption} 
                onChange={(e) => setFrameOption(e.target.value)}
              >
                <option value="framed">Framed</option>
                <option value="notFramed">Not Framed</option>
              </select>
            </div>
          ) : (
            <div className="selector-section">
              <label htmlFor="size-selector">Print Size:</label>
              <select 
                id="size-selector"
                value={printSize} 
                onChange={(e) => setPrintSize(e.target.value)}
              >
                <option value="A5">A5</option>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
              </select>
            </div>
          )}

          <div className="button-group">
            <button className="buy-now-button">Buy Now</button>
            <button className="add-to-basket-button">Add to Basket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
