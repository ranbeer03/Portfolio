import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import './ProductItem.css'

const ProductItem = ({id,name}) => {

const{currency} = useContext(ShopContext);

  return (
    <Link className='label' to={`/product/${id}`}>
      <h3>{name}</h3>
      <button className="secondary-button">View</button>
    </Link>
  )
}

export default ProductItem
