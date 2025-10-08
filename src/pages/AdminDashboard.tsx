import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-serif" style={{ color: '#3E0309' }}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3E0309' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/orders"
            className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            style={{ color: '#3E0309' }}
          >
            <h2 className="text-xl font-semibold">Manage Orders</h2>
            <p className="text-sm text-gray-600 mt-2">View and update customer orders</p>
          </Link>
          <Link
            to="/admin/products"
            className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            style={{ color: '#3E0309' }}
          >
            <h2 className="text-xl font-semibold">Manage Products</h2>
            
            <p className="text-sm text-gray-600 mt-2">Add, edit, or remove products</p>
          </Link>
        </div>
      </div>
    </div>
  );
}