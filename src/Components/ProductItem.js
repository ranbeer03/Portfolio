import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import './ProductItem.css'

const ProductItem = ({id,name}) => {

const{currency} = useContext(ShopContext);

  return (
    <Link className='item-card' to={`/product/${id}`}>
      <img src='../100vh' className="product-item-image"/>
      <div className='horizontal-container'>
      <h3>{name}</h3>
      <button className="secondary-button">View</button>
      </div>
    </Link>
  )
}

export default ProductItem
