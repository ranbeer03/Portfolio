import { useContext, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/product/ProductCard';
import ShopFilterBar from '../components/product/ShopFilterBar';
import { getLowestPrice } from '../data/editions';
import usePageTitle from '../hooks/usePageTitle';
import './ShopPage.css';

const ShopPage = () => {
  usePageTitle('Gallery — Ranbeer Chaudhary');
  const { artworks, artworkImages, prices, currency } = useContext(ShopContext);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (event) => {
    const { value } = event.target;
    setSelectedFilters((previous) =>
      previous.includes(value)
        ? previous.filter((filter) => filter !== value)
        : [...previous, value]
    );
  };

  const findPrimaryImage = useMemo(() => {
    const byArtworkId = new Map();
    artworkImages.forEach((image) => {
      if (image.tag === 'original' && !byArtworkId.has(image.artwork_id)) {
        byArtworkId.set(image.artwork_id, image);
      }
    });
    return (artworkId) => byArtworkId.get(artworkId);
  }, [artworkImages]);

  const filteredArtworks = useMemo(() => {
    // Only artworks with an uploaded image are shown; new pieces appear
    // automatically once their image lands in Supabase.
    const displayable = artworks.filter((artwork) => findPrimaryImage(artwork.id));
    if (selectedFilters.length === 0) return displayable;
    return displayable.filter((artwork) =>
      selectedFilters.includes(artwork.collection)
    );
  }, [artworks, selectedFilters, findPrimaryImage]);

  return (
    <div className="page shop-page">
      <div className="filter-container">
        <h3 className="filter-title">Filters</h3>
        <ShopFilterBar
          selectedFilters={selectedFilters}
          onFilterToggle={toggleFilter}
        />
      </div>

      <div className="products-section">
        <div className="shop-header">
          <div>
            <p className="eyebrow">The full body of work</p>
            <h1 className="page-header">Gallery</h1>
          </div>
          {/* TODO: wire sorting to price data once prices are linked to artworks */}
          <select className="sort-button">
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        <div className="product-cards">
          {filteredArtworks.map((artwork) => {
            const image = findPrimaryImage(artwork.id);
            const lowestPrice = getLowestPrice(
              prices.find((row) => row.artwork_id === artwork.id)
            );
            return (
              <ProductCard
                key={artwork.id}
                id={artwork.id}
                name={artwork.name}
                imageUrl={image ? image.url : ''}
                priceLabel={lowestPrice ? `From ${currency}${lowestPrice}` : null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
