import './NewCollection2.css';
import '../App.css'
import Collection from '../Components/Collection.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const NewCollection2 = (() => {

const animalCollection = {
  name: "Animals",
  items: [130, 102]
}
const popArtCollection = {
  name: "Pop Art",
  items: [103, 104]
}
const skateboardCollection = {
  name: "Skateboards",
  items: [105, 106]
}

return (
    <section className=" vertical-container collection-section">
      <h1 className="page-header">New Collection</h1>
        <Collection name={animalCollection.name} items={animalCollection.items}/>
        <Collection name={popArtCollection.name} items={popArtCollection.items}/>
        <Collection name={skateboardCollection.name} items={skateboardCollection.items}/>
    </section>
);
});

export default NewCollection2;
