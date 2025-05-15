import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artData } from '../Data/Data';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = artData.find((item) => item.id === parseInt(id));

  const [productType, setProductType] = useState('original');
  const [frameOption, setFrameOption] = useState('framed');
  const [printSize, setPrintSize] = useState('A5');

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/gallery');
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-xl">Product not found.</p>
        <button className="mt-4 border px-4 py-2" onClick={handleBack}>Go back to Gallery</button>
      </div>
    );
  }

  const images = Array(5).fill({
    original: product.imageUrl,
    thumbnail: product.imageUrl
  });

  return (
    <section className="container mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* Image Gallery */}
      <div className="px-4">
        <button className="mb-4 text-sm text-gray-600 underline" onClick={handleBack}>
          ← Back
        </button>
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
        />
      </div>

      {/* Product Details */}
      <div className="px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.name}</h2>

        <p className="mt-4 text-sm leading-6 text-gray-500">{product.description}</p>
        <p className="font-bold mt-3">Size: <span className="font-normal">{product.size}</span></p>
        <p className="font-bold">Medium: <span className="font-normal">{product.medium}</span></p>
        <p className="font-bold">Size Range: <span className="font-normal">{product.sizeRange}</span></p>
        <p className="font-bold">Subject Matter: <span className="font-normal">{product.subjectMatter}</span></p>

        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Type</p>
          <div className="flex gap-2">
            {['original', 'print'].map((type) => (
              <button
                key={type}
                onClick={() => setProductType(type)}
                className={`px-4 py-2 border rounded-lg ${
                  productType === type ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {productType === 'original' ? (
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Frame Option</p>
            <div className="flex gap-2">
              {['framed', 'notFramed'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFrameOption(option)}
                  className={`px-4 py-2 border rounded-lg ${
                    frameOption === option ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  {option === 'framed' ? 'Framed' : 'Not Framed'}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Print Size</p>
            <div className="flex gap-2">
              {['A5', 'A4', 'A3'].map((size) => (
                <button
                  key={size}
                  onClick={() => setPrintSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    printSize === size ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-row items-center gap-6">
          <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white hover:bg-violet-800 rounded-xl">
            <BiShoppingBag className="mx-2" />
            Buy Now
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 hover:bg-amber-300 rounded-xl">
            <AiOutlineHeart className="mx-2" />
            Add to Basket
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
