import { useState } from 'react';
import Header from '../components/Header';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
     <Header />
     
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          />
        </div>

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-10 transform hover:scale-110 transition-transform duration-300">
              <div className="relative inline-block">
                <span className="text-6xl sm:text-7xl">🌍</span>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-emerald-500 text-xl">🔍</span>
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
              About GlobalVita
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl md:max-w-3xl">
              Your window to the world's nations and cultures
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
              {[
                { value: '195+', label: 'Countries' },
                { value: '1000+', label: 'Data Points' },
                { value: '24/7', label: 'Accessibility' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/90 p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-emerald-700 text-sm font-semibold mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-700 mb-6">
            One World. One Platform.
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-12">
            GlobalVita was founded to make the world's cultures, facts, and stories beautifully accessible —
            empowering global understanding through data, design, and discovery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {[
              {
                icon: '🔍',
                title: 'Accuracy & Reliability',
                text: 'Verified, current data from trusted global sources.',
              },
              {
                icon: '🌱',
                title: 'Accessibility for All',
                text: 'A platform for every learner, traveler, and dreamer.',
              },
              {
                icon: '🤝',
                title: 'Global Understanding',
                text: 'Fostering empathy by exploring diverse cultures.',
              },
              {
                icon: '⚡',
                title: 'Innovation',
                text: 'Interactive tools and visuals that make exploration fun.',
              },
            ].map(({ icon, title, text }, idx) => (
              <div
                key={idx}
                className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl sm:text-3xl mr-4">{icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-700">{title}</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Explore Our World?</h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start your journey with GlobalVita today and discover fascinating facts about countries around the globe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-shadow duration-300">
              Search Countries
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Custom styling */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
