import { useState, useEffect} from 'react';
import './NewCollection2.css';
import '../App.css'
import ProductItem from '../Components/ProductItem';
import { getProductById } from '../Services/ProductsService.ts';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const NewCollection2 = (() => {
const [newCollection, setNewCollection] = useState([]);
const displayPaintings = [101,102,103]

useEffect(() => {
  const fetchPaintings = async () => {
    try{
      const products = await Promise.all(
        displayPaintings.map((id) => getProductById(id))
      );
      setNewCollection(products);
      console.log("Paintings received: " + products[0].name)
    } catch (error) {
      console.error("Error fetching paintings: ", error);
    }
  }
  fetchPaintings();
},[])

return (
    <section className="new-collection">
      <h1 className="page-header">New Collection</h1>
      <div className="content">
          {newCollection.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
            />
          ))}
      </div>
    </section>
);
});

export default NewCollection2;
