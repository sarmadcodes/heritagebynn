import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state, dispatch } = useApp();
  const location = useLocation();
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-champagne-200">
      {/* Top Banner */}
      <div className="bg-champagne-100 text-champagne-800 text-center py-2 text-xs sm:text-sm">
        Free shipping on orders above Rs 8,000
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu Button + Desktop Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Desktop Logo - Left side */}
            <Link to="/" className="hidden lg:flex items-center space-x-2">
              <div className="text-center">
                <div className="text-2xl font-bold font-serif text-gray-800 tracking-wider">
                  HERITAGE
                </div>
                <div className="text-sm font-light italic text-champagne-600 -mt-1">
                  By NN
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Logo - Center */}
          <Link to="/" className="lg:hidden flex-1 flex justify-center">
            <div className="text-center">
              <div className="text-xl font-bold font-serif text-gray-800 tracking-wider">
                HERITAGE
              </div>
              <div className="text-xs font-light italic text-champagne-600 -mt-1">
                By NN
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-champagne-600 ${
                isActiveLink('/') ? 'text-champagne-600 border-b-2 border-champagne-600 pb-1' : 'text-gray-700'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors hover:text-champagne-600 ${
                isActiveLink('/shop') ? 'text-champagne-600 border-b-2 border-champagne-600 pb-1' : 'text-gray-700'
              }`}
            >
              SHOP
            </Link>
            <Link
              to="/lookbook"
              className={`text-sm font-medium transition-colors hover:text-champagne-600 ${
                isActiveLink('/lookbook') ? 'text-champagne-600 border-b-2 border-champagne-600 pb-1' : 'text-gray-700'
              }`}
            >
              LOOKBOOK
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-champagne-600 ${
                isActiveLink('/about') ? 'text-champagne-600 border-b-2 border-champagne-600 pb-1' : 'text-gray-700'
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-champagne-600 ${
                isActiveLink('/contact') ? 'text-champagne-600 border-b-2 border-champagne-600 pb-1' : 'text-gray-700'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-champagne-600 transition-colors"
              >
                <Search size={18} />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                  <input
                    type="text"
                    placeholder="Search for dresses..."
                    value={state.searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-300 text-sm"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Account - Desktop only */}
            <Link to="/account" className="hidden lg:block p-2 hover:text-champagne-600 transition-colors">
              <User size={18} />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 hover:text-champagne-600 transition-colors relative">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush-pink text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:text-champagne-600 transition-colors relative">
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush-pink text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <nav className="py-4 px-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-champagne-600 font-medium py-2"
              >
                HOME
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-champagne-600 font-medium py-2"
              >
                SHOP
              </Link>
              <Link
                to="/lookbook"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-champagne-600 font-medium py-2"
              >
                LOOKBOOK
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-champagne-600 font-medium py-2"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-champagne-600 font-medium py-2"
              >
                CONTACT
              </Link>
              {/* Account - Mobile only */}
              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-champagne-600 font-medium py-2 border-t border-gray-100 pt-4 mt-4"
              >
                <User size={20} />
                <span>MY ACCOUNT</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}