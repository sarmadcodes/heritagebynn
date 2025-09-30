import React from "react";
import { Link } from 'react-router-dom';
import { Droplets, Wind, Sun, ChevronRight } from "lucide-react";

export const CareInstructionsModal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12 sm:space-y-16">
            {/* Care Options */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Bridal Wear Care Instructions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Preserve the elegance of your HeritageByNN bridal and formal wear with these tailored care tips.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Cleaning</h3>
                  <p className="text-sm sm:text-base text-gray-600">Dry clean or gentle hand wash</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Wind className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Drying</h3>
                  <p className="text-sm sm:text-base text-gray-600">Air dry in shade</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#3E0309' }}>
                    <Sun className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Storage</h3>
                  <p className="text-sm sm:text-base text-gray-600">Store in breathable garment bags</p>
                </div>
              </div>
            </div>

            {/* Fabric-Specific Care */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Fabric & Embellishment Care
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Specialized care for the luxurious fabrics and intricate embellishments in our bridal collections.
              </p>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Silk & Chiffon</h3>
                  <ul className="text-sm sm:text-base text-gray-700 space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Dry clean recommended to protect delicate fibers
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> If hand washing, use cold water and mild detergent
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Air dry in shade to prevent color fading
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Iron on low heat with a pressing cloth to avoid damage
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Velvet</h3>
                  <ul className="text-sm sm:text-base text-gray-700 space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Dry clean only to maintain texture and sheen
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Avoid water to prevent crushing the pile
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Store flat or hang with care to avoid creasing
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Use a steamer for minor wrinkles, not an iron
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Zari & Embroidered Work</h3>
                  <ul className="text-sm sm:text-base text-gray-700 space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Dry clean to protect delicate threads and embellishments
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Avoid rubbing or scrubbing to prevent damage to zari or beads
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Wrap in acid-free tissue paper before storing
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span> Store away from direct sunlight to prevent tarnishing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* General Tips */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                General Tips
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Best practices for maintaining the beauty of your bridal and formal wear.
              </p>
              <ul className="text-sm sm:text-base text-gray-700 space-y-2 max-w-3xl mx-auto">
                <li className="flex items-start">
                  <span className="mr-2">•</span> Always check the care label on your garment
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Avoid direct contact with perfumes or oils to prevent staining
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Spot clean stains immediately with a damp cloth
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Use padded hangers for delicate garments like sarees and lehengas
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Store in breathable garment bags to prevent moisture buildup
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Avoid folding heavily embroidered pieces to prevent creasing
                </li>
              </ul>
            </div>

            {/* Eco-Friendly Tips */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: '#3E0309' }}>Eco-Friendly Tips</h3>
              <ul className="text-sm sm:text-base text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span> Opt for dry cleaning only when necessary to reduce chemical use
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Use cold water for hand washing to save energy
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Air dry in shade to extend garment life and save energy
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Choose eco-friendly dry cleaners in Pakistan, Canada, or the US
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
