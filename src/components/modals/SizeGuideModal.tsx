import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SizeGuideModal(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12 sm:space-y-16">
            {/* Women's Clothing Size Chart */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                Women's Clothing Size Chart
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Use our size chart to find the perfect fit for your HeritageByNN garment.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base font-semibold" style={{ color: '#3E0309' }}>
                        Size
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base font-semibold" style={{ color: '#3E0309' }}>
                        Bust (inches)
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base font-semibold" style={{ color: '#3E0309' }}>
                        Waist (inches)
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base font-semibold" style={{ color: '#3E0309' }}>
                        Hip (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">XS</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">32-34</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">24-26</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">34-36</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">S</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">34-36</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">26-28</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">36-38</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">M</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">36-38</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">28-30</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">38-40</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">L</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">38-41</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">30-33</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">40-43</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">XL</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">41-44</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">33-36</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">43-46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Measure */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-center" style={{ color: '#3E0309' }}>
                How to Measure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-center mb-8 px-2">
                Follow these steps to measure yourself accurately for the best fit.
              </p>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Bust:</strong> Measure around the fullest part of your bust with arms relaxed at sides.
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: '#3E0309' }}>Hip:</strong> Stand with feet together and measure around the fullest part of your hips.
                </p>
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-3xl mx-auto">
              <p className="text-sm sm:text-base text-gray-600">
                <strong className="font-semibold" style={{ color: '#3E0309' }}>Note:</strong> Measurements are in inches. For the best fit, we recommend measuring yourself or a similar garment that fits you well. If you're between sizes, we generally recommend sizing up.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8 sm:mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 border-2 font-medium transition-colors rounded-lg text-sm sm:text-base hover:text-white"
                style={{ 
                  borderColor: '#3E0309', 
                  color: '#3E0309'
                }}
              >
                <span>Book a Fitting Appointment</span>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
