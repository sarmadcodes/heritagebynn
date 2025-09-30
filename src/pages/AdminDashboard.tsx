import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/orders" className="text-blue-500 hover:underline">
          Manage Orders
        </Link>
        <Link to="/admin/products" className="text-blue-500 hover:underline">
          Manage Products
        </Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
