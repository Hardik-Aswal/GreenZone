"use client"
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { Calendar, TrendingUp, Award, Leaf, Coins, Clock, Target, Users } from 'lucide-react';

interface EcoScoreData {
  day: number;
  ecoscore: number;
  period: string;
}

interface CategoryData {
  category: string;
  purchases: number;
  fullMark: number;
}

interface SaplingData {
  month: string;
  saplings: number;
}

const UserDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'1day' | '1week' | '1month'>('1week');
  const [chartsAnimated, setChartsAnimated] = useState(false);
  const [currentUser] = useState({
    name: "Sujal Chauhan",
    avatar: "👨",
    totalEcoScore: 2847,
    rank: "Eco Champion",
    level: 12
  });

  // Sample EcoScore data for different time periods
  const ecoscoreData = {
    '1day': [
      { day: 1, ecoscore: 145, period: '6 AM' },
      { day: 2, ecoscore: 167, period: '9 AM' },
      { day: 3, ecoscore: 189, period: '12 PM' },
      { day: 4, ecoscore: 203, period: '3 PM' },
      { day: 5, ecoscore: 234, period: '6 PM' },
      { day: 6, ecoscore: 267, period: '9 PM' },
    ],
    '1week': [
      { day: 1, ecoscore: 234, period: 'Mon' },
      { day: 2, ecoscore: 345, period: 'Tue' },
      { day: 3, ecoscore: 287, period: 'Wed' },
      { day: 4, ecoscore: 456, period: 'Thu' },
      { day: 5, ecoscore: 523, period: 'Fri' },
      { day: 6, ecoscore: 398, period: 'Sat' },
      { day: 7, ecoscore: 467, period: 'Sun' },
    ],
    '1month': [
      { day: 1, ecoscore: 1234, period: 'Week 1' },
      { day: 2, ecoscore: 1456, period: 'Week 2' },
      { day: 3, ecoscore: 1678, period: 'Week 3' },
      { day: 4, ecoscore: 1823, period: 'Week 4' },
    ]
  };

  // Purchase category data for radar chart
  const categoryData: CategoryData[] = [
    { category: 'Electronics', purchases: 78, fullMark: 100 },
    { category: 'Fashion', purchases: 92, fullMark: 100 },
    { category: 'Home & Garden', purchases: 65, fullMark: 100 },
    { category: 'Food & Beverage', purchases: 88, fullMark: 100 },
    { category: 'Books', purchases: 45, fullMark: 100 },
    { category: 'Sports', purchases: 67, fullMark: 100 },
    { category: 'Beauty', purchases: 73, fullMark: 100 },
    { category: 'Automotive', purchases: 34, fullMark: 100 },
  ];

  // Sapling earnings over time (saplings are the coins)
  const saplingData: SaplingData[] = [
    { month: 'Jan', saplings: 240 },
    { month: 'Feb', saplings: 380 },
    { month: 'Mar', saplings: 300 },
    { month: 'Apr', saplings: 540 },
    { month: 'May', saplings: 460 },
    { month: 'Jun', saplings: 620 },
  ];

  useEffect(() => {

    const timer = setTimeout(() => {
      setChartsAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-green-200">
          <p className="font-semibold text-gray-800">{`${label}`}</p>
          <p className="text-green-600">
            {`EcoScore: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const RadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-green-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.category}</p>
          <p className="text-green-600">{`Purchases: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl border border-green-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="text-4xl md:text-5xl animate-bounce">{currentUser.avatar}</div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Welcome back, {currentUser.name}! 🌱
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-1">
                  Your eco-journey continues to make a real impact
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {currentUser.rank}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Level {currentUser.level}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-green-600">{currentUser.totalEcoScore.toLocaleString()}</div>
              <div className="text-gray-600">Total EcoScore</div>
              <div className="flex items-center justify-end mt-2 text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% this week</span>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-green-100">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="bg-green-100 p-3 rounded-xl w-fit">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-green-600">47</div>
                <div className="text-gray-600 text-sm">Trees Planted</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-green-100">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="bg-yellow-100 p-3 rounded-xl w-fit">
                <Coins className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-yellow-600">1,240</div>
                <div className="text-gray-600 text-sm">Saplings Earned</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-green-100">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="bg-purple-100 p-3 rounded-xl w-fit">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-purple-600">156</div>
                <div className="text-gray-600 text-sm">Eco Purchases</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-green-100">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="bg-orange-100 p-3 rounded-xl w-fit">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-orange-600">#23</div>
                <div className="text-gray-600 text-sm">Global Rank</div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-green-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                EcoScore Trends
              </h2>
              <div className="flex space-x-2">
                {(['1day', '1week', '1month'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeFilter(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      timeFilter === period
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period === '1day' ? '24H' : period === '1week' ? '7D' : '1M'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ecoscoreData[timeFilter]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="ecoscoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2e7" />
                  <XAxis 
                    dataKey="period" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="ecoscore"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#ecoscoreGradient)"
                    dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#047857' }}
                    animationBegin={0}
                    animationDuration={chartsAnimated ? 1500 : 0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>


          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-green-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-5 h-5 text-purple-600 mr-2" />
              Purchase Categories
            </h2>
            
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={categoryData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9ca3af', fontSize: 8 }}
                  />
                  <Radar
                    name="Purchases"
                    dataKey="purchases"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    animationBegin={0}
                    animationDuration={chartsAnimated ? 1200 : 0}
                  />
                  <Tooltip content={<RadarTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-green-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Coins className="w-5 h-5 text-yellow-600 mr-2" />
              Sapling Earnings Over Time
            </h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={saplingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2e7" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saplings"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#d97706' }}
                    animationBegin={0}
                    animationDuration={chartsAnimated ? 1800 : 0}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-green-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              Recent Achievements
            </h2>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-2xl text-white">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🌳</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Tree Hugger</h3>
                    <p className="text-green-100 text-xs md:text-sm">Planted 50+ trees through purchases</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-4 rounded-2xl text-white">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">♻️</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Eco Warrior</h3>
                    <p className="text-blue-100 text-xs md:text-sm">100% eco-friendly purchases this month</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl text-white">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Community Leader</h3>
                    <p className="text-purple-100 text-xs md:text-sm">Referred 10+ friends to eco-shopping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;