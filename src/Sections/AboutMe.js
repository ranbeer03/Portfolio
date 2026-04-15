import React, {useState, useEffect, useRef } from 'react';
import { getArtworkImages } from '../Services/ProductsService.ts';
import { useNavigate } from 'react-router-dom';
import ranbeerDp from '../Icons/ranbeer-dp.png';
import ranbeerBattersea from '../Icons/ranbeer-battersea.png';
import ranbeerIndianSpeach from '../Icons/ranbeer-indian-speach.png';
import ranbeerRoysArtFair from '../Icons/ranbeer-roys-art-fair.png';
import './AboutMe.css';

export default function AboutMe() {
  const navigate = useNavigate();
  const goToHomeCollection = () => {
    navigate('/', { state: { scrollTo: 'collection' } });
  };

  const knowMoreRef = useRef(null);
  const scrollToKnowMore = () => {
    const y = knowMoreRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const whatIPaintIds = [130, 139, 102]; 
  const [whatIPaint, setWhatIPaint] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imgs = await Promise.all(
          whatIPaintIds.map(async (id) => {
            const res = await getArtworkImages(id, 'original'); // same pattern as Collection
            return res?.[0]?.url || null;
          })
        );
        setWhatIPaint(imgs.filter(Boolean));
        console.log("imageUrls : " + whatIPaint)
      } catch (e) {
        console.error('Error fetching What I Paint images:', e);
      }
    };
    fetchImages();
  }, [whatIPaintIds]);

  return (
    <div className='page-content section'>
      <h1 className='page-header'>About Me</h1>
      {/* Intro Section */}
      <div className='horizontal-container section section-1'>
        <div className='image-content'>
          <img  src={ranbeerDp} alt="Artist painting in studio"/>
        </div>
        <div className='vertical-container text-content'>
          <div >
            <h1 className="secondary-header">Art that speaks in color and power</h1>
            <p>Bold, motivational paintings — large animals, vibrant abstracts, and
              pop-inspired works that inspire strength and ambition.
            </p>
          </div>
          <div className='horizontal-container button-container'>
            <button className='button01' role="button" onClick={scrollToKnowMore}>
              <span class="text">Know more</span>
              <span>Know</span>
            </button>
            <button className='button01' role="button" onClick={goToHomeCollection}>
              <span class="text">Explore Art</span>
              <span>Explore</span>
            </button>           
          </div>
        </div>
        
      </div>

      {/* My Story */}
      <div ref={knowMoreRef} className='vertical-container section section-2'>
        <div>
          <h2 className='secondary-header'>From Canvas to Vision</h2>
          <p>
            With a diploma in Fine Arts and a degree in Computer Science,
            painting became my outlet to capture energy, resilience, and ambition.
            My work celebrates strength — from a tiger’s gaze to the vastness of
            a whale or the playful edge of pop culture reimagined with motivational
            themes.
          </p>
          <p >
            I believe art should do more than decorate a wall — it should inspire
            you every day.
          </p>
          <p>
            (This website is my own creation — designed and built by me.)
          </p>
        </div>
      </div>

      {/* My Art */}
      <div className='vertical-container section'>
        <h2 className='secondary-header'>What I Paint</h2>
        <div className='horizontal-container my-art-image-gallery'>
          {whatIPaint.map((url, i) => (
            <img className='art-image' key={i} src={url} alt={`What I Paint ${i + 1}`} />
          ))}
        </div>
      </div>



      {/* Originals / Prints / Commissions */}
      <div className='vertical-container section'>
        <h2 className='secondary-header'>Originals, Prints & Commissions</h2>
        <p>
          From one-of-a-kind canvases to limited giclée prints and custom commissions.
        </p>
        <button 
          className='button01' 
          role="button"
          onClick={() => {
              const subject = encodeURIComponent(`Interested in a Commissioned Piece`);
              const body = encodeURIComponent(
                `Hi Ranbeer, \n\n I liked some of your paintings And would like to discuss an Idea.\n Could you please get in touch with me regarding a commissioned piece? Looking forward to hearing from you. \n\n Commision Details (Optional): \n [Provide details about the size, theme, colors, and any specific elements you want in the painting]\n\n Best Regards,\n [Your Name]`
              );
              window.location.href = `mailto:ranbeerchaudhary03@gmail.com?subject=${subject}&body=${body}`;
            }}
        >
          <span class="text">Commission Your Piece</span>
          <span>Commission Inquiry</span>
        </button>
      </div>

      {/* Exhibitions */}
      <div className='vertical-container section section-3'>
        <h2 className='secondary-header'>Seen & Collected</h2>
        <p>
          Exhibited at London art fairs, including the <strong>Roy Art Fair (2023)</strong>.
          Collected by private buyers internationally.
        </p>
        <div className='horizontal-container about-me-image-gallery'>
          <img src={ranbeerIndianSpeach} alt="Abstract painting"/>
          <img src={ranbeerRoysArtFair} alt="Pop-inspired painting"/>
          <img src={ranbeerBattersea} alt="Tiger painting"/>
        </div>
      </div>

      {/* Final CTA */}
      <div className='vertical-container section'>
        <h2 className='secondary-header'>
          Whether it’s an original canvas or a custom commission, my art is about
          energy, drive, and presence.
        </h2>
      </div>
    </div>
);
}
