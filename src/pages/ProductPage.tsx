import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Shield, RotateCcw, Ruler, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../contexts/AppContext';
import { ProductCard } from '../components/ProductCard';

export function ProductPage() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#3E0309' }}>Product not found</h2>
          <Link to="/shop" className="hover:opacity-80 transition-opacity" style={{ color: '#3E0309' }}>
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = state.wishlist.includes(product.id);
  const relatedProducts = products.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.occasion === product.occasion)
  ).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Please select size and color', type: 'error' }
      });
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity,
        selectedSize,
        selectedColor
      }
    });
  };

  const handleWishlistToggle = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:opacity-80 transition-opacity" style={{ '--tw-hover-color': '#3E0309' } as any}>Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:opacity-80 transition-opacity" style={{ '--tw-hover-color': '#3E0309' } as any}>Shop</Link></li>
            <li>/</li>
            <li><Link to={`/shop?category=${product.category}`} className="hover:opacity-80 transition-opacity" style={{ '--tw-hover-color': '#3E0309' } as any}>{product.category}</Link></li>
            <li>/</li>
            <li className="text-gray-800">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.isNew && (
                  <span className="bg-blush-pink text-white px-3 py-1 text-sm font-medium rounded">
                    NEW
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-white px-3 py-1 text-sm font-medium rounded" style={{ backgroundColor: '#3E0309' }}>
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-current'
                        : 'border-gray-200'
                    }`}
                    style={selectedImageIndex === index ? { borderColor: '#3E0309' } : {}}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#3E0309' }}>
                  {product.category}
                </span>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted
                      ? 'bg-blush-pink text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <h1 className="text-3xl font-serif mb-4" style={{ color: '#3E0309' }}>{product.name}</h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-semibold text-gray-800">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-blush-pink text-white px-2 py-1 text-sm font-medium rounded">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • 24 reviews</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3" style={{ color: '#3E0309' }}>Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      selectedColor === color
                        ? 'border-current text-current'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={selectedColor === color ? { borderColor: '#3E0309', color: '#3E0309', backgroundColor: '#fdf2f8' } : {}}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium" style={{ color: '#3E0309' }}>Size</h3>
                <button className="text-sm font-medium hover:opacity-80 transition-opacity flex items-center space-x-1" style={{ color: '#3E0309' }}>
                  <Ruler size={14} />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      selectedSize === size
                        ? 'border-current text-current'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={selectedSize === size ? { borderColor: '#3E0309', color: '#3E0309', backgroundColor: '#fdf2f8' } : {}}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3" style={{ color: '#3E0309' }}>Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#3E0309' }}
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button className="w-full border-2 py-3 px-6 rounded-lg font-medium hover:bg-opacity-5 transition-colors" style={{ borderColor: '#3E0309', color: '#3E0309' }}>
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2" style={{ color: '#3E0309' }} />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="mx-auto mb-2" style={{ color: '#3E0309' }} />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2" style={{ color: '#3E0309' }} />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {['details', 'care', 'shipping', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-current text-current'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === tab ? { borderColor: '#3E0309', color: '#3E0309' } : {}}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#3E0309' }}>Product Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#3E0309' }}>Fabric & Materials</h4>
                    <p className="text-gray-600">{product.fabric}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#3E0309' }}>Embroidery Work</h4>
                    <p className="text-gray-600">{product.embroidery}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#3E0309' }}>Occasion</h4>
                    <p className="text-gray-600">{product.occasion}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#3E0309' }}>Available Colors</h4>
                    <p className="text-gray-600">{product.colors.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#3E0309' }}>Care Instructions</h3>
                <p className="text-gray-600">{product.careInstructions}</p>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#fdf2f8' }}>
                  <h4 className="font-medium mb-2" style={{ color: '#3E0309' }}>Additional Care Tips</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Store in a cool, dry place away from direct sunlight</li>
                    <li>• Use padded hangers to maintain shape</li>
                    <li>• Avoid contact with perfumes and deodorants</li>
                    <li>• Professional cleaning recommended for best results</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#3E0309' }}>Shipping Information</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Free shipping</strong> on orders above ₹50,000</p>
                  <p><strong>Standard delivery:</strong> 5-7 business days</p>
                  <p><strong>Express delivery:</strong> 2-3 business days (Additional charges apply)</p>
                  <p><strong>International shipping:</strong> Available to select countries</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold" style={{ color: '#3E0309' }}>Customer Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(review => (
                    <div key={review} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium" style={{ color: '#3E0309' }}>Amazing quality!</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Absolutely stunning piece. The craftsmanship is exceptional and the fit is perfect. 
                        Highly recommend for special occasions.
                      </p>
                      <div className="text-xs text-gray-500 mt-2">
                        By Anonymous • Verified Purchase
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-serif mb-8 text-center" style={{ color: '#3E0309' }}>You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
