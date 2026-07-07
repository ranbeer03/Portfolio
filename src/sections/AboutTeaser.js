import { Link } from 'react-router-dom';
import ranbeerDp from '../assets/images/ranbeer-dp.png';
import './AboutTeaser.css';

/** Short introduction band on the home page, linking to the full About page. */
const AboutTeaser = () => {
  return (
    <section className="section about-teaser">
      <div className="about-teaser-inner">
        <img
          src={ranbeerDp}
          alt="Ranbeer Chaudhary painting in his studio"
          loading="lazy"
          decoding="async"
          className="about-teaser-portrait"
        />
        <div className="about-teaser-copy">
          <p className="eyebrow">The artist</p>
          <h2 className="secondary-header">
            Art that speaks in color and power
          </h2>
          <p>
            With a diploma in Fine Arts and a degree in Computer Science,
            Ranbeer paints bold, motivational works — large animals, vibrant
            abstracts, and pop-inspired pieces that celebrate strength and
            ambition.
          </p>
          <Link to="/about" className="btn btn-outline">
            More about me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
