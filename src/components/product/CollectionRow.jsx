import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { getArtworkById, getPrimaryImageUrl } from '../../services/artworksService';
import './CollectionRow.css';

/** A titled row of artworks, e.g. "Animals — 2023". */
const CollectionRow = ({ name, year, artworkIds }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchArtworks = async () => {
      try {
        const result = await Promise.all(
          artworkIds.map(async (id) => {
            const [artwork, imageUrl] = await Promise.all([
              getArtworkById(id),
              getPrimaryImageUrl(id),
            ]);
            return { ...artwork, imageUrl };
          })
        );
        if (isMounted) setArtworks(result);
      } catch (error) {
        console.error('Error fetching collection artworks:', error);
      }
    };

    fetchArtworks();
    return () => {
      isMounted = false;
    };
  }, [artworkIds]);

  return (
    <div className="collection-container vertical-container">
      <div className="collection-header">
        <h2 className="secondary-header">{name}</h2>
        <p>{year}</p>
      </div>
      <div className="collection-items horizontal-container">
        {artworks.map((artwork) => (
          <ProductItem
            key={artwork.id}
            id={artwork.id}
            name={artwork.name}
            image={artwork.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionRow;
