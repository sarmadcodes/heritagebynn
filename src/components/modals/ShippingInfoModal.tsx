
import React from "react";
import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, ChevronRight } from "lucide-react";

export const ShippingInfoModal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12 sm:space-y-16">
            {/* Delivery Options */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Delivery Options
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Choose the shipping method that best suits your needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Standard Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-600">5-7 business days</p>
                  <p className="text-sm sm:text-base font-medium" style={{ color: '#3E0309' }}>PKR 500</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Express Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-600">2-3 business days</p>
                  <p className="text-sm sm:text-base font-medium" style={{ color: '#3E0309' }}>PKR 1,200</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Local Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-600">Same day (selected areas in Pakistan)</p>
                  <p className="text-sm sm:text-base font-medium" style={{ color: '#3E0309' }}>PKR 1,500</p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Shipping Information
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Everything you need to know about our shipping process.
              </p>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Free Shipping:</strong> On orders over PKR 10,000 within Pakistan
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Processing Time:</strong> 1-2 business days before shipment
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>International Shipping:</strong> Available to Canada and the US (additional fees apply)
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Tracking:</strong> You'll receive a tracking number once your order ships
                </p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Important Notes</h3>
              <ul className="text-sm sm:text-base text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span> Orders placed after 2 PM PKT ship the next business day
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> No weekend or holiday shipping
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Rural areas in Pakistan, Canada, or the US may require additional delivery time
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8 sm:mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 border-2 font-medium transition-colors rounded-lg text-sm sm:text-base hover:text-white"
                style={{ 
                  borderColor: '#3E0309', 
                  color: '#3E0309'
                }}
              >
                <span>Explore Collection</span>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
