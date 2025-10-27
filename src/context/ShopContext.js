import { createContext, useState, useEffect } from "react";
import { supabase } from "../Services/SupaBaseClient";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [artworks, setArtworks] = useState([]);
  const [prices_and_stock, setPricesAndStock] = useState([]);
  const [artwork_images, setArtworkImages] = useState([]);

  const currency = '£';
  const delivery_fees = 10;

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase.from('artworks').select('*');
      if (error) {
        console.error('Error fetching artworks:', error);
      } else {
        setArtworks(data);
      }

      const { data: imageData, error: error2 } = await supabase.from('images').select('*');
      if (error2) {
        console.error('Error fetching artworks:', error2);
      } else {
        setArtworkImages(imageData);
        console.log("images recieved at context= " + imageData.length)
      }

      const { data: priceStockData, error: error3 } = await supabase.from('prices').select('*');
      if (error2) {
        console.error('Error fetching prices:', error3);
      } else {
        setPricesAndStock(priceStockData);
        console.log("prices recieved at context= " + priceStockData.length)
      }
    };

    fetchArtworks();
  }, []);

  const value = {
    artworks,
    prices_and_stock,
    artwork_images,
    currency,
    delivery_fees
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
