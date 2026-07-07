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
  const [sortOrder, setSortOrder] = useState('relevant');

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

  const displayableArtworks = useMemo(
    // Only artworks with an uploaded image are shown; new pieces appear
    // automatically once their image lands in Supabase.
    () => artworks.filter((artwork) => findPrimaryImage(artwork.id)),
    [artworks, findPrimaryImage]
  );

  const availableCollections = useMemo(() => {
    const collections = new Set(
      displayableArtworks
        .map((artwork) => artwork.collection)
        // Skip empty values and data-entry placeholders still in the table.
        .filter((collection) => collection && collection.toLowerCase() !== 'todo')
    );
    return [...collections].sort();
  }, [displayableArtworks]);

  const lowestPriceFor = useMemo(() => {
    const byArtworkId = new Map(
      prices.map((row) => [row.artwork_id, getLowestPrice(row)])
    );
    return (artworkId) => byArtworkId.get(artworkId) ?? null;
  }, [prices]);

  const filteredArtworks = useMemo(() => {
    const filtered =
      selectedFilters.length === 0
        ? displayableArtworks
        : displayableArtworks.filter((artwork) =>
            selectedFilters.includes(artwork.collection)
          );
    if (sortOrder === 'relevant') return filtered;
    // Unpriced pieces ("Request price") always sort last.
    const direction = sortOrder === 'low-high' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const priceA = lowestPriceFor(a.id);
      const priceB = lowestPriceFor(b.id);
      if (priceA === null && priceB === null) return 0;
      if (priceA === null) return 1;
      if (priceB === null) return -1;
      return (priceA - priceB) * direction;
    });
  }, [displayableArtworks, selectedFilters, sortOrder, lowestPriceFor]);

  return (
    <div className="page shop-page">
      <div className="filter-container">
        <h3 className="filter-title">Filters</h3>
        <ShopFilterBar
          collections={availableCollections}
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
          <select
            className="sort-button"
            aria-label="Sort artworks"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        <div className="product-cards">
          {filteredArtworks.map((artwork) => {
            const image = findPrimaryImage(artwork.id);
            const lowestPrice = lowestPriceFor(artwork.id);
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
