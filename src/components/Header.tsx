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
    <header className="backdrop-blur-md sticky top-0 z-50 border-b border-white/20" style={{ backgroundColor: '#3E0309' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        
        .logo-font {
          font-family: 'Caveat', cursive;
          font-weight: 600;
        }
        
        .hover-underline {
          position: relative;
          overflow: hidden;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background-color: white;
          transition: left 0.3s ease;
        }
        .hover-underline:hover::after {
          left: 0;
        }
      `}</style>
      {/* Top Banner */}
      <div className="bg-white/10 text-white text-center py-2 text-xs sm:text-sm">
        Free shipping on orders above Rs 8,000
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 sm:h-20">
          {/* Left: Mobile Menu Button + Search Button (Mobile) + Desktop Logo */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Mobile Search Button */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white hover-underline transition-colors"
              >
                <Search size={18} />
              </button>
              
              {isSearchOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-50">
                  <input
                    type="text"
                    placeholder="Search for dresses..."
                    value={state.searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-sm"
                    autoFocus
                  />
                </div>
              )}
            </div>
            
            {/* Desktop Logo - Left side */}
            <Link to="/" className="hidden lg:flex items-center space-x-2">
              <div className="text-center">
                <div className="text-4xl text-white tracking-wide logo-font">
                  Heritage
                </div>
                <div className="text-lg text-white -mt-3 logo-font tracking-wider">
                  By NN
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Logo - Center */}
          <Link to="/" className="lg:hidden flex-1 flex justify-center">
            <div className="text-center">
              <div className="text-2xl text-white tracking-wide logo-font">
                Heritage
              </div>
              <div className="text-sm text-white -mt-2 logo-font tracking-wider">
                By NN
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover-underline ${
                isActiveLink('/') ? 'text-white border-b-2 border-white pb-1' : 'text-white'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors hover-underline ${
                isActiveLink('/shop') ? 'text-white border-b-2 border-white pb-1' : 'text-white'
              }`}
            >
              NEW ARRIVAL
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover-underline ${
                isActiveLink('/about') ? 'text-white border-b-2 border-white pb-1' : 'text-white'
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover-underline ${
                isActiveLink('/contact') ? 'text-white border-b-2 border-white pb-1' : 'text-white'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white hover-underline transition-colors"
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
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-sm"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Account - Desktop only */}
            <Link to="/account" className="hidden lg:block p-2 text-white hover-underline transition-colors">
              <User size={18} />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-white hover-underline transition-colors relative">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush-pink text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-white hover-underline transition-colors relative">
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
                className="block text-gray-700 font-medium py-2"
                style={{ '--tw-hover-color': '#3E0309' } as any}
              >
                HOME
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 font-medium py-2"
                style={{ '--tw-hover-color': '#3E0309' } as any}
              >
                SHOP
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 font-medium py-2"
                style={{ '--tw-hover-color': '#3E0309' } as any}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 font-medium py-2"
                style={{ '--tw-hover-color': '#3E0309' } as any}
              >
                CONTACT
              </Link>
              {/* Account - Mobile only */}
              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 font-medium py-2 border-t border-gray-100 pt-4 mt-4"
                style={{ '--tw-hover-color': '#3E0309' } as any}
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
