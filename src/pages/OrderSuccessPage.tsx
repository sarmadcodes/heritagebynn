
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif mb-4" style={{ color: '#3E0309' }}>
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your order. Your order ID is <strong>{orderId}</strong>.
          </p>
          <p className="text-gray-600 mb-8">
            We'll send you a confirmation email soon with the details.
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
