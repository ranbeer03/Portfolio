import { forwardRef, useState, useEffect, useContext } from 'react';
import './Collection.css';
import '../App.css'
import ProductItem from '../Components/ProductItem';

const Collection = forwardRef(({ screenPos }, ref) => {

const collectionName = "monopoly"
const {artworks} = useContext(ShopContext);
const [collection, setCollection] = useState([]);

useEffect(() => {
  if (artworks.length > 0) {
    const filtered = artworks.filter(
      art => art.collection === collectionName
    );
    setCollection(filtered);
  }
}, [artworks]);


return (
    <section ref={ref} className="collection">
        <h1>{collectionName} Collection</h1>
        <div className="collection-info-container">
            {collection.map((item, index) => (
                <div key={item.id}>
                <ProductItem
                    id={item.id}
                    name={item.name}
                />
                </div>
            ))}
        </div>
    </section>
    );
});

export default Collection;