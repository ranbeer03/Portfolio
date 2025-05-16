import React, { useState } from "react";
import './StackedCards.css'

const StackedCards = () => {
  const cards = [
    { id: 1, title: "Card One", description: "This is the first card." },
    { id: 2, title: "Card Two", description: "This is the second card." },
    { id: 3, title: "Card Three", description: "This is the third card." },
    { id: 4, title: "Card Four", description: "This is the fourth card." },
    { id: 5, title: "Card One", description: "This is the first card." },
    { id: 6, title: "Card Two", description: "This is the second card." },
    { id: 7, title: "Card Three", description: "This is the third card." },
    { id: 8, title: "Card Four", description: "This is the fourth card." },
    { id: 9, title: "Card One", description: "This is the first card." },
    { id: 10, title: "Card Two", description: "This is the second card." },
    { id: 11, title: "Card Three", description: "This is the third card." },
    { id: 12, title: "Card Four", description: "This is the fourth card." },
    { id: 13, title: "Card Three", description: "This is the third card." },
    { id: 14, title: "Card Four", description: "This is the fourth card." },
    { id: 15, title: "Card One", description: "This is the first card." },
    { id: 16, title: "Card Two", description: "This is the second card." },
    { id: 17, title: "Card Three", description: "This is the third card." },
    { id: 18, title: "Card Four", description: "This is the fourth card." },

  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="print-card-container">
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Stacked Cards</h2>
      <div className="print-cards">
        {cards.map((card, index) => {
          const offset = index * 120;
          const isHovered = hoveredIndex === index;

          return (
            <div
              className="print-card"
              key={card.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                left: offset,     
                zIndex: index,
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem" }}>{card.title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedCards;
