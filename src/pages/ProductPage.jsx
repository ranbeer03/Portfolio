import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "./ProductPage.css";

import rulerPenIcon from "../assets/icons/ruler-pen.png";
import calendarIcon from "../assets/icons/calendar.png";
import paintBrushIcon from "../assets/icons/paint-brush.png";
import galleryIcon from "../assets/icons/gallery.png";

import { getArtworkById, getArtworkImages } from "../services/artworksService.ts";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import { getAvailableEditions } from "../data/editions";
import usePageTitle from "../hooks/usePageTitle";
import { CONTACT_EMAIL } from '../config';

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  try {
    return new Date(isoDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const PropertiesSection = ({ properties }) => (
  <div className="properties">
    {properties.map((property) => (
      <div key={property.name} className="property">
        <div className="property-name">
          <img src={property.icon} alt="" className="icon" />
          <p>{property.name}</p>
        </div>
        <p>{property.value}</p>
      </div>
    ))}
  </div>
);

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { prices, currency, deliveryFee } = useContext(ShopContext);
  const { items, addItem } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEditionKey, setSelectedEditionKey] = useState(null);

  usePageTitle(product ? `${product.name} — Ranbeer Chaudhary` : undefined);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        const [artwork, artworkImages] = await Promise.all([
          getArtworkById(id),
          getArtworkImages(id),
        ]);

        if (!isMounted) return;

        setProduct(artwork);
        setImages(
          (artworkImages || []).map((image) => ({
            original: image.url,
            thumbnail: image.url,
          }))
        );
      } catch (error) {
        console.error("Product load error:", error);
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const requestPriceByEmail = () => {
    const subject = encodeURIComponent(`Interested in "${product.name}"`);
    const body = encodeURIComponent(
      `Hi Ranbeer,\n\nI like the painting "${product.name}" (${product.size_inches}). What is the price for it?\n\n`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  if (loading) return <div className="page">Loading...</div>;

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
        <button className="btn btn-outline" onClick={handleBack}>
          Go back
        </button>
      </div>
    );
  }

  const productProperties = [
    { name: "Dimensions", icon: rulerPenIcon, value: product.size_inches || "—" },
    { name: "Made on", icon: calendarIcon, value: formatDate(product.created_at) || "—" },
    { name: "Medium", icon: paintBrushIcon, value: product.medium || "—" },
    { name: "Genre", icon: galleryIcon, value: product.genre || "—" },
    { name: "Collection", icon: galleryIcon, value: product.collection || "—" },
  ];

  const priceRow = prices.find((row) => row.artwork_id === product.id);
  const editions = getAvailableEditions(priceRow);
  const selectedEdition =
    editions.find((edition) => edition.key === selectedEditionKey) ?? editions[0];
  const isInCart =
    selectedEdition &&
    items.some(
      (line) =>
        line.artworkId === product.id && line.editionKey === selectedEdition.key
    );

  const handleAddToCart = () => {
    addItem({
      artworkId: product.id,
      editionKey: selectedEdition.key,
      editionLabel: selectedEdition.label,
      name: product.name,
      imageUrl: images[0]?.original ?? null,
      unitPrice: selectedEdition.price,
      maxQuantity: selectedEdition.maxQuantity,
    });
  };

  return (
    <div className="page">
      <div>
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
      </div>

      <div className="product-content">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
        />

        <div className="product-details-section">
          <div>
            <h1 className="page-header">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <PropertiesSection properties={productProperties} />
          </div>
          {editions.length > 0 ? (
            <div className="purchase-panel">
              <div className="field">
                <label htmlFor="edition-select">Edition</label>
                <select
                  id="edition-select"
                  className="input edition-select"
                  value={selectedEdition.key}
                  onChange={(e) => setSelectedEditionKey(e.target.value)}
                >
                  {editions.map((edition) => (
                    <option key={edition.key} value={edition.key}>
                      {edition.label} — {currency}
                      {edition.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="purchase-actions">
                <p className="purchase-price">
                  {currency}
                  {selectedEdition.price}
                </p>
                {isInCart ? (
                  <Link to="/cart" className="btn btn-outline">
                    In cart — view cart
                  </Link>
                ) : (
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </div>
              <p className="purchase-note">
                Ships worldwide · {currency}
                {deliveryFee} flat delivery
              </p>
            </div>
          ) : (
            <div className="purchase-panel">
              <p className="purchase-note">
                This piece isn't available for direct online purchase yet —
                ask and I'll reply with price and availability.
              </p>
              <button className="btn btn-primary" onClick={requestPriceByEmail}>
                Request Price &amp; Availability
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
