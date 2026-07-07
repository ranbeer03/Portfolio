import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, imageUrl, priceLabel }) => {
  const navigate = useNavigate();

  return (
    <div className="card-container" onClick={() => navigate(`/product/${id}`)}>
      <div className="card-image-container">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="card-image"
        />
      </div>
      <div className="card-footer">
        <div className="card-meta">
          <p className="card-name">{name}</p>
          {priceLabel && <p className="card-price">{priceLabel}</p>}
        </div>
        <span className="btn btn-outline btn-sm">View</span>
      </div>
    </div>
  );
};

export default ProductCard;
