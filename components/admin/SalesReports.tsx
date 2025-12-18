
import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Order, Product, ProductCategory, Language } from '../../types';
import { Calendar, DollarSign, ShoppingBag, TrendingUp, Filter } from 'lucide-react';
import { TRANSLATIONS, formatPrice, EXCHANGE_RATE } from '../../constants';

interface SalesReportsProps {
  orders: Order[];
  products: Product[];
  language: Language;
}

// Helper to generate mock data for demonstration purposes
const generateMockData = (period: 'day' | 'week' | 'month' | 'year') => {
  const data = [];
  
  if (period === 'day') {
    for (let i = 8; i <= 22; i++) {
      data.push({
        name: `${i}:00`,
        revenue: Math.floor(Math.random() * 200) + 50,
        orders: Math.floor(Math.random() * 10) + 1
      });
    }
  } else if (period === 'week') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach(day => {
      data.push({
        name: day,
        revenue: Math.floor(Math.random() * 1500) + 800,
        orders: Math.floor(Math.random() * 50) + 20
      });
    });
  } else if (period === 'month') {
    for (let i = 1; i <= 30; i+=3) {
      data.push({
        name: `Day ${i}`,
        revenue: Math.floor(Math.random() * 2000) + 1000,
        orders: Math.floor(Math.random() * 80) + 30
      });
    }
  } else if (period === 'year') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => {
      data.push({
        name: month,
        revenue: Math.floor(Math.random() * 15000) + 5000,
        orders: Math.floor(Math.random() * 400) + 100
      });
    });
  }
  return data;
};

const COLORS = ['#8a5a4d', '#a77f73', '#e0cec7', '#5e3a32', '#d2bab0', '#6f453b'];

const SalesReports: React.FC<SalesReportsProps> = ({ orders, products, language }) => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const t = TRANSLATIONS[language];

  // Memoized Chart Data
  const chartData = useMemo(() => generateMockData(timeRange), [timeRange]);

  // Calculate Mock Totals for the Cards based on the chart data
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = chartData.reduce((acc, curr) => acc + curr.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  // Chart data wrapper to handle currency conversion locally for display if needed, 
  // but Recharts logic is easier if we just pass raw numbers and format the axis/tooltip.
  // We will assume chartData is in Base Currency (USD) and we just format the output.

  // Category Data
  const categoryData = [
    { name: ProductCategory.HOT_COFFEE, value: 35 },
    { name: ProductCategory.MILK_TEA, value: 25 },
    { name: ProductCategory.PASTRY, value: 15 },
    { name: ProductCategory.FRUIT_TEA, value: 15 },
    { name: ProductCategory.SIGNATURE, value: 10 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-coffee-900">{t.admin_report.title}</h2>
          <p className="text-coffee-600 text-sm">{t.admin_report.subtitle}</p>
        </div>
        
        {/* Time Filter Controls */}
        <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
          {(['day', 'week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                timeRange === range 
                  ? 'bg-coffee-900 text-white shadow-md' 
                  : 'text-coffee-600 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-coffee-800 to-coffee-900 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-coffee-100 font-medium">{t.admin_stats.revenue}</span>
          </div>
          <p className="text-3xl font-serif font-bold">{formatPrice(totalRevenue, language)}</p>
          <p className="text-xs text-coffee-200 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-400" /> +12% {t.admin_report.from_last} {timeRange}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-amber-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-coffee-600 font-medium">{t.admin_stats.orders}</span>
          </div>
          <p className="text-3xl font-serif font-bold text-coffee-900">{totalOrders.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-coffee-600 font-medium">{t.admin_stats.order_value}</span>
          </div>
          <p className="text-3xl font-serif font-bold text-coffee-900">{formatPrice(avgOrderValue, language)}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-coffee-500" />
            {t.admin_report.trends} ({timeRange})
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a77f73" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a77f73" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a5a4d', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a5a4d', fontSize: 12 }}
                  // Roughly format y-axis
                  tickFormatter={(value) => language === 'vi' ? `${(value * EXCHANGE_RATE / 1000000).toFixed(1)}M` : `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [formatPrice(value, language), 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8a5a4d" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-coffee-900 mb-6">{t.admin_report.by_category}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
