import { useEffect, useState } from 'react';
import api from '../utils/api';

interface Order {
  _id: string;
<<<<<<< HEAD
  customer: { name: string; email: string; address: string };
=======
  customerName: string;
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
  total: number;
  status: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

<<<<<<< HEAD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

=======
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
<<<<<<< HEAD
        console.log('Orders:', response.data); // Debug
        setOrders(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
=======
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status } : order)));
<<<<<<< HEAD
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
=======
    } catch (err) {
      setError('Failed to update status');
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
<<<<<<< HEAD
      <p className="mb-4">Total Revenue: {formatPrice(totalRevenue)}</p>
=======
      <p className="mb-4">Total Revenue: ${totalRevenue.toFixed(2)}</p>
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
<<<<<<< HEAD
              <td className="border p-2">{order.customer.name}</td>
              <td className="border p-2">{formatPrice(order.total)}</td>
=======
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">${order.total.toFixed(2)}</td>
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={e => updateStatus(order._id, e.target.value)}
                  className="border p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
