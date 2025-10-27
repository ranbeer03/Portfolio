import {forwardRef, useState, useEffect, useContext, useRef} from 'react';
// import './NewCollection.css';
import '../App.css'
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../Components/ProductItem';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const NewCollection = forwardRef(({ screenPos }, ref) => {
const headingRef = useRef(null);

const {artworks} = useContext(ShopContext);
const [newCollection, setNewCollection] = useState([]);
const style = screenPos
  ? {
      position: 'absolute',
      left: screenPos.x - 65,
      top: screenPos.y + 140,
      width: screenPos.width,
      height: (screenPos.height + 100),
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      pointerEvents: 'auto',
    }
  : { display: 'none' };
  const style2 = screenPos
  ? {
      top: 50,
      width: screenPos.width,
      height: 50 + screenPos.height
    }
  : { display: 'none' };

  useEffect(() => {
    if (!ref?.current || !headingRef?.current) return;

    const ctx = gsap.context(() => {
      // 1. Pin the entire component at 100px from top
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top+=100',
        end: 'bottom top+=100',
        pin: true,
        pinSpacing: true,
        scrub: true,
        markers: true,
      });

      // 2. Pin the heading earlier at 200px from top, unstick with section
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top top+=300',
        endTrigger: ref.current,
        end: 'bottom+=100 top+=100',
        pin: true,
        pinSpacing: true,
        scrub: true,
        markers: true,
      });
    });

    return () => ctx.revert();
  }, []);



useEffect(() => {
  if (artworks.length > 0) {
    const filtered = artworks.filter(
      art => art.id === 101 || art.id === 102
    );
    setNewCollection(filtered);
  }
}, [artworks]);


return (
    <section ref={ref} className="new-collection">
      <div className="heading-wrapper" ref={headingRef}>
        <h1 className="new-collection-heading">New Collection</h1>
      </div>
      <div className="art-info-container">
        <div className="art-info-1" style={style}>
          <div className='painting-component' style={style2}></div>
          {newCollection[0] && (
              <ProductItem
                  key={newCollection[0].id}
                  id={newCollection[0].id}
                  name={newCollection[0].name}
              />
          )}
        </div>
        {/*TODO: Add second element following the location of the painting in the 3d model*/}
        {/*<div>*/}
        {/*  {newCollection[1] && (        */}
        {/*    <ProductItem */}
        {/*      key={newCollection[1].id} */}
        {/*      id={newCollection[1].id} */}
        {/*      name={newCollection[1].name} */}
        {/*    />*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </section>
);
});

export default NewCollection;
