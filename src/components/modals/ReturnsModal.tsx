import React from "react";
import { Link } from 'react-router-dom';
import { RotateCcw, Package, ChevronRight } from "lucide-react";

export const ReturnsModal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12 sm:space-y-16">
            {/* Return Options */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Returns & Exchanges
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Our hassle-free return and exchange process ensures your satisfaction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <RotateCcw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>30-Day Returns</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Easy returns within 30 days of purchase
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Free Return Shipping</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    We provide prepaid return labels in Pakistan, Canada, and the US
                  </p>
                </div>
              </div>
            </div>

            {/* Return Policy */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Return Policy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Everything you need to know about returning your HeritageByNN purchase.
              </p>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Return Window:</strong> 30 days from delivery date
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Condition:</strong> Items must be unworn, unwashed, and in original condition with tags attached
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Final Sale Items:</strong> Personalized items are final sale
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Refund Processing:</strong> 5-10 business days after we receive your return
                </p>
              </div>
            </div>

            {/* Exchange Policy */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Exchange Policy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Flexible exchanges to ensure you get the perfect item.
              </p>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Size/Color Exchanges:</strong> Available within 30 days
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Price Differences:</strong> You'll be charged/refunded the difference
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Availability:</strong> Exchanges subject to stock availability
                </p>
              </div>
            </div>

            {/* How to Return */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                How to Return
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Follow these simple steps to return or exchange your order.
              </p>
              <ol className="list-decimal list-inside space-y-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                <li>Email us at returns@heritagebynn.com with your order number</li>
                <li>We'll send you a prepaid return label within 24 hours (Pakistan, Canada, US)</li>
                <li>Package items securely with original tags</li>
                <li>Drop off at any postal location or schedule pickup</li>
                <li>Track your return with the provided tracking number</li>
              </ol>
            </div>

            {/* Holiday Policy */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Holiday Policy</h3>
              <p className="text-sm sm:text-base text-gray-700">
                <strong className="font-semibold" style={{ color: '#3E0309' }}>Extended Returns:</strong> Items purchased between November 15 - December 31 can be returned until January 31 of the following year in Pakistan, Canada, and the US.
              </p>
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
