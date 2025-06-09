// MasonryLayout.jsx
import React from 'react';
import './MasonryLayout.css';
import Card from './Cards';
import Masonry from 'react-masonry-css';

const MasonryLayout = ({ cards }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {cards.map((card, index) => (
        <div key={card.id || index} className="masonry-card">
          <Card {...card} />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
