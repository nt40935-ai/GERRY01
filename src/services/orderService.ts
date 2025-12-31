// Service để làm việc với Orders từ Supabase
import { supabase } from './supabase';
import { Order } from '../types';

// Lấy tất cả đơn hàng
export const getOrders = async (): Promise<Order[]> => {
  if (!supabase) {
    // Fallback to localStorage if Supabase not configured
    try {
      const saved = localStorage.getItem('gerry_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data?.map(convertDbOrderToOrder) || [];
};

// Lưu đơn hàng mới
export const createOrder = async (order: Order): Promise<boolean> => {
  if (!supabase) {
    // Fallback to localStorage
    try {
      const existing = localStorage.getItem('gerry_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(order);
      localStorage.setItem('gerry_orders', JSON.stringify(orders));
      return true;
    } catch {
      return false;
    }
  }

  const dbOrder = convertOrderToDbOrder(order);
  const { error } = await supabase
    .from('orders')
    .insert(dbOrder);

  if (error) {
    console.error('Error creating order:', error);
    return false;
  }

  return true;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<boolean> => {
  if (!supabase) {
    // Fallback to localStorage
    try {
      const existing = localStorage.getItem('gerry_orders');
      const orders = existing ? JSON.parse(existing) : [];
      const updated = orders.map((o: Order) =>
        o.id === orderId ? { ...o, status } : o
      );
      localStorage.setItem('gerry_orders', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order:', error);
    return false;
  }

  return true;
};

// Lắng nghe thay đổi realtime
export const subscribeToOrders = (
  callback: (orders: Order[]) => void
): (() => void) | null => {
  if (!supabase) return null;

  const channel = supabase
    .channel('orders-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      async () => {
        const orders = await getOrders();
        callback(orders);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Helper functions
function convertDbOrderToOrder(dbOrder: any): Order {
  return {
    id: dbOrder.id,
    userId: dbOrder.user_id,
    customerName: dbOrder.customer_name,
    total: parseFloat(dbOrder.total),
    status: dbOrder.status,
    date: dbOrder.date,
    itemsCount: dbOrder.items_count,
    items: dbOrder.items,
    address: dbOrder.address,
    paymentMethod: dbOrder.payment_method,
    note: dbOrder.note,
  };
}

function convertOrderToDbOrder(order: Order): any {
  return {
    id: order.id,
    user_id: order.userId || null,
    customer_name: order.customerName,
    total: order.total,
    status: order.status,
    date: order.date,
    items_count: order.itemsCount,
    items: order.items,
    address: order.address || null,
    payment_method: order.paymentMethod || null,
    note: order.note || null,
  };
}
<｜tool▁call▁end｜><｜tool▁call▁begin｜>
read_file
