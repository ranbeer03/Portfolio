import './NewCollection2.css';
import '../App.css'
import Collection from '../Components/Collection.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const NewCollection2 = (({ sectionRef }) => {

const animalCollection = {
  name: "Animals",
  year: "2023",
  items: [130, 137]
}
const popArtCollection = {
  name: "Pop Art",
  year: "2024",
  items: [116, 117]
}
const skateboardCollection = {
  name: "Abstract Art",
  year: "2024",
  items: [102, 139]
}

return (
    <section ref={sectionRef} className=" vertical-container collection-section section">
      <h1 className="page-header">New Collections</h1>
        <Collection name={animalCollection.name} year={animalCollection.year} items={animalCollection.items}/>
        <Collection name={popArtCollection.name} year={popArtCollection.year} items={popArtCollection.items}/>
        <Collection name={skateboardCollection.name} year={skateboardCollection.year} items={skateboardCollection.items}/>
    </section>
);
});

export default NewCollection2;
