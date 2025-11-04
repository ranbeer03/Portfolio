import { Link } from 'react-router-dom';
import './ProductItem.css'

const ProductItem = ({id,name,image}) => {

  return (
    <Link className='item-card' to={`/product/${id}`}>
      <img src={image} className="product-item-image"/>
      <div className='horizontal-container item-footer'>
      <h4>{name}</h4>
      <button className="secondary-button">View</button>
      </div>
    </Link>
  )
}

export default ProductItem
