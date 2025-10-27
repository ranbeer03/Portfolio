import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Services/SupaBaseClient';
import './ProductPage.css';
import ReactImageGallery from 'react-image-gallery';
import image from '../Data/everysisterhood.png';
import image2 from '../Data/Dali.jpg'

import rulerpen from  '../Icons/ruler&pen.png';
import calendar from '../Icons/calendar-schedule.png';
import paintBrush from '../Icons/paint-brush.png';
import gallery from '../Icons/gallery.png';
import { ShopContext } from '../context/ShopContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const{artwork_images} = useContext(ShopContext)
  const [filtered_artwork_images, setFilteredArtworkImages] = useState([]);



  const [productType, setProductType] = useState('original');
  const [frameOption, setFrameOption] = useState('framed');
  const [printSize, setPrintSize] = useState('A5');

  const [quantity, setQuantity] = useState(1);

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
      const { data: priceData } = await supabase
        .from('artwork_prices')
        .select('*')
        .eq('artwork_id', parseInt(id))
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } else {
        setProduct(data);
      }

      if (priceData) {
        setPricing(priceData);
      }

      const urlsForThisProduct = artwork_images
        .filter(img => img.artwork_id === Number(id))
        .map(img => img.url);

      setFilteredArtworkImages(urlsForThisProduct);
      
      setLoading(false);
      
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!pricing) return;

    let calculatedPrice = 0;

    if (productType === 'original') {
      calculatedPrice = frameOption === 'framed'
        ? pricing.original_framed
        : pricing.original;
    } else if (productType === 'print') {
      const key = `${printSize}_print_${frameOption}`;
      calculatedPrice = pricing[key];
    }

    setPrice(calculatedPrice);
  }, [productType, frameOption, printSize, pricing]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/gallery');
    }
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));
  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');

  const handleFirstChange = (e) => {
    setFirstSelect(e.target.value);
    setSecondSelect(''); // reset second dropdown when first changes
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

  const productProperties = [
    { name: 'Dimensions', icon: rulerpen, value: product.size_inches },
    { name: 'Made on', icon: calendar, value: '12 January 2019' },
    { name: 'Medium', icon: paintBrush, value: product.medium },
    { name: 'Genre', icon: gallery, value: product.type },
    // { name: 'Collection', icon: layers, value: product.subject_matter }
  ];
  

  const PropertiesSection = ({ properties }) => {
    return (
      <div className='properties'>
        {properties.map((prop, index) => (
          <div key={index} className="property">
            <div className='property-name'>
              <img src={prop.icon} alt={`${prop.name} icon`} className="icon"/>
              <p>{prop.name}</p>
            </div>
            <p>{prop.value}</p>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    
    <div className="product-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back</button>
      </div>

      <div className="content">
          <ReactImageGallery
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={filtered_artwork_images}
          />
        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <PropertiesSection properties={productProperties} />

          <div className='horizontal-container properties'>
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
            {productType === 'print' && (
              <div className="selector-section">
                <label>Print Size:</label>
                <div className="button-group">
                  {['A5', 'A4', 'A3'].map(size => (
                    <button
                      key={size}
                      className={printSize === size ? 'selected' : ''}
                      onClick={() => setPrintSize(size)}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className='horizontal-container properties'>
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
          <div className="price-label">
            <label>Price:</label>
          <p>€{price} </p>     
          </div>    
          </div>

          <div className='horizontal-container purchase-buttons'>
            <div className="quantity-selector">
              <button onClick={decreaseQuantity}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="add-to-basket-button">Add to Basket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
