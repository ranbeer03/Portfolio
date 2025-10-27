import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Scene2";

import "./HomePageNew.css";
import HeroSection2 from "../Sections/HeroSection2";
import NewCollection2 from "../Sections/NewCollection2";
import NewCollection from "../Sections/NewCollection";
import Contact from "../Sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const HomePageNew = () => {
  return (
    <div className="page">
        {/* <Canvas style={{ position:'fixed', inset:0, width:'100vw', height:'100vh', display:'block', zIndex:0 }}>
            <Scene />
        </Canvas> */}

        <div className="content">
            <HeroSection2 />
            <NewCollection2 />
            <Contact />
        </div>
    </div>

  );
};

export default HomePageNew;
