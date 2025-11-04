import {useContext, useEffect, useState} from 'react';

import { ShopContext } from '../Context/ShopContext';
import Card from '../Components/Cards';
import ShopFilterBar from '../Components/ShopFilterBar';

import './ShopPage.css'; import '../App.css'
import './ShopPage2.css'

const ShopPage2 = () => {
  const {artworks} = useContext(ShopContext)
  const {artwork_images} = useContext(ShopContext)

  const [filterProducts, setFilterProducts] = useState([]);
  const [format, setFormat] = useState([]);

  const toggleFormat = (e) => {
    if(format.includes(e.target.value)){
      setFormat(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setFormat(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
        let artworksCopy = artworks.slice();
        if (format.length > 0) {
          artworksCopy = artworksCopy.filter(item => format.includes(item.collection));
        }

    setFilterProducts(artworksCopy)
    }

    useEffect(()=> {
      setFilterProducts(artworks)
    },[ artwork_images]);

    useEffect(() => {
        applyFilter();
    },[format])

    // Tester
    useEffect(() => {
        console.log("Selected format = " + format)
    },[format])

    return (
    <div className="page shop-page">

        {/* Filter Options */}
        <div className='filter-container'>
            <h3 className='filter-title'>Filters</h3>

            {/* Custom Items Filter */}
            <div className='filter'>
              <div className=''>

              </div>
            </div>

            <ShopFilterBar
            selectedFormats={format}
            onFormatToggle={toggleFormat}
            />

        </div>

      {/* Right Side */}
      <div className='products-section vertical-container'>
            <div className='shop-header horizontal-container'>
                <h1>All Collections</h1>
                {/* Product Sort */}
                <div></div>
                <select className='sort-button' >
                    <option value='relevant'>Sort by : Relevant</option>
                    <option value='low-high'>Sort by : Low to High</option>
                    <option value='high-low'>Sort by : High to Low</option>
                </select>
            </div>

             {/* Map Products */}
            <div className="product-cards">
            {filterProducts.map((item) => {
                // find the first image matching both artwork_id and alt_text
                const img = artwork_images.find(
                img =>
                    img.alt_text === "original" && img.artwork_id === item.id
                );

                return (
                <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    // TODO: Add fallback image
                    imageUrl={img ? img.url : "/fallback.jpg"}
                />
                );
            })}
            </div>
        </div>
    </div>
    );
}

export default ShopPage2;