import React, { useState } from 'react';
import { Heart, Eye, Share2, Filter } from 'lucide-react';
import sabzsitara1 from "../assets/sabzsitara1.jpg";
import sabzsitara2 from "../assets/sabzsitara2.jpg";
import zarizewar1 from "../assets/zarizewar1.jpg";
import zarizewar2 from "../assets/zarizewar2.jpg";
import mastaaniharyali1 from "../assets/mastaaniharyali1.jpg"
import mastaaniharyali2 from "../assets/mastaaniharyali2.jpg"
import rangeenkhayal1 from "../assets/rangeenkhayal1.jpg"
import rangeenkhayal2 from "../assets/rangeenkhayal2.jpg"
import barfiblush1 from "../assets/barfiblush1.jpg"
import barfiblush2 from "../assets/barfiblush2.jpg"
import rangreza1 from "../assets/rangreza1.jpg"
import rangreza2 from "../assets/rangreza2.jpg"


interface LookbookItem {
  id: string;
  title: string;
  category: string;
  occasion: string;
  image: string;
  description: string;
  tags: string[];
}

const lookbookItems: LookbookItem[] = [
  {
    id: '1',
    title: 'Rangreza',
    category: 'Bridal',
    occasion: 'Wedding',
    image: rangreza2,
    description: 'A stunning red and gold lehenga showcasing traditional Zardozi embroidery',
    tags: ['Traditional', 'Zardozi', 'Red', 'Gold']
  },
  {
    id: '2',
    title: 'Barfi Blush',
    category: 'Formal',
    occasion: 'Reception',
   image: barfiblush2,
    description: 'Contemporary sharara set perfect for modern celebrations',
    tags: ['Modern', 'Rose Gold', 'Sharara', 'Contemporary']
  },
  {
    id: '3',
    title: 'Zari zewar',
    category: 'Bridal',
    occasion: 'Ceremony',
    image: zarizewar1,
    description: 'Timeless ivory ensemble with delicate chikankari work',
    tags: ['Ivory', 'Chikankari', 'Classic', 'Elegant']
  },
  {
    id: '4',
    title: 'Rangeen khayal',
    category: 'Formal',
    occasion: 'Cocktail',
    image: rangeenkhayal1,    description: 'Rich emerald saree with intricate beadwork',
    tags: ['Emerald', 'Beadwork', 'Saree', 'Luxury']
  },
  {
    id: '5',
    title: 'Mastani haryaali',
    category: 'Party Wear',
    occasion: 'Engagement',
    image: mastaaniharyali2,
    description: 'Soft pink gown with floral embellishments',
    tags: ['Pink', 'Floral', 'Romance', 'Gown']
  },
  {
    id: '6',
    title: 'Midnight Navy Glamour',
    category: 'Formal',
    occasion: 'Gala',
    image: 'https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sophisticated navy ensemble with silver accents',
    tags: ['Navy', 'Silver', 'Glamour', 'Evening']
  }
];

