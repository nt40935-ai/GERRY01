
import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Order, Product, ProductCategory, Language } from '../../../types';
import { Calendar, DollarSign, ShoppingBag, TrendingUp, Filter } from 'lucide-react';
import { TRANSLATIONS, formatPrice, EXCHANGE_RATE } from '../../../constants';

interface SalesReportsProps {
  orders: Order[];
  products: Product[];
  language: Language;
}

// Helper to generate mock data for demonstration purposes (Charts only)
const generateMockData = (period: 'day' | 'week' | 'month' | 'year', _selectedDate?: string) => {
  const data = [];
  
  if (period === 'day') {
    for (let i = 0; i < 24; i++) {
      const hourLabel = `${String(i).padStart(2, '0')}:00`;
      let baseRevenue = 0;
      let baseOrders = 0;
      
      if ((i >= 7 && i <= 10) || (i >= 17 && i <= 20)) {
         baseRevenue = Math.floor(Math.random() * 200) + 100;
         baseOrders = Math.floor(Math.random() * 15) + 5;
      } else if (i >= 12 && i <= 14) {
         baseRevenue = Math.floor(Math.random() * 150) + 50;
         baseOrders = Math.floor(Math.random() * 10) + 2;
      } else if (i >= 1 && i <= 5) {
         baseRevenue = Math.floor(Math.random() * 20); 
         baseOrders = Math.floor(Math.random() * 2);
      } else {
         baseRevenue = Math.floor(Math.random() * 80) + 20;
         baseOrders = Math.floor(Math.random() * 5) + 1;
      }

      data.push({
        name: hourLabel,
        revenue: baseRevenue,
        orders: baseOrders
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
    for (let i = 1; i <= 30; i+=1) { 
      data.push({
        name: `D${i}`,
        revenue: Math.floor(Math.random() * 1000) + 300,
        orders: Math.floor(Math.random() * 40) + 10
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

const SalesReports: React.FC<SalesReportsProps> = ({ orders, products: _products, language }) => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const t = TRANSLATIONS[language];

  // Localized helper labels for summary cards
  const summaryLabels = {
    allTime: language === 'vi' ? 'Doanh thu toàn thời gian' : 'All time earnings',
    validOrders: language === 'vi' ? 'Đơn hợp lệ (không bị hủy)' : 'Valid orders (non-cancelled)',
    avgPerOrder: language === 'vi' ? 'Giá trị trung bình mỗi đơn' : 'Average per order',
  };

  // Memoized Chart Data (Still Simulated for MVP visuals)
  const chartData = useMemo(() => generateMockData(timeRange, selectedDate), [timeRange, selectedDate]);

  // --- REAL DATA CALCULATION FOR SUMMARY CARDS ---
  // Filter out cancelled orders
  const validOrders = orders.filter(o => o.status !== 'Cancelled');
  const realTotalRevenue = validOrders.reduce((acc, order) => acc + order.total, 0);
  const realTotalOrders = validOrders.length;
  const realAvgOrderValue = realTotalOrders > 0 ? realTotalRevenue / realTotalOrders : 0;

  // Category Data (Simulation for now, as calculating this requires parsing all items history)
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
        
        <div className="flex gap-2">
           {timeRange === 'day' && (
             <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center">
                <Calendar className="w-4 h-4 text-coffee-500 ml-2" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 py-1 text-sm text-coffee-800 outline-none"
                />
             </div>
           )}

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
      </div>

      {/* Summary Cards - CONNECTED TO REAL DATA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-coffee-700 font-medium">{t.admin_stats.revenue}</span>
          </div>
          <p className="text-3xl md:text-4xl font-semibold text-coffee-900 tracking-tight">
            {formatPrice(realTotalRevenue, language)}
          </p>
          <div className="text-xs text-coffee-500 mt-3 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" /> 
            <span>{summaryLabels.allTime}</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-coffee-700 font-medium">{t.admin_stats.orders}</span>
          </div>
          <p className="text-3xl md:text-4xl font-semibold text-coffee-900 tracking-tight">
            {realTotalOrders.toLocaleString()}
          </p>
          <div className="text-xs text-coffee-500 mt-3">{summaryLabels.validOrders}</div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-coffee-700 font-medium">{t.admin_stats.order_value}</span>
          </div>
          <p className="text-3xl md:text-4xl font-semibold text-coffee-900 tracking-tight">
            {formatPrice(realAvgOrderValue, language)}
          </p>
          <div className="text-xs text-coffee-500 mt-3">{summaryLabels.avgPerOrder}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-coffee-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-coffee-500" />
              {t.admin_report.trends}
            </h3>
            {timeRange === 'day' && <span className="text-xs text-coffee-500 bg-gray-100 px-2 py-1 rounded">24 Hour Simulated View</span>}
          </div>
          
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
                  tick={{ fill: '#8a5a4d', fontSize: 10 }}
                  interval={timeRange === 'day' ? 3 : 0} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8a5a4d', fontSize: 12 }}
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
                  {categoryData.map((_entry, index) => (
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