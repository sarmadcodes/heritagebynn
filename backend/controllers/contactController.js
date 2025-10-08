const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  const { name, email, phone, subject, message, appointmentDate, appointmentTime, activeTab } = req.body;
  const type = activeTab === 'appointment' ? 'appointment' : 'contact';
  try {
    const contact = new Contact({ name, email, phone, subject, message, appointmentDate, appointmentTime, type });
    await contact.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};