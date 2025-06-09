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
    const {artwork_images} = useContext(ShopContext)
    console.log("images recieved = " + artwork_images)
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [SubCategory, setSubCategory] = useState([]);

    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if(SubCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let artworksCopy = artworks.slice();

        if(category.length > 0){
            artworksCopy = artworksCopy.filter(item => category.includes(item.category))
        }

        if(SubCategory.length > 0){
            artworksCopy = artworksCopy.filter(item => SubCategory.includes(item.SubCategory))
        }

        setFilterProducts(artworksCopy)
    }

    useEffect(()=>{
        setFilterProducts(artworks)
    },[])

    useEffect(() => {
        applyFilter();
    },[category, SubCategory])

    // Tester
    useEffect(() => {
        console.log("Selected categories = " + SubCategory)
    },[SubCategory])

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
            {/* Prknts Filter */}
            <div className='filter'>
                <p className=''>Prints</p>
                <div className=''>
                    <p className=''><input type='checkbox' value={'A2'} onChange={toggleSubCategory}/>A2</p>
                    <p className=''><input type='checkbox' value={'A3'} onChange={toggleSubCategory}/>A3</p>
                    <p className=''><input type='checkbox' value={'A4'} onChange={toggleSubCategory}/>A4</p>
                    <p className=''><input type='checkbox' value={'A5'} onChange={toggleSubCategory}/>A5</p>
                </div>
            </div>
            {/* Custom Items Filter */}
            <div className='filter'>
                <p className=''>Custom Items</p>
                <div className=''>
                    <p className=''><input type='checkbox' value={'Shoes'} onChange={toggleSubCategory}/>Shoes</p>
                    <p className=''><input type='checkbox' value={'HandBag'} onChange={toggleSubCategory}/>Handbags</p>
                    <p className=''><input type='checkbox' value={'Skateboard'} onChange={toggleSubCategory}/>Skateboards</p>
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
                        // <ProductItem key={index} id={item.id} name={item.name} />
                    ))
                }
            </div>
        </div>
    </div>
    );
}

export default ShopPage2;