// Service để làm việc với Users từ Supabase
import { supabase } from './supabase';
import { User } from '../types';

// Lấy tất cả users
export const getUsers = async (): Promise<User[]> => {
  if (!supabase) {
    try {
      const saved = localStorage.getItem('gerry_all_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data?.map(convertDbUserToUser) || [];
};

// Lưu user mới
export const createUser = async (user: User): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_all_users');
      const users = existing ? JSON.parse(existing) : [];
      const exists = users.find((u: User) => u.id === user.id || u.email === user.email);
      if (!exists) {
        users.push(user);
        localStorage.setItem('gerry_all_users', JSON.stringify(users));
      }
      return true;
    } catch {
      return false;
    }
  }

  const dbUser = convertUserToDbUser(user);
  const { error } = await supabase
    .from('users')
    .upsert(dbUser, { onConflict: 'email' });

  if (error) {
    console.error('Error creating/updating user:', error);
    return false;
  }

  return true;
};

// Cập nhật user
export const updateUser = async (user: User): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_all_users');
      const users = existing ? JSON.parse(existing) : [];
      const updated = users.map((u: User) => u.id === user.id ? user : u);
      localStorage.setItem('gerry_all_users', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }

  const dbUser = convertUserToDbUser(user);
  const { error } = await supabase
    .from('users')
    .update(dbUser)
    .eq('id', user.id);

  if (error) {
    console.error('Error updating user:', error);
    return false;
  }

  return true;
};

// Lắng nghe thay đổi realtime
export const subscribeToUsers = (
  callback: (users: User[]) => void
): (() => void) | null => {
  if (!supabase) return null;

  const channel = supabase
    .channel('users-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'users' },
      async () => {
        const users = await getUsers();
        callback(users);
      }
    )
    .subscribe();

  return () => {
    if (supabase) {
      supabase.removeChannel(channel);
    }
  };
};

// Helper functions
function convertDbUserToUser(dbUser: any): User {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role || 'customer',
    avatar: dbUser.avatar,
    phone: dbUser.phone,
    address: dbUser.address,
    loyaltyPoints: dbUser.loyalty_points || 0,
  };
}

function convertUserToDbUser(user: User): any {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'customer',
    avatar: user.avatar || null,
    phone: user.phone || null,
    address: user.address || null,
    loyalty_points: user.loyaltyPoints || 0,
  };
}