export function LookbookPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);

  const categories = ['All', ...Array.from(new Set(lookbookItems.map(item => item.category)))];
  const occasions = ['All', ...Array.from(new Set(lookbookItems.map(item => item.occasion)))];

  const filteredItems = lookbookItems.filter(item => {
    return (selectedCategory === 'All' || item.category === selectedCategory) &&
           (selectedOccasion === 'All' || item.occasion === selectedOccasion);
  });

  const openModal = (item: LookbookItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Mobile optimized */}
      <section className="relative py-12 bg-champagne-50 md:py-20">
        <div className="container mx-auto px-3 text-center md:px-4">
          <h1 className="text-3xl font-serif text-gray-800 mb-4 md:text-5xl">Lookbook</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto px-2 md:text-xl md:px-0">
            Discover our latest collections through stunning styled shoots and real bride moments
          </p>
        </div>
      </section>

      <div className="container mx-auto px-3 py-4 md:px-4 md:py-12">
        {/* Filters - Mobile optimized */}
        <div className="bg-white rounded-lg p-3 shadow-sm mb-4 md:p-6 md:mb-8">
          <div className="flex items-center space-x-4 mb-3 md:mb-4">
            <Filter size={16} className="text-champagne-600 md:w-5 md:h-5" />
            <h3 className="font-medium text-gray-800 text-sm md:text-base">Filter by:</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 md:text-sm md:mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-300 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 md:text-sm md:mb-2">Occasion</label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-300 text-sm"
              >
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid - Updated to match shop page mobile grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Action Buttons - Hidden on mobile, shown on desktop */}
                <div className="absolute top-4 right-4 flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white hover:text-blush-pink transition-colors">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white hover:text-champagne-600 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white hover:text-blue-600 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <span className="bg-champagne-600 text-white px-2 py-1 text-xs font-medium rounded-full md:px-3 md:text-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content - Mobile optimized */}
              <div className="p-3 md:p-6">
                <div className="mb-1 md:mb-2">
                  <span className="text-champagne-600 text-xs font-medium uppercase tracking-wider md:text-sm">
                    {item.occasion}
                  </span>
                </div>
                
                <h3 className="text-sm font-serif text-gray-800 mb-1 group-hover:text-champagne-600 transition-colors md:text-xl md:mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-xs mb-2 line-clamp-2 md:text-sm md:mb-4">
                  {item.description}
                </p>

                {/* Tags - Reduced on mobile */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full md:px-2 md:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full md:px-2 md:py-1">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 px-4 md:py-16">
            <p className="text-gray-600 text-base mb-4 md:text-lg">No items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedOccasion('All');
              }}
              className="text-champagne-600 hover:text-champagne-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Modal - Mobile optimized */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-hidden md:max-h-[90vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors md:top-4 md:right-4"
                >
                  ×
                </button>
              </div>

              {/* Content - Mobile optimized */}
              <div className="p-4 overflow-y-auto md:p-8">
                <div className="mb-3 md:mb-4">
                  <span className="bg-champagne-100 text-champagne-700 px-2 py-1 text-xs font-medium rounded-full md:px-3 md:text-sm">
                    {selectedItem.category}
                  </span>
                </div>

                <h2 className="text-xl font-serif text-gray-800 mb-1 md:text-3xl md:mb-2">{selectedItem.title}</h2>
                
                <div className="text-champagne-600 font-medium mb-3 text-sm md:text-base md:mb-4">
                  Perfect for {selectedItem.occasion}
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base md:mb-6">
                  {selectedItem.description}
                </p>

                {/* Tags */}
                <div className="mb-4 md:mb-6">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base md:mb-3">Style Elements</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-champagne-50 text-champagne-700 text-xs rounded-full border border-champagne-200 md:px-3 md:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions - Mobile optimized */}
                <div className="space-y-2 md:space-y-3">
                  <button className="w-full bg-champagne-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-champagne-700 transition-colors text-sm md:py-3 md:px-6 md:text-base">
                    Shop Similar Styles
                  </button>
                  <button className="w-full border-2 border-champagne-600 text-champagne-600 py-2.5 px-4 rounded-lg font-medium hover:bg-champagne-50 transition-colors text-sm md:py-3 md:px-6 md:text-base">
                    Book Consultation
                  </button>
                  <button className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm">
                    <Share2 size={14} className="md:w-4 md:h-4" />
                    <span>Share this look</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Mobile optimized */}
      <section className="py-12 bg-champagne-600 md:py-16">
        <div className="container mx-auto px-3 text-center md:px-4">
          <h2 className="text-2xl font-serif text-white mb-3 md:text-3xl md:mb-4">Love What You See?</h2>
          <p className="text-champagne-100 text-base mb-6 max-w-2xl mx-auto px-2 md:text-lg md:mb-8 md:px-0">
            Book a consultation with our design team to create your perfect look
          </p>
          <div className="flex flex-col gap-3 justify-center md:flex-row md:gap-4">
            <a
              href="/contact"
              className="px-6 py-2.5 bg-white text-champagne-600 font-medium rounded-lg hover:bg-champagne-50 transition-colors text-sm md:px-8 md:py-3 md:text-base"
            >
              Book Consultation
            </a>
            <a
              href="/shop"
              className="px-6 py-2.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-champagne-600 transition-colors text-sm md:px-8 md:py-3 md:text-base"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}