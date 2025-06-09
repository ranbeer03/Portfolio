import { forwardRef, useState, useEffect, useContext } from 'react';
import './NewCollection.css';
import '../App.css'
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../Components/ProductItem';

const NewCollection = forwardRef(({ screenPos }, ref) => {

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
        <h1>New Collection</h1>
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
