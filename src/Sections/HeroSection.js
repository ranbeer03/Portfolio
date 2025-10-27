import React, { Suspense, useState, useEffect, forwardRef } from 'react';
import useTypewriter from 'react-typewriter-hook';
import './HeroSection.css';
import { supabase } from '../Services/SupaBaseClient';
import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import { time } from 'motion';

const Hero = forwardRef((props, ref) => {

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
  })
  const timelineRef = React.useRef();

  useGSAP(() => {
  const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });

    tl.to('#yellow-box',{
      x: 250,
      rotation: 360,
      borderRadius: '100%',
      duration: 2,
      ease: 'back.inOut'
    })

    tl.to('#yellow-box',{
      y:'250px',
      rotation: 0
    })

    timelineRef.current = tl;
  },[])

  // useGSAP(() => {
  //   gsap.fromTo('#blue-box',
  //     {
  //       x: '0px',
  //       rotation: '0',
  //       borderRadius: '0px'
  //     },
  //     {
  //       x:'250px',
  //       repeat: '-1',
  //       yoyo: 'yoyo',
  //       borderRadius: '50px',
  //       rotation: '360',
  //       duration: '2',
  //       ease: 'power1.inOut'
  //   })
  // })


  return (
      <div ref={ref} className="container">
        <div className="hero-content">
          <h1 className ="hero-header">
            Ranbeer Chaudhary
          </h1>
          <h2>Artist / Painter / Creative</h2>
          <button onClick={() => { 
            const tl = timelineRef.current;
            if (!tl) return;

            if (tl.paused()) {
              tl.play();
            } else {
              tl.pause();
            }
          }}>
            Play / Pause
          </button>
          <div id='blue-box' className='blue-box'></div>
          <div id='yellow-box' className='yellow-box'></div>
          <p>
            Welcome to my portfolio, a place where traditional artistry fuses
            with the innovation of the digital world.
            I navigate the canvas of both classic and modern art, transcending
            the conventional boundaries of art.
          </p>
        </div>
      </div>
  );
});

export default Hero;
