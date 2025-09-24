import { Link } from 'react-router-dom';
import { ChevronRight, Star, Award, Scissors, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import zarizewar1 from "../assets/zarizewar1.jpg";
import mastaaniharyali2 from "../assets/mastaaniharyali2.jpg"
import barfiblush1 from "../assets/barfiblush1.jpg"



export function HomePage() {
  const featuredProducts = products.filter(product => product.isFeatured);
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "HeritageByNN made my wedding day absolutely magical. The craftsmanship and attention to detail was extraordinary.",
      rating: 5,
      occasion: "Wedding"
    },
    {
      id: 2,
      name: "Aisha Khan",
      image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The custom fit was perfect, and the fabric quality exceeded my expectations. Truly luxury bridal wear.",
      rating: 5,
      occasion: "Reception"
    },
    {
      id: 3,
      name: "Neha Patel",
      image: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "I felt like royalty in my HeritageByNN lehenga. The compliments haven't stopped coming!",
      rating: 5,
      occasion: "Mehndi"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.azureofficial.pk/cdn/shop/collections/azure-wedding-edit-collection-2022-collection-banner-1.jpg?v=1742009636"
            alt="Luxury Bridal Wear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-3 sm:mb-4 leading-tight">
              Where Tradition
              <span className="block text-champagne-200">Meets Elegance</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-2">
              Inspired by South Asian heritage, we bring timeless craftsmanship and modern sophistication to every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/shop"
                className="px-6 py-3 bg-champagne-600 text-white font-medium hover:bg-champagne-700 transition-colors rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Explore Collection</span>
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-gray-800 transition-colors rounded-lg"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-serif text-gray-800 mb-2 sm:mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
              Discover our curated selection of exquisite bridal and formal wear
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-12">
            {/* Bridal Collection */}
            <div className="group relative overflow-hidden rounded-lg aspect-[16/9] sm:aspect-[4/5] cursor-pointer">
              <img
                src={zarizewar1}
                alt="Bridal Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                <h3 className="text-lg sm:text-2xl font-serif mb-1 sm:mb-2">Bridal Collection</h3>
                <p className="mb-2 sm:mb-4 opacity-90 text-sm sm:text-base">Timeless elegance for your special day</p>
                <Link
                  to="/shop?category=Bridal"
                  className="inline-flex items-center space-x-2 text-champagne-200 font-medium hover:text-white transition-colors text-sm sm:text-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span>Shop Now</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Formal Wear */}
            <div className="group relative overflow-hidden rounded-lg aspect-[16/9] sm:aspect-[4/5] cursor-pointer">
              <img
                src={barfiblush1}
                alt="Formal Wear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                <h3 className="text-lg sm:text-2xl font-serif mb-1 sm:mb-2">Formal Wear</h3>
                <p className="mb-2 sm:mb-4 opacity-90 text-sm sm:text-base">Sophisticated designs for every occasion</p>
                <Link
                  to="/shop?category=Formal"
                  className="inline-flex items-center space-x-2 text-champagne-200 font-medium hover:text-white transition-colors text-sm sm:text-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span>Shop Now</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Party Wear */}
            <div className="group relative overflow-hidden rounded-lg aspect-[16/9] sm:aspect-[4/5] cursor-pointer sm:block">
              <img
                src={mastaaniharyali2}
                alt="Party Wear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-white">
                <h3 className="text-lg sm:text-2xl font-serif mb-1 sm:mb-2">Party Wear</h3>
                <p className="mb-2 sm:mb-4 opacity-90 text-sm sm:text-base">Contemporary styles for modern celebrations</p>
                <Link
                  to="/shop?category=Party Wear"
                  className="inline-flex items-center space-x-2 text-champagne-200 font-medium hover:text-white transition-colors text-sm sm:text-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span>Shop Now</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HeritageByNN */}
      <section className="py-20 bg-champagne-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">Why Choose HeritageByNN</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the perfect blend of traditional craftsmanship and contemporary design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-champagne-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Luxury Fabrics</h3>
              <p className="text-gray-600">
                Premium silk, velvet, and chiffon sourced from the finest mills
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-champagne-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Hand Embroidery</h3>
              <p className="text-gray-600">
                Exquisite Zardozi, mirror work, and thread embroidery by skilled artisans
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-champagne-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Fit</h3>
              <p className="text-gray-600">
                Personalized tailoring to ensure perfect fit and comfort
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-champagne-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Worldwide Shipping</h3>
              <p className="text-gray-600">
                Secure packaging and reliable delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-serif text-gray-800 mb-2 sm:mb-4">Featured Pieces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
              Handpicked selections from our latest collections
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 border-2 border-champagne-600 text-champagne-600 font-medium hover:bg-champagne-600 hover:text-white transition-colors rounded-lg text-sm sm:text-base"
            >
              <span>View All Products</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-serif text-gray-800 mb-2 sm:mb-4">What Our Brides Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
              Real stories from our beautiful brides
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 italic text-sm sm:text-base">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-champagne-600">{testimonial.occasion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Preview */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-serif text-gray-800 mb-2 sm:mb-4">Lookbook</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
              Get inspired by our styled shoots and real bride moments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Lookbook 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/1447302/pexels-photo-1447302.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Lookbook 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Lookbook 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Lookbook 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/lookbook"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 bg-champagne-600 text-white font-medium hover:bg-champagne-700 transition-colors rounded-lg text-sm sm:text-base"
            >
              <span>View Full Lookbook</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
