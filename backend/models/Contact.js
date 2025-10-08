const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  appointmentDate: { type: String },
  appointmentTime: { type: String },
  type: { type: String, default: 'contact' } // 'contact' or 'appointment'
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);