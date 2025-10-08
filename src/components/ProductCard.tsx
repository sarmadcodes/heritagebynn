import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const isWishlisted = state.wishlist.includes(product._id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product._id });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className={`relative ${variant === 'compact' ? 'w-24 flex-shrink-0' : 'aspect-[3/4]'} overflow-hidden`}>
        <Link to={`/product/${product._id}`}>
          {product.images && product.images.length > 0 ? (
            <img
              src={`http://localhost:5002${product.images[0]}`}
              alt={product.name}
              className={`${
                variant === 'compact' ? 'w-24 h-24' : 'w-full h-full'
              } object-cover group-hover:scale-105 transition-transform duration-500`}
              onError={(e) => {
                console.error(`Failed to load image for ${product.name}: http://localhost:5002${product.images[0]}`);
                e.currentTarget.src = '/fallback-image.jpg'; // Optional fallback
              }}
            />
          ) : (
            <div
              className={`${
                variant === 'compact' ? 'w-24 h-24' : 'w-full h-full'
              } bg-gray-200 flex items-center justify-center`}
            >
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.isNew && (
            <span className="bg-blush-pink text-white px-2 py-1 text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-champagne-600 text-white px-2 py-1 text-xs font-medium rounded">
              SALE
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isWishlisted
                ? 'bg-blush-pink text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blush-pink'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            to={`/product/${product._id}`}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-champagne-600 transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Link
            to={`/product/${product._id}`}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-lg font-medium text-sm hover:bg-white transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={16} />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className={`p-4 ${variant === 'compact' ? 'flex-1' : ''}`}>
        <div className="mb-2">
          <span className="text-champagne-600 text-xs font-medium uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium text-gray-800 mb-2 hover:text-champagne-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-semibold text-gray-800">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {variant === 'default' && (
          <>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.fabric} • {product.embroidery}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ 
                      backgroundColor: color.toLowerCase().includes('gold') ? '#D4AF37' :
                        color.toLowerCase().includes('red') ? '#DC2626' :
                        color.toLowerCase().includes('pink') ? '#EC4899' :
                        color.toLowerCase().includes('blue') ? '#2563EB' :
                        color.toLowerCase().includes('green') ? '#059669' :
                        color.toLowerCase().includes('black') ? '#1F2937' :
                        '#F3F4F6'
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500">
                {product.sizes.length} sizes
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}