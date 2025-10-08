import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import api from '../utils/api';

export function CartPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD',
  });

  // Debug cart state
  console.log('Cart state:', state.cart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number, selectedSize: string, selectedColor: string) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      setError('Please fill in all customer details.');
      return;
    }

    // Check for missing images and warn user (optional)
    if (state.cart.some(item => !item.images || item.images.length === 0)) {
      setError('Some items in your cart are missing images. You can proceed, but images will be added later.');
    }

    setIsProcessing(true);
    setError('');
    
    try {
      const orderData = {
        items: state.cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          image: item.images && item.images.length > 0 ? `http://localhost:5002${item.images[0]}` : null,
        })),
        customer: {
          name: formData.name,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        },
        subtotal,
        shipping,
        total,
        paymentMethod: formData.paymentMethod,
        status: 'Pending',
      };

      const response = await api.post('/orders', orderData);
      dispatch({ type: 'CLEAR_CART' });
      navigate(`/order-success/${response.data._id}`);
    } catch (err: any) {
      console.error('Order failed:', err);
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-4" style={{ color: '#3E0309' }}>Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Discover our beautiful collections and add some items to your cart.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2" style={{ color: '#3E0309' }}>Shopping Cart</h1>
            <p className="text-gray-600">{state.cart.length} items in your cart</p>
          </div>
          <Link
            to="/shop"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            style={{ color: '#3E0309' }}
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>
                Customer Information
              </h2>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>Your Items</h2>
              <div className="space-y-6">
                {state.cart.map((item) => (
                  <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-start space-x-4 border-b border-gray-200 pb-6">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={`http://localhost:5002${item.images[0]}`}
                        alt={item.name}
                        className="w-24 h-32 object-cover rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load cart image: http://localhost:5002${item.images[0]}`);
                          e.currentTarget.src = '/fallback-image.jpg'; // Optional fallback
                        }}
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium mb-1" style={{ color: '#3E0309' }}>{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span>Color: {item.selectedColor}</span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold" style={{ color: '#3E0309' }}>
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              {formatPrice(item.price)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>Order Summary</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-600">🎉 You've qualified for free shipping!</p>
                )}
                {shipping > 0 && (
                  <p className="text-sm text-gray-600">
                    Spend {formatPrice(50000 - subtotal)} more for free shipping
                  </p>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span style={{ color: '#3E0309' }}>Total</span>
                  <span style={{ color: '#3E0309' }}>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || !formData.name || !formData.email || !formData.address}
                className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                style={{ backgroundColor: '#3E0309' }}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Secure checkout powered by SSL</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <span>We accept:</span>
                  <span>COD • Bank Transfer</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-semibold" style={{ color: '#3E0309' }}>Free Returns</div>
                    <div className="text-xs text-gray-600">30 days</div>
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#3E0309' }}>Custom Fit</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}