import {forwardRef, useState, useEffect, useContext, useRef} from 'react';
import './NewCollection.css';
import '../App.css'
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../Components/ProductItem';
import {ScrollTrigger} from "gsap/ScrollTrigger";

const NewCollection = forwardRef(({ screenPos }, ref) => {
const headingRef = useRef(null);

const {artworks} = useContext(ShopContext);
const [newCollection, setNewCollection] = useState([]);
const style = screenPos
  ? {
      position: 'absolute',
      left: screenPos.x - 65,
      top: screenPos.y,
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

  // Setup ScrollTrigger to pin NewCollection section
  useEffect(() => {
    const elements = [
      ref.current,
      headingRef.current,
    ];

    // Filter out any null or undefined refs
    const triggers = elements
    .filter(el => el != null)
    .map(el =>
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          markers: true,
        })
    );

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
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
        <h1 ref={headingRef}>New Collection</h1>
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
          <div>
            {newCollection[1] && (        
              <ProductItem 
                key={newCollection[1].id} 
                id={newCollection[1].id} 
                name={newCollection[1].name} 
              />
            )}
          </div>
        </div>
    </section>
    );
});

export default NewCollection;
