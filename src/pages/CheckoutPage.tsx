import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import api from '../utils/api';

export function CheckoutPage() {
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
    paymentMethod: 'COD', // Default to Cash on Delivery
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
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
          image: item.images[0],
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
      console.error('Checkout failed:', err);
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif" style={{ color: '#3E0309' }}>Checkout</h1>
          <Link
            to="/cart"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            style={{ color: '#3E0309' }}
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>
              Shipping Information
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
              <div className="grid grid-cols-2 gap-4">
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
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>
                Order Summary
              </h2>
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
                className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#3E0309' }}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 mb-2">Secure checkout powered by SSL</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <span>We accept:</span>
                  <span>COD • Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}