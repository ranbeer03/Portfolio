import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artData } from '../Data/Data';
import './ProductPage.css';
import ReactImageGallery from 'react-image-gallery';


const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = artData.find((item) => item.id === parseInt(id));

  const [productType, setProductType] = useState('original');
  const [frameOption, setFrameOption] = useState('framed');
  const [printSize, setPrintSize] = useState('A5');

  const images = Array(5).fill({
    original: product.imageUrl,
    thumbnail: product.imageUrl
  });

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
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
        />
        </div>

        {/* Right Section: Details and Selectors */}
        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Medium:</strong> {product.medium}</p>
          <p><strong>Size Range:</strong> {product.sizeRange}</p>
          <p><strong>Subject Matter:</strong> {product.subjectMatter}</p>
          <div className="selector-section">
            <label>Type:</label>
            <div className="button-group">
              <button
                  className={productType === 'original' ? 'selected' : ''}
                  onClick={() => setProductType('original')}
                  type="button"
              >
                Original
              </button>
              <button
                  className={productType === 'print' ? 'selected' : ''}
                  onClick={() => setProductType('print')}
                  type="button"
              >
                Print
              </button>
            </div>
          </div>

          {productType === 'original' ? (
              <div className="selector-section">
                <label>Frame Option:</label>
                <div className="button-group">
                  <button
                      className={frameOption === 'framed' ? 'selected' : ''}
                      onClick={() => setFrameOption('framed')}
                      type="button"
                  >
                    Framed
                  </button>
                  <button
                      className={frameOption === 'notFramed' ? 'selected' : ''}
                      onClick={() => setFrameOption('notFramed')}
                      type="button"
                  >
                    Not Framed
                  </button>
                </div>
              </div>
          ) : (
              <div className="selector-section">
                <label>Print Size:</label>
                <div className="button-group">
                  <button
                      className={printSize === 'A5' ? 'selected' : ''}
                      onClick={() => setPrintSize('A5')}
                      type="button"
                  >
                    A5
                  </button>
                  <button
                      className={printSize === 'A4' ? 'selected' : ''}
                      onClick={() => setPrintSize('A4')}
                      type="button"
                  >
                    A4
                  </button>
                  <button
                      className={printSize === 'A3' ? 'selected' : ''}
                      onClick={() => setPrintSize('A3')}
                      type="button"
                  >
                    A3
                  </button>
                </div>
              </div>
          )}


            <button className="scroll-button">Buy Now</button>
            <button className="scroll-button">Add to Basket</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
