import { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const ShopContext = createContext({
  artworks: [],
  artworkImages: [],
  prices: [],
  currency: "£",
  deliveryFee: 10,
});

const ShopContextProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [artworkImages, setArtworkImages] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      const [artworksResult, imagesResult, pricesResult] = await Promise.all([
        supabase.from("artworks").select("*"),
        supabase.from("images").select("*"),
        supabase.from("prices").select("*"),
      ]);

      if (artworksResult.error) {
        console.error("Error fetching artworks:", artworksResult.error);
      } else {
        setArtworks(artworksResult.data);
      }

      if (imagesResult.error) {
        console.error("Error fetching images:", imagesResult.error);
      } else {
        setArtworkImages(imagesResult.data);
      }

      if (pricesResult.error) {
        console.error("Error fetching prices:", pricesResult.error);
      } else {
        setPrices(pricesResult.data);
      }
    };

    fetchShopData();
  }, []);

  const value = {
    artworks,
    artworkImages,
    prices,
    currency: "£",
    deliveryFee: 10,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
