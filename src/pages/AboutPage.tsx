import { Award, Users, Globe, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20" style={{ backgroundColor: '#fdf2f8' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-serif mb-6" style={{ color: '#3E0309' }}>Our Heritage Story</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over a decade, HeritageByNN has been crafting timeless bridal elegance, 
              blending traditional techniques with contemporary design to create unforgettable moments.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Heritage Craftsmanship"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6" style={{ color: '#3E0309' }}>Where Elegance Meets Forever</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a passion for preserving traditional craftsmanship while embracing modern aesthetics, 
                  HeritageByNN has become synonymous with luxury bridal wear that tells a story.
                </p>
                <p>
                  Every piece in our collection is meticulously crafted by skilled artisans who have inherited 
                  centuries-old techniques. From the finest silk to intricate Zardozi embroidery, we source only 
                  the most premium materials to ensure each garment is a masterpiece.
                </p>
                <p>
                  Our journey began with a simple belief: every bride deserves to feel like royalty on her special day. 
                  This philosophy continues to guide us as we create contemporary designs that honor heritage and tradition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: '#fdf2f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4" style={{ color: '#3E0309' }}>Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3E0309' }}>
                <Award size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3E0309' }}>Excellence</h3>
              <p className="text-gray-600">
                Uncompromising quality in every stitch, every detail, every creation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3E0309' }}>
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3E0309' }}>Heritage</h3>
              <p className="text-gray-600">
                Preserving traditional craftsmanship while embracing modern innovation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3E0309' }}>
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3E0309' }}>Personalization</h3>
              <p className="text-gray-600">
                Every bride is unique, and her dress should reflect her individual story
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3E0309' }}>
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#3E0309' }}>Sustainability</h3>
              <p className="text-gray-600">
                Ethical practices and sustainable materials for a better tomorrow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6" style={{ color: '#3E0309' }}>Artisan Craftsmanship</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Our atelier is home to master craftsmen who have dedicated their lives to perfecting 
                  the art of luxury fashion. Each piece begins as a vision and transforms through 
                  countless hours of meticulous handwork.
                </p>
                <p>
                  From hand-cut silhouettes to intricate embroidery, every detail is executed with 
                  precision and passion. Our artisans use time-honored techniques passed down through 
                  generations, ensuring authenticity in every creation.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: '#3E0309' }}>500+</div>
                  <div className="text-sm text-gray-600">Hours per piece</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: '#3E0309' }}>50+</div>
                  <div className="text-sm text-gray-600">Skilled artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: '#3E0309' }}>1000+</div>
                  <div className="text-sm text-gray-600">Happy brides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: '#3E0309' }}>12+</div>
                  <div className="text-sm text-gray-600">Years of excellence</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artisan at work"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4" style={{ color: '#3E0309' }}>Behind the Scenes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A glimpse into our atelier where magic happens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Design Process"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Design Process</h3>
              <p className="text-gray-600">
                From initial sketches to final fittings, every design is carefully curated
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Hand Embroidery"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Hand Embroidery</h3>
              <p className="text-gray-600">
                Intricate Zardozi and thread work that brings each piece to life
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1447302/pexels-photo-1447302.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Quality Check"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Quality Assurance</h3>
              <p className="text-gray-600">
                Multiple quality checks ensure perfection in every garment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4" style={{ color: '#3E0309' }}>Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The passionate individuals behind HeritageByNN
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Founder"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Nisha Narayan</h3>
              <p className="font-medium mb-2" style={{ color: '#3E0309' }}>Founder & Creative Director</p>
              <p className="text-gray-600 text-sm">
                With over 15 years in luxury fashion, Nisha brings vision and passion to every creation.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Head Designer"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Priya Sharma</h3>
              <p className="font-medium mb-2" style={{ color: '#3E0309' }}>Head Designer</p>
              <p className="text-gray-600 text-sm">
                Priya's innovative designs blend traditional techniques with contemporary aesthetics.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Master Craftsman"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#3E0309' }}>Rajesh Kumar</h3>
              <p className="font-medium mb-2" style={{ color: '#3E0309' }}>Master Craftsman</p>
              <p className="text-gray-600 text-sm">
                With 25+ years of experience, Rajesh leads our team of skilled artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#3E0309' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Let us create something extraordinary for your special day. Book a consultation with our design team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              style={{ color: '#3E0309' }}
            >
              Book Appointment
            </a>
            <a
              href="/shop"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white transition-colors rounded-lg group"
              style={{ '--tw-hover-color': '#3E0309' } as any}
            >
              Explore Collection
            </a>
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
