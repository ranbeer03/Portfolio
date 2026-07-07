import { Link } from 'react-router-dom';
import './ProductItem.css';

const ProductItem = ({ id, name, image }) => {
  return (
    <Link className="item-card" to={`/product/${id}`}>
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="product-item-image"
      />
      <div className="item-footer">
        <h4 className="item-name">{name}</h4>
        <span className="btn btn-outline btn-sm">View</span>
      </div>
    </Link>
  );
};

export default ProductItem;
