import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Download, ChevronLeft, ChevronRight, Trash2, Package, Clock, CheckCircle, DollarSign, Eye, Printer, XCircle } from 'lucide-react';
import api from '../utils/api';

interface Order {
  _id: string;
  items: { productId: string; name: string; price: number; quantity: number; selectedSize: string; selectedColor: string; image: string }[];
  customer: { name: string; email: string; address: string };
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export function ManageOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const ordersPerPage = 10;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/orders');
      console.log('Orders from API:', response.data);
      setOrders(response.data.sort((a: Order, b: Order) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }));
    } catch (err: any) {
      console.log('Fetch orders error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to fetch orders.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      console.log('Order updated:', response.data);
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status } : order)));
    } catch (err: any) {
      console.log('Update order error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to update order.');
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId));
        if (expandedOrder === orderId) {
          setExpandedOrder(null);
        }
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(null);
        }
      } catch (err: any) {
        console.log('Delete order error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to delete order.');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Email', 'Address', 'Products', 'Total', 'Status', 'Date'];
    const rows = orders.map(order => [
      order._id,
      order.customer.name,
      order.customer.email,
      order.customer.address,
      order.items.map(item => `${item.name} (x${item.quantity})`).join('; '),
      formatPrice(order.total),
      order.status,
      formatDate(order.createdAt)
    ]);
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'Pending').length,
      delivered: orders.filter(o => o.status === 'Delivered').length,
      totalRevenue: orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((total, order) => total + order.total, 0),
    };
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#3E0309' }}></div>
          <span className="text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-lg mx-auto mb-4">
          <p>{error}</p>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#3E0309' }}
        >
          <ArrowLeft size={20} />
          <span>Back to Admin</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-serif" style={{ color: '#3E0309' }}>
            Manage Orders
          </h1>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search by Order ID, Customer, or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
            />
            <button
              onClick={fetchOrders}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
            <Link
              to="/admin"
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <ArrowLeft size={20} />
              <span>Back to Admin</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{getOrderStats().total}</p>
              </div>
              <Package className="text-[#3E0309]" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending Orders</p>
                <p className="text-lg sm:text-xl font-bold text-yellow-600">{getOrderStats().pending}</p>
              </div>
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Delivered Orders</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">{getOrderStats().delivered}</p>
              </div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{formatPrice(getOrderStats().totalRevenue)}</p>
              </div>
              <DollarSign className="text-[#3E0309]" size={24} />
            </div>
          </div>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-600">No orders found.</td>
                </tr>
              ) : (
                paginatedOrders.map(order => (
                  <tr
                    key={order._id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id.slice(-6)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{order.customer.name}</div>
                      <div className="text-xs text-gray-400">{order.customer.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">
                      {order.items.map(item => (
                        <div key={item.productId} className="mb-1 truncate">{item.name} (x{item.quantity})</div>
                      ))}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(order.total)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order._id, e.target.value);
                          }}
                          className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteOrder(order._id);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Order"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Order Details"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {paginatedOrders.length === 0 ? (
            <div className="text-center text-gray-600 py-4">No orders found.</div>
          ) : (
            paginatedOrders.map(order => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm p-4"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-900">Order #{order._id.slice(-6)}</div>
                  <div className="text-sm text-gray-500">{order.status}</div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <div><strong>Customer:</strong> {order.customer.name}</div>
                  <div><strong>Email:</strong> {order.customer.email}</div>
                  <div><strong>Total:</strong> {formatPrice(order.total)}</div>
                  <div><strong>Date:</strong> {formatDate(order.createdAt)}</div>
                </div>
                {expandedOrder === order._id && (
                  <div className="mt-4 text-sm text-gray-500">
                    <div><strong>Address:</strong> {order.customer.address}</div>
                    <div className="mt-2"><strong>Products:</strong></div>
                    {order.items.map(item => (
                      <div key={item.productId} className="ml-2">
                        - {item.name} (x{item.quantity}, {item.selectedSize}, {item.selectedColor})
                      </div>
                    ))}
                    <div className="mt-2"><strong>Payment:</strong> {order.paymentMethod}</div>
                    <div className="mt-2">
                      <strong>Update Status:</strong>
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order._id, e.target.value);
                        }}
                        className="mt-1 p-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order._id);
                        }}
                        className="flex items-center space-x-2 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-opacity"
                      >
                        <Trash2 size={16} />
                        <span>Delete Order</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="flex items-center space-x-2 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-opacity"
                      >
                        <Eye size={16} />
                        <span>View Order</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{selectedOrder._id.slice(-8)}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 print:hidden"
                    >
                      <Printer size={16} />
                      Print
                    </button>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-1 hover:bg-gray-100 rounded-lg print:hidden"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4" id="printable-order">
                {/* Print Header */}
                <div className="hidden print:block text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h1>
                  <p className="text-gray-600">Order #{selectedOrder._id}</p>
                  <p className="text-sm text-gray-500">Printed on: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 print:bg-white print:border print:border-gray-300 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                    <span className="mr-2">Customer Information</span>
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                    <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="bg-gray-50 print:bg-white print:border print:border-gray-300 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                    <span className="mr-2">Order Information</span>
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 print:bg-white print:border print:border-gray-300 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                    <span className="mr-2">Payment Information</span>
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                    <p><strong>Subtotal:</strong> {formatPrice(selectedOrder.subtotal)}</p>
                    <p><strong>Shipping:</strong> {formatPrice(selectedOrder.shipping)}</p>
                    <p className="font-medium"><strong>Total:</strong> {formatPrice(selectedOrder.total)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg text-sm print:border-collapse">
                      <thead className="bg-gray-50 print:bg-gray-100">
                        <tr>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Product</th>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Price</th>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Qty</th>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Size</th>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Color</th>
                          <th className="text-left p-2 border-b print:border print:border-gray-400">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index} className="border-b last:border-b-0 print:border-b print:border-gray-300">
                            <td className="p-2 print:border print:border-gray-300">{item.name}</td>
                            <td className="p-2 print:border print:border-gray-300">{formatPrice(item.price)}</td>
                            <td className="p-2 print:border print:border-gray-300">{item.quantity}</td>
                            <td className="p-2 print:border print:border-gray-300">{item.selectedSize}</td>
                            <td className="p-2 print:border print:border-gray-300">{item.selectedColor}</td>
                            <td className="p-2 font-medium print:border print:border-gray-300">{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 print:bg-gray-100">
                        <tr>
                          <td colSpan={5} className="p-2 text-right font-medium print:border print:border-gray-400">Order Total:</td>
                          <td className="p-2 font-bold print:border print:border-gray-400">{formatPrice(selectedOrder.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Print Footer */}
                <div className="hidden print:block text-center mt-8 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600">Thank you for your business!</p>
                  <p className="text-xs text-gray-500 mt-1">This is a computer-generated document.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: currentPage === 1 ? '#e5e7eb' : '#3E0309', color: 'white' }}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#3E0309', color: 'white' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}