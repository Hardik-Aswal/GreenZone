import React, { useState, useEffect } from 'react';
import { Trophy, Leaf, Share2, Users, MapPin, BarChart3, Camera } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const GreenForestHero: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const features: Feature[] = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Milestone Tree Planting",
      description: "Reach 1000 GreenScore points and we'll plant a real tree in your name in Assam, India! 🌿",
      color: "from-emerald-400 to-green-600"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Digital Forest Dashboard",
      description: "Watch your personal forest grow with GPS locations, species data, and CO₂ impact tracking.",
      color: "from-blue-400 to-cyan-600"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Sharing & QR Codes",
      description: "Share your tree certificates and invite friends to join the green revolution together.",
      color: "from-purple-400 to-pink-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('animate-pulse');
      setTimeout(() => setAnimationClass(''), 500);
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
 
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-300 rounded-full opacity-20 animate-bounce delay-75"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-bounce delay-150"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-bounce delay-300"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
     
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <Leaf className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="ml-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              GreenForest
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform your shopping into <span className="font-bold text-green-600">real environmental impact</span>. 
            Every purchase plants trees, every milestone grows forests.
          </p>
        </div>


        <div className="grid lg:grid-cols-2 gap-12 items-center">
    
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl mr-4">
                  🌱
                </span>
                How It Works
              </h2>
              
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`mb-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  } ${index === activeFeature ? animationClass : ''}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index ? 'bg-white/20' : 'bg-white'
                    }`}>
                    
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className={`${activeFeature === index ? 'text-white/90' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">🥉</div>
                <div className="text-sm text-gray-600">Bronze Level</div>
                <div className="text-lg font-bold text-gray-800">1 Tree</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-gray-500 mb-2">🥈</div>
                <div className="text-sm text-gray-600">Silver Level</div>
                <div className="text-lg font-bold text-gray-800">5 Trees</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-yellow-500 mb-2">🥇</div>
                <div className="text-sm text-gray-600">Gold Level</div>
                <div className="text-lg font-bold text-gray-800">25 Trees</div>
              </div>
            </div>
          </div>

      
          <div className="space-y-8">
  
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Your Forest Dashboard</h3>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl mb-2 animate-bounce" style={{animationDelay: `${i * 0.1}s`}}>
                        🌲
                      </div>
                      <div className="text-xs text-gray-600">Tree {i + 1}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Total Impact</div>
                      <div className="text-2xl font-bold">142.5 kg CO₂</div>
                    </div>
                    <MapPin className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>
            </div>

           
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-dashed border-green-300 text-center">
              <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Additional Visual Content</h3>
              <p className="text-gray-600">Space reserved for your additional image showcase</p>
            </div>

        
            <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Planting? 🌱</h3>
              <p className="mb-6 text-green-50">Join thousands of eco-warriors making a real difference with every purchase.</p>
              <button className="bg-white cursor-pointer text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-colors duration-200 shadow-lg">
                Start Your Green Journey
              </button>
            </div>
          </div>
        </div>

 
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">25K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">1.2M kg</div>
              <div className="text-gray-600">CO₂ Offset</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">15</div>
              <div className="text-gray-600">Forest Locations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenForestHero;