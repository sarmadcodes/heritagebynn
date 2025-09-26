import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useApp } from '../contexts/AppContext';
import { Product } from '../contexts/AppContext';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useApp();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories for navigation
  const categories = ['All', 'Bridal', 'Formal', 'Party Wear'];

  // Initialize category from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // featured
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [activeCategory, sortBy, state.searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setActiveCategory('All');
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 py-4 md:px-4 md:py-8">
        {/* Breadcrumb - Hidden on mobile for space */}
        <nav className="mb-4 hidden md:block">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="transition-colors" style={{ '--tw-hover-color': '#3E0309' } as any}>Home</a></li>
            <li>/</li>
            <li className="text-gray-800">Shop</li>
            {activeCategory !== 'All' && (
              <>
                <li>/</li>
                <li style={{ color: '#3E0309' }}>{activeCategory}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-6 text-center md:mb-8">
          <h1 className="text-3xl font-serif mb-4 md:text-5xl md:mb-6" style={{ color: '#3E0309' }}>
            {activeCategory !== 'All' ? activeCategory : 'All Collections'}
          </h1>
          <p className="text-gray-600 text-base mb-6 px-2 md:text-lg md:mb-8 md:px-0">
            Discover our exquisite collection of {activeCategory !== 'All' ? activeCategory.toLowerCase() : 'luxury'} wear
          </p>

          {/* Category Navigation - Mobile optimized */}
          <div className="flex justify-center space-x-4 mb-6 overflow-x-auto md:space-x-8 md:mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-lg font-medium pb-2 border-b-2 transition-colors whitespace-nowrap md:text-xl ${
                  activeCategory === category
                    ? 'border-b-2'
                    : 'text-gray-600 border-transparent hover:opacity-80'
                }`}
                style={activeCategory === category 
                  ? { color: '#3E0309', borderColor: '#3E0309' }
                  : { '--tw-hover-color': '#3E0309', '--tw-hover-border-color': '#3E0309' } as any
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar - Mobile optimized */}
        <div className="bg-white rounded-lg p-3 mb-4 md:p-4 md:mb-6">
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {state.searchQuery && (
                <span> for "{state.searchQuery}"</span>
              )}
              {activeCategory !== 'All' && (
                <span> in {activeCategory}</span>
              )}
            </div>

            <div className="flex items-center justify-between md:space-x-4">
              {/* Sort Dropdown */}
              <div className="relative flex-1 md:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm w-full focus:outline-none focus:ring-2 md:w-auto md:px-4"
                  style={{ '--tw-ring-color': '#3E0309' } as any}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg ml-3 md:ml-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={viewMode === 'grid' ? { backgroundColor: '#3E0309' } : {}}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg transition-colors ${
                    viewMode === 'list'
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={viewMode === 'list' ? { backgroundColor: '#3E0309' } : {}}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - Mobile optimized */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 px-4 md:py-16">
            <p className="text-gray-600 text-base mb-4 md:text-lg">No products found matching your criteria.</p>
            <button
              onClick={clearAllFilters}
              className="font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#3E0309' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid'
              ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={viewMode === 'list' ? 'compact' : 'default'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
