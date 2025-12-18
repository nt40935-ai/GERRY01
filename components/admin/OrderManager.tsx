
import React from 'react';
import { Order, OrderStatus, Language } from '../../types';
import { Clock, CheckCircle, XCircle, Loader, Coffee } from 'lucide-react';
import { TRANSLATIONS, formatPrice } from '../../constants';

interface OrderManagerProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  language: Language;
}

const OrderManager: React.FC<OrderManagerProps> = ({ orders, onUpdateStatus, language }) => {
  const t = TRANSLATIONS[language];
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Processing': return <Loader className="w-4 h-4 animate-spin" />;
      case 'Ready': return <Coffee className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_order.title}</h2>
        <div className="text-sm text-coffee-500">
          {t.admin_order.showing} {orders.length} {t.admin_nav.orders.toLowerCase()}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_order.id}</th>
              <th className="p-4">{t.admin_order.customer}</th>
              <th className="p-4">{t.admin_order.date}</th>
              <th className="p-4">{t.admin_order.items}</th>
              <th className="p-4">{t.admin_order.total}</th>
              <th className="p-4">{t.admin_order.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-xs text-coffee-600">#{order.id}</td>
                <td className="p-4 font-medium text-coffee-900">{order.customerName}</td>
                <td className="p-4 text-sm text-coffee-600">{order.date}</td>
                <td className="p-4 text-sm text-coffee-600">{order.itemsCount}</td>
                <td className="p-4 font-bold text-coffee-900">{formatPrice(order.total, language)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                    <select 
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className="ml-2 text-xs border border-gray-200 rounded p-1 focus:ring-1 focus:ring-amber-500 bg-white"
                    >
                      {['Pending', 'Processing', 'Ready', 'Completed', 'Cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;
