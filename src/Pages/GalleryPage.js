import React from 'react';
import Card from '../Components/Cards';
import Joker from '../Components/Joker';
import BeautyInBloom from '../Components/BeautyInBloom';
import './GalleryPage.css'; // We will create this file for styling.

const GalleryPage = () => {
  return (
    <div className="Gallery">
      <h2>Gallery</h2>
      <p>Here is some information about me and my artwork...</p>
      <div className="button-container">
        <a href="#acrylic-canvas" className="scroll-button">Acrylic Canvas</a>
        <a href="#portraits" className="scroll-button">Portraits</a>
        <a href="#mini-canvases" className="scroll-button">Mini Canvases</a>
        <a href="#water-colors" className="scroll-button">Water Colors</a>
        <a href="#poster-colors" className="scroll-button">Poster Colors</a>
        <a href="#3d-models" className="scroll-button">3D Models</a>
      </div>

      <h3 id="acrylic-canvas">Acrylic Canvas</h3>
    <Card
      name="BEAUTY IN BLOOM"
      description="This piece of art exists within its true bohemian element by integrating an eclectic fusion of textures, patterns and colours. The painting parallels the beauty of an elegant woman with that of a flower. The eccentric outline of the facial structure and the wide array of colours add an unconventional layer to this graceful portrait."
      imageUrl="./Images/BeautyInBloom.jpg"
      size="19 X 16 inches"
      material="acrylic on canvas"
      Model3D={BeautyInBloom}
    />

    <Card
      name="EVERY SISTERHOOD HAS RULES"
      description="This piece of modern art showcases the subtle strength of feminine companionship. A single white outline runs throughout the positive space to form three separate female structures, exhibiting an underlying connection amongst the females. It embodies three clear and stimulating colours to highlight the strength in femininity."
      imageUrl="./Images/3Women.jpg"
      size="5.3 x 8.3 inches"
      material="acrylic on canvas"
      Model3D={Joker}
    />
    <h3 id="portraits">Portraits</h3>
     <Card
      name="A HAPPY FACE"
      description="This artwork seeks to capture the essence of a troubled character by utilising various colour schemes in a low poly portrait. It incorporates a set of provocative colours to set a sharp and stimulating mood. The portrait is set against a black backdrop and aims to reflect the multifaceted character of the joker"
      imageUrl="./Images/Joker.png"
      size="5.3 x 8.3 inches"
      material="poster colors on paper"
      Model3D={Joker}
    />
    <h3 id="mini-canvases">Mini Canvases</h3>
    <Card
      name="THE BEETLE"
      description="This particular piece seeks to capture the sprightly spirit of an all-time favourite vehicle. It embodies a detailed reflection of the Beetle and utilises a wide array of vibrant colours. A geometrical/ structured outline of the car is positioned upon a free-flowing backdrop to highlight each component of the subject matter."
      imageUrl="./Images/Beetle.jpg"
      size="16 x 16 inches"
      material="acrylic on canvas"
      Model3D={Joker}
    />

    <h3 id="water-colors">Water Colors</h3>
    <Card
      name="THE HUNGRY SIMPSON"
      description="By utilising an array of vibrant colours, the Hungry Simpson is a joyful portrait of a beloved fictional character. This contemporary piece effectively utilises its positive space to create an energetic and lively aesthetic. This detailed three dimensional artwork reflects a natural sense of depth and space. "
      imageUrl="./Images/Simpson.jpg"
      size="12 x 10 inches"
      material="acrylic on canvas"
      Model3D={Joker}
    />

    <h3 id="poster-colors">Poster Colors</h3>
    <Card
      name="THE HUNGRY SIMPSON"
      description="By utilising an array of vibrant colours, the Hungry Simpson is a joyful portrait of a beloved fictional character. This contemporary piece effectively utilises its positive space to create an energetic and lively aesthetic. This detailed three dimensional artwork reflects a natural sense of depth and space. "
      imageUrl="./Images/Simpson.jpg"
      size="12 x 10 inches"
      material="acrylic on canvas"
      Model3D={Joker}
    />

    <h3 id="3d-models">3D Models</h3>
    <Card
      name="THE HUNGRY SIMPSON"
      description="By utilising an array of vibrant colours, the Hungry Simpson is a joyful portrait of a beloved fictional character. This contemporary piece effectively utilises its positive space to create an energetic and lively aesthetic. This detailed three dimensional artwork reflects a natural sense of depth and space. "
      imageUrl="./Images/Simpson.jpg"
      size="12 x 10 inches"
      material="acrylic on canvas"
      Model3D={Joker}
    />
    </div>
  );
}

export default GalleryPage;
