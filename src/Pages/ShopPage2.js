import {useContext, useEffect, useState} from 'react';
import './ShopPage.css'; 
import ShopCards from "../Components/ShopCards";
import '../App.css'
import './ShopPage2.css'
import { ShopContext } from '../context/ShopContext';
import Card from '../Components/Cards';
import ProductItem from '../Components/ProductItem';

const ShopPage2 = () => {
  const {artworks} = useContext(ShopContext)
  const {prices_and_stock} = useContext(ShopContext)
  const {artwork_images} = useContext(ShopContext)

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [format, setFormat] = useState([]);

  const toggleCategory = (e) => {
      if(category.includes(e.target.value)){
          setCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
          setCategory(prev => [...prev, e.target.value])
      }
  }

  const toggleSubCategory = (e) => {
      if(subCategory.includes(e.target.value)){
          setSubCategory(prev => prev.filter(item => item !== e.target.value))
      }
      else{
          setSubCategory(prev => [...prev, e.target.value])
      }
  }

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

        if(category.length > 0){
            artworksCopy = artworksCopy.filter(item => category.includes(item.format))
        }

        if(subCategory.length > 0){
            artworksCopy = artworksCopy.filter(item => prices_and_stock.includes(item))
            artworksCopy = artworksCopy.filter(item => subCategory.includes(item.style))
        }

        if (format.length > 0) {
          artworksCopy = artworksCopy.filter(item => format.includes(item.format));
        }

    setFilterProducts(artworksCopy)
    }

    useEffect(()=> {
      setFilterProducts(artworks)
    // },[artworks]);
    },[ artwork_images]);

    useEffect(() => {
        applyFilter();
    },[category, subCategory, format])

    // Tester
    useEffect(() => {
        console.log("Selected format = " + format)
    },[format])

    return (
    <div className="page shop-page">

        {/* Filter Options */}
        <div className='filter-container'>
            <p className=''>Filters</p>
            {/* Paintings Filter */}
            <div className='filter'>
                <p className=''>Paintings</p>
                <div className=''>
                    <p className=''><input type='checkbox' value={'Men'} onChange={toggleCategory}/>Collections</p>
                    <p className=''><input type='checkbox' value={'Women'} onChange={toggleCategory}/>Sizes</p>
                    <p className=''><input type='checkbox' value={'Kids'} onChange={toggleCategory}/>Subject Matter</p>
                </div>
            </div>
            {/* Prints Filter */}
            <div className='filter'>
                <p className=''>Prints</p>
                <div className=''>
                    <p className=''><input type='checkbox' value={'a2'} onChange={toggleSubCategory}/>A2</p>
                    <p className=''><input type='checkbox' value={'a3'} onChange={toggleSubCategory}/>A3</p>
                    <p className=''><input type='checkbox' value={'a4'} onChange={toggleSubCategory}/>A4</p>
                    <p className=''><input type='checkbox' value={'a5'} onChange={toggleSubCategory}/>A5</p>
                </div>
            </div>
            {/* Custom Items Filter */}
            <div className='filter'>
                <p className=''>Custom Items</p>
              <div className=''>
                <p className=''><input type='checkbox' value={'painting'} onChange={toggleFormat}/>Paintings</p>
                <p className=''><input type='checkbox' value={'sneaker'} onChange={toggleFormat}/>Sneakers</p>
                <p className=''><input type='checkbox' value={'handbag'} onChange={toggleFormat}/>Handbags</p>
                <p className=''><input type='checkbox' value={'skateboard'} onChange={toggleFormat}/>Skateboards
                </p>
              </div>
            </div>
        </div>

      {/* Right Side */}
      <div className='products-section vertical-container'>
            <div className='shop-header horizontal-container'>
                <h1>All Collections</h1>
                {/* Product Sort */}
                <select className='' >
                    <option value='relevant'>Sort by : Relevant</option>
                    <option value='low-high'>Sort by : Low to High</option>
                    <option value='high-low'>Sort by : High to Low</option>
                </select>
            </div>

             {/* Map Products */}
            <div className='product-cards'>
                {
                    filterProducts.map((item,index)=>(
                        <Card id={item.id} name={item.name} imageUrl={artwork_images[0].url}/>
                    ))
                }
            </div>
        </div>
    </div>
    );
}

export default ShopPage2;