import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [activeTab, setActiveTab] = useState('contact');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to Firebase
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      appointmentDate: '',
      appointmentTime: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20" style={{ backgroundColor: '#fdf2f8' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-4" style={{ color: '#3E0309' }}>Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message or book an appointment for a personalized consultation.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-6" style={{ color: '#3E0309' }}>Visit Our Atelier</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="mt-1" style={{ color: '#3E0309' }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#3E0309' }}>Address</h3>
                    <p className="text-gray-600">
                      123 Fashion Dist<br />
                      Gulistan-e-jauhar,karachi<br />
                      Pakistan 75290
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone size={24} className="mt-1" style={{ color: '#3E0309' }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#3E0309' }}>Phone</h3>
                    <p className="text-gray-600">+92 3313103442</p>
                    <p className="text-sm text-gray-500">WhatsApp available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={24} className="mt-1" style={{ color: '#3E0309' }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#3E0309' }}>Email</h3>
                    <p className="text-gray-600">info@heritagebynn.com</p>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock size={24} className="mt-1" style={{ color: '#3E0309' }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#3E0309' }}>Hours</h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 11:00 AM - 6:00 PM</p>
                      <p style={{ color: '#3E0309' }}>By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle size={24} className="text-green-600" />
                <h3 className="font-semibold text-gray-800">Quick Response</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Need immediate assistance? Chat with us on WhatsApp for instant responses.
              </p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center space-x-2">
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive Map</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`py-3 px-6 font-medium text-sm transition-colors ${
                    activeTab === 'contact'
                      ? 'border-b-2 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === 'contact' ? { borderColor: '#3E0309', color: '#3E0309' } : {}}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setActiveTab('appointment')}
                  className={`py-3 px-6 font-medium text-sm transition-colors ${
                    activeTab === 'appointment'
                      ? 'border-b-2 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === 'appointment' ? { borderColor: '#3E0309', color: '#3E0309' } : {}}
                >
                  Book Appointment
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#3E0309' } as any}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#3E0309' } as any}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#3E0309' } as any}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#3E0309' } as any}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Size Consultation">Size Consultation</option>
                      <option value="Alteration Request">Alteration Request</option>
                      <option value="Wedding Package">Wedding Package</option>
                      <option value="Return/Exchange">Return/Exchange</option>
                    </select>
                  </div>
                </div>

                {/* Appointment Fields */}
                {activeTab === 'appointment' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required={activeTab === 'appointment'}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': '#3E0309' } as any}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required={activeTab === 'appointment'}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': '#3E0309' } as any}
                      >
                        <option value="">Select time</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#3E0309' } as any}
                    placeholder={
                      activeTab === 'appointment'
                        ? "Please describe the type of outfit you're looking for, any specific requirements, and your event details..."
                        : "Tell us how we can help you..."
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#3E0309' }}
                >
                  <Send size={20} />
                  <span>
                    {activeTab === 'appointment' ? 'Book Appointment' : 'Send Message'}
                  </span>
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4" style={{ color: '#3E0309' }}>Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to commonly asked questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book for a wedding outfit?",
                answer: "We recommend booking 3-4 months in advance for bridal wear to allow sufficient time for design consultations, fittings, and any customizations."
              },
              {
                question: "Do you offer custom sizing and alterations?",
                answer: "Yes, all our outfits can be custom-fitted. We provide detailed measurement sessions and multiple fittings to ensure a perfect fit."
              },
              {
                question: "What is your return and exchange policy?",
                answer: "We offer exchanges within 30 days of delivery for ready-to-wear items. Custom-made pieces are non-returnable but we guarantee perfect fit through our fitting process."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship worldwide. International shipping costs and delivery times vary by location. Please contact us for specific details."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-2" style={{ color: '#3E0309' }}>{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}