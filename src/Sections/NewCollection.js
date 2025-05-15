import React, { forwardRef, useState, useEffect } from 'react';
import useTypewriter from 'react-typewriter-hook';
import './NewCollection.css';
import '../App.css'

const NewCollection = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="new-collection">
            <h1 className ="collection-header">
              New Collection
            </h1>
              <div className="art-info-container">
                  <div className='art-info'>
                      <h3>Tiger the Greatest</h3>
                      <button className={`scroll-button`} id="medium">View</button>
                  </div>
                  <div className='art-info'>
                      <h3>Tiger the Greatest</h3>
                      <button className={`scroll-button`} id="medium">View</button>
                  </div>
                  <div className='art-info'>
                      <h3>Tiger the Greatest</h3>
                      <button className={`scroll-button`} id="medium">View</button>
                  </div>
                  <div className='art-info'>
                      <h3>Tiger the Greatest</h3>
                      <button className={`scroll-button`} id="medium">View</button>
                  </div>
              </div>
        </section>
        );
});

export default NewCollection;
