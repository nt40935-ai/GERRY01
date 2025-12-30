
import React, { useState } from 'react';
import { Order, OrderStatus, Language } from '../../../types';
import { Clock, CheckCircle, XCircle, Loader, Coffee, ChevronDown, ChevronUp, MessageSquare, Calendar, StickyNote, Printer, X } from 'lucide-react';
import { TRANSLATIONS, formatPrice, calculateItemPrice } from '../../../constants';

interface OrderManagerProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  language: Language;
  sizeLPrice: number; // Size L upcharge price
}

const OrderManager: React.FC<OrderManagerProps> = ({ orders, onUpdateStatus, language, sizeLPrice }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(''); // For filtering by date
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null); // For invoice preview
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

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handlePrintPreview = (order: Order) => {
    setPreviewOrder(order);
  };

  const handleClosePreview = () => {
    setPreviewOrder(null);
  };

  const handlePrintInvoice = (order: Order) => {
    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) return;

    const itemsHtml = order.items.map(item => {
        const itemTotal = calculateItemPrice(item, undefined, undefined, sizeLPrice) * item.quantity;
        const toppingsHtml = item.toppings && item.toppings.length > 0 
            ? `<div class="toppings">+ ${item.toppings.map(t => t.name).join(', ')}</div>` 
            : '';
        const noteHtml = item.note ? `<div class="note">Note: ${item.note}</div>` : '';
        const sizeHtml = item.size ? `(${item.size})` : '';

        return `
            <div class="item">
                <div class="item-row">
                    <span class="qty">${item.quantity}x</span>
                    <span class="name">${item.name} ${sizeHtml}</span>
                    <span class="price">${formatPrice(itemTotal, language)}</span>
                </div>
                ${toppingsHtml}
                ${noteHtml}
            </div>
        `;
    }).join('');

    const htmlContent = `
        <html>
        <head>
            <title>Order #${order.id}</title>
            <style>
                body { font-family: 'Courier New', monospace; font-size: 12px; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 1px dashed #000; padding-bottom: 10px; }
                .brand { font-size: 18px; font-weight: bold; margin: 0; }
                .info { margin-bottom: 15px; }
                .info p { margin: 2px 0; }
                .items { border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
                .item { margin-bottom: 8px; }
                .item-row { display: flex; justify-content: space-between; }
                .qty { font-weight: bold; margin-right: 5px; }
                .name { flex: 1; }
                .price { font-weight: bold; }
                .toppings, .note { font-size: 10px; color: #555; margin-left: 20px; font-style: italic; }
                .total { text-align: right; font-size: 16px; font-weight: bold; margin-top: 10px; }
                .footer { text-align: center; margin-top: 20px; font-size: 10px; }
                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <p class="brand">GERRY COFFEE</p>
                <p>Receipt / Hóa Đơn</p>
            </div>
            <div class="info">
                <p>Order ID: <strong>#${order.id}</strong></p>
                <p>Date: ${order.date}</p>
                <p>Customer: ${order.customerName}</p>
                <p>Phone: ${order.userId ? 'Registered' : 'Guest'}</p>
            </div>
            <div class="items">
                ${itemsHtml}
            </div>
            <div class="total">
                Total: ${formatPrice(order.total, language)}
            </div>
            ${order.note ? `<div style="margin-top:10px; border:1px solid #000; padding:5px;"><strong>Note:</strong> ${order.note}</div>` : ''}
            <div class="footer">
                <p>Thank you for your order!</p>
                <p>Wifi: gerrycoffee / 12345678</p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (!selectedDate) return true;
    return order.date === selectedDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-coffee-900">{t.admin_order.title}</h2>
           <div className="text-sm text-coffee-500">
             {t.admin_order.showing} {filteredOrders.length} {t.admin_nav.orders.toLowerCase()}
           </div>
        </div>
        
        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
           <Calendar className="w-4 h-4 text-coffee-500" />
           <input 
             type="date" 
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="text-sm text-coffee-700 outline-none"
           />
           {selectedDate && (
             <button onClick={() => setSelectedDate('')} className="text-xs text-red-500 hover:underline">
               Clear
             </button>
           )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4">{t.admin_order.id}</th>
              <th className="p-4">{t.admin_order.customer}</th>
              <th className="p-4">{t.admin_order.date}</th>
              <th className="p-4">{t.admin_order.items}</th>
              <th className="p-4">{t.admin_order.total}</th>
              <th className="p-4">{t.admin_order.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
               <tr>
                 <td colSpan={7} className="p-8 text-center text-gray-400 italic">
                   No orders found for this period.
                 </td>
               </tr>
            ) : (
              filteredOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr 
                    onClick={() => toggleExpand(order.id)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedOrderId === order.id ? 'bg-amber-50/50' : ''}`}
                  >
                    <td className="p-4">
                      <button className="text-coffee-400">
                        {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 font-mono text-xs text-coffee-600">#{order.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-coffee-900">{order.customerName}</div>
                      {order.userId && <div className="text-[10px] text-coffee-400">Registered</div>}
                    </td>
                    <td className="p-4 text-sm text-coffee-600">{order.date}</td>
                    <td className="p-4 text-sm text-coffee-600">{order.itemsCount}</td>
                    <td className="p-4 font-bold text-coffee-900">{formatPrice(order.total, language)}</td>
                    <td className="p-4" onClick={e => e.stopPropagation()}>
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
                  {/* Expanded Details Row */}
                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={7} className="p-6 border-b border-gray-100">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                <h4 className="text-sm font-bold text-coffee-900 uppercase tracking-wide">Order Details</h4>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handlePrintPreview(order); }}
                                  className="flex items-center gap-2 bg-coffee-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors shadow-sm"
                                >
                                  <Printer className="w-3 h-3" />
                                  {t.admin_order.print}
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                              {/* Customer Info (Detailed) */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4 pb-4 border-b border-gray-100">
                                  <div>
                                    <span className="text-gray-500 block">Delivery Address</span>
                                    <span className="text-coffee-800 font-medium">{order.address || 'N/A'}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">Payment Method</span>
                                    <span className="text-coffee-800 uppercase font-medium">{order.paymentMethod || 'N/A'}</span>
                                  </div>
                                  {order.note && (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-yellow-50 p-2 rounded border border-yellow-100">
                                      <span className="text-yellow-700 block text-xs font-bold mb-1 flex items-center gap-1">
                                        <StickyNote className="w-3 h-3" /> Order Note
                                      </span>
                                      <span className="text-coffee-800 italic">{order.note}</span>
                                    </div>
                                  )}
                              </div>

                              {/* Items List */}
                              <div className="space-y-2">
                                  {order.items && order.items.length > 0 ? (
                                    order.items.map((item, idx) => {
                                      // Use helper
                                      const itemPrice = calculateItemPrice(item, undefined, undefined, sizeLPrice);
                                      
                                      return (
                                        <div key={idx} className="flex justify-between items-start p-2 bg-gray-50 rounded">
                                          <div className="flex gap-3">
                                              <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden">
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                              </div>
                                              <div>
                                                <p className="text-sm font-bold text-coffee-900">
                                                  {item.name} <span className="text-amber-600">x{item.quantity}</span>
                                                </p>
                                                <div className="flex flex-col gap-1 text-xs text-gray-500 mt-1">
                                                    <div className="flex gap-2">
                                                      {item.size && <span className="bg-white border px-1 rounded">Size: {item.size}</span>}
                                                      {item.note && (
                                                        <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1 rounded">
                                                          <MessageSquare className="w-3 h-3" /> {item.note}
                                                        </span>
                                                      )}
                                                    </div>
                                                    {item.toppings && item.toppings.length > 0 && (
                                                       <span className="text-purple-700 italic">+ {item.toppings.map(t => t.name).join(', ')}</span>
                                                    )}
                                                </div>
                                              </div>
                                          </div>
                                          <div className="text-sm font-medium text-coffee-900">
                                              {formatPrice(itemPrice * item.quantity, language)}
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <p className="text-sm text-gray-400 italic">No item details available for this order.</p>
                                  )}
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Preview Modal */}
      {previewOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-coffee-50">
              <h3 className="text-xl font-bold text-coffee-900">
                {language === 'vi' ? 'Xem Trước Hóa Đơn' : 'Invoice Preview'}
              </h3>
              <button 
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-coffee-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="flex-1 overflow-y-auto p-8" id="invoice-preview">
              <div className="max-w-md mx-auto" style={{ fontFamily: "'Courier New', monospace", fontSize: '12px' }}>
                {/* Header */}
                <div className="text-center mb-5 border-b border-dashed border-gray-400 pb-3">
                  <p className="text-lg font-bold mb-1">GERRY COFFEE</p>
                  <p className="text-xs">{language === 'vi' ? 'Hóa Đơn' : 'Receipt'}</p>
                </div>

                {/* Order Info */}
                <div className="mb-4 text-xs">
                  <p><strong>Order ID:</strong> #{previewOrder.id}</p>
                  <p><strong>{language === 'vi' ? 'Ngày:' : 'Date:'}</strong> {previewOrder.date}</p>
                  <p><strong>{language === 'vi' ? 'Khách hàng:' : 'Customer:'}</strong> {previewOrder.customerName}</p>
                  <p><strong>{language === 'vi' ? 'Địa chỉ:' : 'Address:'}</strong> {previewOrder.address || 'N/A'}</p>
                  <p><strong>{language === 'vi' ? 'Thanh toán:' : 'Payment:'}</strong> {previewOrder.paymentMethod || 'N/A'}</p>
                </div>

                {/* Items */}
                <div className="border-b border-dashed border-gray-400 pb-3 mb-3">
                  {previewOrder.items.map((item, idx) => {
                    const itemTotal = calculateItemPrice(item, undefined, undefined, sizeLPrice) * item.quantity;
                    const sizeHtml = item.size ? `(${item.size})` : '';
                    return (
                      <div key={idx} className="mb-2">
                        <div className="flex justify-between">
                          <span><strong>{item.quantity}x</strong> {item.name} {sizeHtml}</span>
                          <span className="font-bold">{formatPrice(itemTotal, language)}</span>
                        </div>
                        {item.toppings && item.toppings.length > 0 && (
                          <div className="text-xs text-gray-600 ml-4 italic">
                            + {item.toppings.map(t => t.name).join(', ')}
                          </div>
                        )}
                        {item.note && (
                          <div className="text-xs text-gray-600 ml-4 italic">
                            Note: {item.note}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="text-right mb-4">
                  <p className="text-base font-bold">
                    {language === 'vi' ? 'Tổng cộng:' : 'Total:'} {formatPrice(previewOrder.total, language)}
                  </p>
                </div>

                {/* Order Note */}
                {previewOrder.note && (
                  <div className="mb-4 border border-gray-400 p-2 text-xs">
                    <strong>Note:</strong> {previewOrder.note}
                  </div>
                )}

                {/* Footer */}
                <div className="text-center text-xs mt-5 pt-3 border-t border-dashed border-gray-400">
                  <p>{language === 'vi' ? 'Cảm ơn quý khách!' : 'Thank you for your order!'}</p>
                  <p>Wifi: gerrycoffee / 12345678</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={handleClosePreview}
                className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg font-medium transition-colors border border-coffee-200"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
              <button
                onClick={() => {
                  handlePrintInvoice(previewOrder);
                  handleClosePreview();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-coffee-900 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                <Printer className="w-4 h-4" />
                {language === 'vi' ? 'In Hóa Đơn' : 'Print Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;