// Service để làm việc với Reservations từ Supabase
import { supabase } from './supabase';
import { Reservation } from '../types';

// Lấy tất cả reservations
export const getReservations = async (): Promise<Reservation[]> => {
  if (!supabase) {
    try {
      const saved = localStorage.getItem('gerry_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('datetime', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data?.map(convertDbReservationToReservation) || [];
};

// Lưu reservation mới
export const createReservation = async (reservation: Reservation): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_reservations');
      const reservations = existing ? JSON.parse(existing) : [];
      reservations.unshift(reservation);
      localStorage.setItem('gerry_reservations', JSON.stringify(reservations));
      return true;
    } catch {
      return false;
    }
  }

  const dbReservation = convertReservationToDbReservation(reservation);
  const { error } = await supabase
    .from('reservations')
    .insert(dbReservation);

  if (error) {
    console.error('Error creating reservation:', error);
    return false;
  }

  return true;
};

// Cập nhật trạng thái reservation
export const updateReservationStatus = async (
  id: string,
  status: string
): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_reservations');
      const reservations = existing ? JSON.parse(existing) : [];
      const updated = reservations.map((r: Reservation) =>
        r.id === id ? { ...r, status } : r
      );
      localStorage.setItem('gerry_reservations', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }

  const { error } = await supabase
    .from('reservations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating reservation:', error);
    return false;
  }

  return true;
};

// Lắng nghe thay đổi realtime
export const subscribeToReservations = (
  callback: (reservations: Reservation[]) => void
): (() => void) | null => {
  if (!supabase) return null;

  const channel = supabase
    .channel('reservations-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'reservations' },
      async () => {
        const reservations = await getReservations();
        callback(reservations);
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
function convertDbReservationToReservation(dbReservation: any): Reservation {
  return {
    id: dbReservation.id,
    userId: dbReservation.user_id || undefined,
    name: dbReservation.name,
    phone: dbReservation.phone,
    email: dbReservation.email || undefined,
    note: dbReservation.note || undefined,
    partySize: dbReservation.party_size,
    tableId: dbReservation.table_id,
    datetime: dbReservation.datetime,
    status: dbReservation.status,
    createdAt: dbReservation.created_at || new Date().toISOString(),
  };
}

function convertReservationToDbReservation(reservation: Reservation): any {
  return {
    id: reservation.id,
    user_id: reservation.userId || null,
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email || null,
    note: reservation.note || null,
    party_size: reservation.partySize,
    table_id: reservation.tableId,
    datetime: reservation.datetime,
    status: reservation.status,
  };
}
