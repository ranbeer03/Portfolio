import { useState, useEffect} from 'react';
import ProductItem from './ProductItem.js';
import { getArtworkImages, getProductInfoById } from '../Services/ProductsService.ts';
import './Collection.css'

const Collection = ({name,items}) => {

const [newCollection, setNewCollection] = useState([]);


useEffect(() => {
  const fetchPaintings = async () => {
    try {
      const products = await Promise.all(
        items.map(async (id) => {
          const product = await getProductInfoById(id);
          const thumbnail = await getArtworkImages(id, 'original'); 
          console.log("Thumbnail for product ", id, ": ", thumbnail[0].url);
          return { ...product, thumbnail };
        })
      );
      setNewCollection(products);
    } catch (error) {
      console.error("Error fetching paintings: ", error);
    }
  };
  fetchPaintings();
}, [items]);


  return (
    <div className='collection-container vertical-container'>
        <h2 className='secondary-header'>{name}</h2>
        <div className='collection-items horizontal-container'>
            {newCollection.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.thumbnail[0].url}
                />
            ))}
        </div>
    </div>
  )
}

export default Collection
