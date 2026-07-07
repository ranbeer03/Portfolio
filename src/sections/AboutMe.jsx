import { useState, useEffect } from 'react';
import { getPrimaryImageUrl } from '../services/artworksService';
import { WHAT_I_PAINT_ARTWORK_IDS } from '../data/collections';
import ranbeerDp from '../assets/images/ranbeer-dp.png';
import ranbeerBattersea from '../assets/images/ranbeer-battersea.png';
import ranbeerIndianSpeech from '../assets/images/ranbeer-indian-speech.png';
import ranbeerRoysArtFair from '../assets/images/ranbeer-roys-art-fair.png';
import './AboutMe.css';

export default function AboutMe() {
  const [whatIPaintImages, setWhatIPaintImages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      try {
        const urls = await Promise.all(
          WHAT_I_PAINT_ARTWORK_IDS.map((id) => getPrimaryImageUrl(id))
        );
        if (isMounted) setWhatIPaintImages(urls.filter(Boolean));
      } catch (error) {
        console.error('Error fetching "What I Paint" images:', error);
      }
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="about-page">
      {/* Intro */}
      <section className="section about-intro">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <p className="eyebrow">About the artist</p>
            <h1 className="page-header">
              Art that speaks in color and power
            </h1>
            <p>
              Bold, motivational paintings — large animals, vibrant abstracts,
              and pop-inspired works that inspire strength and ambition.
            </p>
          </div>
          <img
            src={ranbeerDp}
            alt="Ranbeer Chaudhary painting in his studio"
            loading="lazy"
            decoding="async"
            className="about-portrait"
          />
        </div>
      </section>

      {/* Story */}
      <section className="section about-story">
        <div className="about-story-inner">
          <div>
            <p className="eyebrow">The story</p>
            <h2 className="secondary-header">From canvas to vision</h2>
          </div>
          <div className="about-story-text">
            <p>
              With a diploma in Fine Arts and a degree in Computer Science,
              painting became my outlet to capture energy, resilience, and
              ambition. My work celebrates strength — from a tiger's gaze to
              the vastness of a whale, or the playful edge of pop culture
              reimagined with motivational themes.
            </p>
            <p>
              I believe art should do more than decorate a wall — it should
              inspire you every day.
            </p>
            <p className="text-muted">
              (This website is my own creation — designed and built by me.)
            </p>
          </div>
        </div>
      </section>

      {/* What I paint */}
      <section className="section about-work">
        <div className="about-block-inner">
          <p className="eyebrow">The work</p>
          <h2 className="secondary-header">What I paint</h2>
          <div className="about-gallery">
            {whatIPaintImages.map((url, index) => (
              <img
                key={url}
                src={url}
                alt={`Painting by Ranbeer Chaudhary ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="section about-exhibitions">
        <div className="about-block-inner">
          <p className="eyebrow">Exhibitions</p>
          <h2 className="secondary-header">Seen &amp; collected</h2>
          <p className="about-exhibitions-copy">
            Exhibited at London art fairs, including the{' '}
            <strong>Roy's Art Fair (2023)</strong>. Collected by private buyers
            internationally.
          </p>
          <div className="about-gallery">
            <img
              src={ranbeerIndianSpeech}
              alt="Ranbeer speaking at an event"
              loading="lazy"
              decoding="async"
            />
            <img
              src={ranbeerRoysArtFair}
              alt="Ranbeer at Roy's Art Fair"
              loading="lazy"
              decoding="async"
            />
            <img
              src={ranbeerBattersea}
              alt="Ranbeer exhibiting in Battersea"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
