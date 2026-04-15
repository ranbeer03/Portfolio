import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "./ProductPage.css";

import rulerpen from "../Icons/ruler&pen.png";
import calendar from "../Icons/calendar-schedule.png";
import paintBrush from "../Icons/paint-brush.png";
import gallery from "../Icons/gallery.png";

import { getProductInfoById, getArtworkImages } from "../Services/ProductsService.ts";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [p, imgs] = await Promise.all([
          getProductInfoById(String(id)),
          getArtworkImages(String(id)),
        ]);

        if (!isMounted) return;

        setProduct(p);
        console.log("blah product ", id, ": ", p);
        setImages(
          (imgs || []).map((i) => ({
            original: i.url,
            thumbnail: i.url,
          }))
        );
      } catch (e) {
        console.error("Product load error:", e);
        setProduct(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/gallery");
  };

  if (loading) return <div className="product-page">Loading...</div>;

  if (!product) {
    return (
      <div className="product-page">
        <p>Product not found.</p>
        <button onClick={handleBack}>Go back to Gallery</button>
      </div>
    );
  }

  const productProperties = [
    { name: "Dimensions", icon: rulerpen, value: product.size_inches },
    { name: "Made on", icon: calendar, value: formatDate(product.created_at) || "—" },
    { name: "Medium", icon: paintBrush, value: product.medium || "—" },
    { name: "Genre", icon: gallery, value: product.type || "—" },
    { name: "Collection", icon: gallery, value: product.type || "—" },
  ];

  const PropertiesSection = ({ properties }) => (
    <div className="properties">
      {properties.map((prop, idx) => (
        <div key={idx} className="property">
          <div className="property-name">
            <img src={prop.icon} alt="" className="icon" />
            <p>{prop.name}</p>
          </div>
          <p>{prop.value}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page">
      <div>
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
      </div>

      <div className="content">
        <ReactImageGallery
          showBullets={false}w
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
          <button
            className="secondary-button"
            onClick={() => {
              const subject = encodeURIComponent(`Interested in "${product.name}"`);
              const body = encodeURIComponent(
                `Hi Ranbeer,\n\nI like the painting "${product.name}" (${product.size_inches}). What is the price for it?\n\n`
              );
              window.location.href = `mailto:ranbeerchaudhary03@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            Request Price & Availability
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
