import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Data/SupaBaseClient';
import './ProductPage.css';
import ReactImageGallery from 'react-image-gallery';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productType, setProductType] = useState('original');
  const [frameOption, setFrameOption] = useState('framed');
  const [printSize, setPrintSize] = useState('A5');

  const [product, setProduct] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [price, setPrice] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      const { data: priceData, error: priceError }  = await supabase
        .from('artwork_prices')
        .select('*')
        .eq('artwork_id', parseInt(id))
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } else {
        console.log('Fetched product:', data,priceData);
        setProduct(data);
      }
      if (priceData) {
        setPricing(priceData);
        setPrice(priceData.original); 
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/gallery');
    }
  };

  if (loading) {
    return <div className="product-page">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-page">
        <p>Product not found.</p>
        <button onClick={handleBack}>Go back to Gallery</button>
      </div>
    );
  }

  const images = Array(5).fill({
    original: product.image_url,
    thumbnail: product.image_url,
  });

  return (
    <div className="product-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back</button>
      </div>
      <div className="product-content">
        <div className="product-image-section">
          <ReactImageGallery
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={images}
          />
        </div>

        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p><strong>Size Inches:</strong> {product.size_inches}</p>
          <p><strong>Size cm:</strong> {product.size_cm}</p>
          <p><strong>Medium:</strong> {product.medium}</p>
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Subject Matter:</strong> {product.subject_matter}</p>
          {/* You can add product type/print/frame logic next */}
        </div>
      </div>
      <div className="product-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back</button>
      </div>

          <div className="selector-section">
            <label>Type:</label>
            <div className="button-group">
              <button
                  className={productType === 'original' ? 'selected' : ''}
                  onClick={() => {
                    setProductType('original');
                    setPrice(pricing.original_framed)
                  }}
                  type="button"
              >
                Original
              </button>
              <button
                  className={productType === 'print' ? 'selected' : ''}
                  onClick={() => {
                    setProductType('print');
                    setPrice(pricing.A5_print);
                  }}
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
                      onClick={() => {
                        setFrameOption('framed');
                        setPrice(pricing.original_framed);
                      }}
                      type="button"
                  >
                    Framed
                  </button>
                  <button
                      className={frameOption === 'notFramed' ? 'selected' : ''}
                      onClick={() => {
                        setFrameOption('notFramed');
                        setPrice(pricing.original);
                      }}
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
                      onClick={() => {
                        setPrintSize('A5');
                        setPrice(pricing.A5_print);}}
                      type="button"
                  >
                    A5
                  </button>
                  <button
                      className={printSize === 'A4' ? 'selected' : ''}
                      onClick={() => {
                        setPrintSize('A4');
                        setPrice(pricing.A4_print);}}
                      type="button"
                  >
                    A4
                  </button>
                  <button
                      className={printSize === 'A3' ? 'selected' : ''}
                      onClick={() => {
                        setPrintSize('A3');
                        setPrice(pricing.A3_print);}}
                      type="button"
                  >
                    A3
                  </button>
                </div>
              </div>
          )}

    <p><strong>Price:</strong> {price}</p>
            <button className="scroll-button">Buy Now</button>
            <button className="scroll-button">Add to Basket</button>
        </div>
    </div>
  );
};

export default ProductPage;
