const Order = require('../models/Order');

exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const shippedOrders = await Order.countDocuments({ status: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
    const totalRevenue = (await Order.aggregate([{ $match: { status: 'Delivered' } }, { $group: { _id: null, sum: { $sum: '$total' } } }]))[0]?.sum || 0;

    res.json({ totalOrders, pendingOrders, shippedOrders, deliveredOrders, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};