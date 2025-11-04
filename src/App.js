import React, {use, useEffect, useRef, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePageNew from './Pages/HomePageNew';
import AboutPage from './Pages/AboutPage';
import ShopPage2 from './Pages/ShopPage2';
import ContactPage from './Pages/ContactPage';
import ScrollToTop from './Components/ScrollToTop';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage'
import LoginPage from './Pages/LoginPage'

import './App.css';
import './theme.css';
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef=useRef(null)
  const sceneRef=useRef(null)
  const [progress, setProgress]=useState(0)

  useEffect(()=>{
    gsap.timeline({
      scrollTrigger:{
        trigger:mainRef.current,
        start:"top top",
        end:"bottom bottom",
        scrub:1,
        onUpdate:(self)=>{
          setProgress(self.progress)
        }
      }
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
      x:'-25vw',
    })
  },[])

  return (
    <Router>
      <div className="App">
      <Navbar />
      <ScrollToTop />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePageNew />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage2 />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
    </Router>
  );
}

export default App;
