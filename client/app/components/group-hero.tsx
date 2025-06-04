import React, { useState, useEffect } from 'react';
import { MapPin, Users, Package, Leaf, Truck, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DeliveryOption {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
}

const GroupDeliveryBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const deliveryOptions: DeliveryOption[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Delivery",
      description: "Join neighbors in your zip code",
      benefit: "Up to 30% off"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly Packaging",
      description: "100% recyclable materials",
      benefit: "Carbon neutral"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Consolidated Shipping",
      description: "Fewer trips, less emissions",
      benefit: "85% less CO₂"
    }
  ];

  const handleJoinGroup = () => {
    if (zipCode.length >= 5) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className={`w-full bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-teal-500 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-green-400 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {showAlert && (
          <Alert className="mb-6 bg-green-100 border-green-300">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Great! We've added you to the group delivery list for {zipCode}. You'll receive notifications when orders are being consolidated.
            </AlertDescription>
          </Alert>
        )}


        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg animate-pulse">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Group Delivery
              </h1>
              <div className="flex items-center justify-center mt-2">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  NEW
                </span>
                <span className="ml-2 text-lg text-gray-600">Save Money • Save Planet</span>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Join your neighbors for <span className="font-bold text-green-600">group deliveries</span> in your zip code. 
            Get <span className="font-bold text-red-600">amazing discounts</span> while choosing 
            <span className="font-bold text-emerald-600"> eco-friendly packaging</span> options.
          </p>
        </div>


        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl mr-4">
                  🌍
                </span>
                Why Choose Group Delivery?
              </h2>
              
              {deliveryOptions.map((option, index) => (
                <div
                  key={index}
                  className={`mb-6 p-6 rounded-2xl transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{option.title}</h3>
                      <p className={`text-sm mb-2 ${activeStep === index ? 'text-white/90' : 'text-gray-600'}`}>
                        {option.description}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        activeStep === index 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {option.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 text-green-600 mr-3" />
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <span className="text-gray-700">Enter your zip code to find nearby group orders</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <span className="text-gray-700">Join an existing group or start a new one</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <span className="text-gray-700">Choose eco-friendly packaging and enjoy discounts</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="space-y-8">
     
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-green-600 mr-3" />
                Find Your Group
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your Zip Code
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="12345"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      maxLength={6}
                    />
                    <button
                      onClick={handleJoinGroup}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Join</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

    
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center">
               
                <h3 className="text-3xl font-bold mb-2">Up to 30% OFF</h3>
                <p className="text-lg mb-4 text-white/90">Average savings with group delivery</p>
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="text-sm text-white/80 mb-1">This Week's Popular Groups:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white/10 rounded-lg p-2">📍 12345 (8 members)</div>
                    <div className="bg-white/10 rounded-lg p-2">📍 54321 (12 members)</div>
                    <div className="bg-white/10 rounded-lg p-2">📍 67890 (6 members)</div>
                    <div className="bg-white/10 rounded-lg p-2">📍 98765 (15 members)</div>
                  </div>
                </div>
              </div>
            </div>

     
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Leaf className="w-6 h-6 text-green-600 mr-3" />
                Packaging Options
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Recyclable Cardboard</span>
                  </div>
                  <span className="text-green-600 font-semibold">+5% discount</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Biodegradable Materials</span>
                  </div>
                  <span className="text-emerald-600 font-semibold">+8% discount</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-teal-50 rounded-2xl border border-teal-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Reusable Containers</span>
                  </div>
                  <span className="text-teal-600 font-semibold">+12% discount</span>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Groups</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">$2.3M</div>
              <div className="text-gray-600">Total Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">68%</div>
              <div className="text-gray-600">Less Packaging Waste</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">4.8★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDeliveryBanner;