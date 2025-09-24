import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="bg-champagne-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-serif text-gray-800 mb-3 sm:mb-4">
            Join Our Bridal Journey
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
            Get exclusive updates on new collections, styling tips, and special offers
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-300 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-champagne-600 text-white rounded-lg hover:bg-champagne-700 transition-colors text-sm sm:text-base font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Mobile: 3 vertical sections, Desktop: 4 columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {/* Brand Info */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl font-bold font-serif text-gray-800 tracking-wider">
                  HERITAGE
                </div>
                <div className="text-xs font-light italic text-champagne-600 -mt-1">
                  By NN
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              Where Elegance Meets Forever. Crafting timeless bridal wear with heritage techniques and luxury fabrics.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a href="#" className="text-gray-400 hover:text-champagne-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-champagne-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-champagne-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - Reduced for mobile */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold text-gray-800">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/shop" className="block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Shop All
              </Link>
              <Link to="/shop?category=Bridal" className="block text-gray-600 hover:text-champagne-600 text-sm transition-colors lg:inline">
                Bridal Collection
              </Link>
              <Link to="/lookbook" className="block text-gray-600 hover:text-champagne-600 text-sm transition-colors lg:inline">
                Lookbook
              </Link>
              {/* Desktop shows more links */}
              <Link to="/shop?category=Formal" className="hidden lg:block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Formal Wear
              </Link>
              <Link to="/shop?category=Party Wear" className="hidden lg:block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Party Wear
              </Link>
            </nav>
          </div>

          {/* Customer Care - Reduced for mobile */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold text-gray-800">Customer Care</h4>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Contact Us
              </Link>
              <Link to="/size-guide" className="block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Size Guide
              </Link>
              {/* Desktop shows more links */}
              <Link to="/shipping" className="hidden lg:block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="hidden lg:block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Returns & Exchange
              </Link>
              <Link to="/care" className="hidden lg:block text-gray-600 hover:text-champagne-600 text-sm transition-colors">
                Care Instructions
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold text-gray-800">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 justify-center lg:justify-start">
                <MapPin size={16} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600 text-center lg:text-left">
                  <p>Fashion Central Mall</p>
                  <p>Karachi, Sindh 75600</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <Phone size={16} className="text-champagne-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <Mail size={16} className="text-champagne-600 flex-shrink-0" />
                <span className="text-sm text-gray-600 break-all">info@heritagebynn.com</span>
              </div>
            </div>
            <div className="pt-4 flex justify-center lg:justify-start">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div className="text-sm text-gray-600">
              © 2025 HeritageByNN. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart size={14} className="text-blush-pink" />
              <span>for timeless elegance</span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <Link to="/privacy" className="hover:text-champagne-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-champagne-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}