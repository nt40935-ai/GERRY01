import React, { useMemo, useState } from 'react';
import { Reservation, ReservationStatus, User, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';
import { CalendarDays, Clock, Users as UsersIcon, Phone, Mail, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

interface TableBookingProps {
  language: Language;
  user: User | null;
  reservations: Reservation[];
  onCreateReservation: (reservation: Reservation) => void;
}

type TableDef = { id: string; name: string; capacity: number; zone?: string };

const DEFAULT_TABLES: TableDef[] = [
  { id: 'T1', name: 'T1', capacity: 2, zone: 'Indoor' },
  { id: 'T2', name: 'T2', capacity: 2, zone: 'Indoor' },
  { id: 'T3', name: 'T3', capacity: 2, zone: 'Window' },
  { id: 'T4', name: 'T4', capacity: 4, zone: 'Indoor' },
  { id: 'T5', name: 'T5', capacity: 4, zone: 'Indoor' },
  { id: 'T6', name: 'T6', capacity: 2, zone: 'Indoor' },
  { id: 'T7', name: 'T7', capacity: 2, zone: 'Indoor' },
  { id: 'T8', name: 'T8', capacity: 6, zone: 'Group' },
];

const TIME_SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

function toISO(date: string, time: string) {
  // date: yyyy-mm-dd
  return new Date(`${date}T${time}:00`).toISOString();
}

const TableBooking: React.FC<TableBookingProps> = ({ language, user, reservations, onCreateReservation }) => {
  const t = TRANSLATIONS[language];

  const today = new Date();
  const defaultDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('19:30');
  const [partySize, setPartySize] = useState(2);
  const [tableId, setTableId] = useState<string>('T4');
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    note: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const tables = useMemo(() => DEFAULT_TABLES, []);

  const reservedTableIds = useMemo(() => {
    const targetISO = toISO(date, time);
    const set = new Set<string>();
    reservations.forEach(r => {
      if (r.status !== 'Cancelled' && r.datetime === targetISO) set.add(r.tableId);
    });
    return set;
  }, [reservations, date, time]);

  const selectedTable = useMemo(() => tables.find(t => t.id === tableId), [tables, tableId]);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      partySize >= 1 &&
      !!tableId &&
      !reservedTableIds.has(tableId) &&
      (selectedTable ? partySize <= selectedTable.capacity : true)
    );
  }, [form.name, form.phone, partySize, tableId, reservedTableIds, selectedTable]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.name.trim() || !form.phone.trim()) {
      setError(language === 'vi' ? 'Vui lòng nhập họ tên và số điện thoại.' : 'Please enter your name and phone.');
      return;
    }

    if (reservedTableIds.has(tableId)) {
      setError(language === 'vi' ? 'Bàn này đã được đặt ở khung giờ bạn chọn.' : 'This table is already reserved for the selected time.');
      return;
    }

    if (selectedTable && partySize > selectedTable.capacity) {
      setError(
        language === 'vi'
          ? `Bàn ${selectedTable.name} tối đa ${selectedTable.capacity} người.`
          : `Table ${selectedTable.name} supports up to ${selectedTable.capacity} guests.`
      );
      return;
    }

    const datetime = toISO(date, time);
    const reservation: Reservation = {
      id: `res-${Date.now()}`,
      userId: user?.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      note: form.note.trim() || undefined,
      partySize,
      tableId,
      datetime,
      status: 'Pending' as ReservationStatus,
      createdAt: new Date().toISOString()
    };

    onCreateReservation(reservation);
    setSuccess(true);
    setForm(prev => ({ ...prev, note: '' }));
  };

  return (
    <section id="booking" className="py-12 sm:py-16 bg-coffee-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            {language === 'vi' ? 'Đặt bàn' : 'Table booking'}
          </h2>
          <p className="text-white/70 mt-2">
            {language === 'vi'
              ? 'Chọn thời gian và bàn phù hợp cho trải nghiệm của bạn.'
              : 'Pick a time and a table that fits your experience.'}
          </p>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-amber-400" />
                {language === 'vi' ? '1. Thời gian & Số lượng' : '1. Date & party size'}
              </h3>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {language === 'vi' ? 'Ngày' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" />
                    {language === 'vi' ? 'Số khách' : 'Guests'}
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPartySize(p => Math.max(1, p - 1))}
                      className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white font-bold active:scale-95 touch-manipulation"
                    >
                      -
                    </button>
                    <div className="flex-1 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold">
                      {partySize}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPartySize(p => Math.min(10, p + 1))}
                      className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white font-bold active:scale-95 touch-manipulation"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-white/70 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {language === 'vi' ? 'Giờ đến' : 'Time'}
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`px-4 py-2 rounded-full border text-sm font-bold transition-all active:scale-95 touch-manipulation ${
                        time === slot
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                {language === 'vi' ? '2. Chọn bàn & Thông tin' : '2. Table & contact'}
              </h3>

              <div className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {tables.map(tb => {
                    const reserved = reservedTableIds.has(tb.id);
                    const selected = tableId === tb.id;
                    const tooSmall = partySize > tb.capacity;
                    return (
                      <button
                        key={tb.id}
                        type="button"
                        disabled={reserved}
                        onClick={() => setTableId(tb.id)}
                        className={`rounded-xl border p-3 text-left transition-all active:scale-95 touch-manipulation ${
                          selected
                            ? 'bg-amber-600 border-amber-500 text-white'
                            : reserved
                              ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                        }`}
                        title={
                          reserved
                            ? (language === 'vi' ? 'Đã được đặt' : 'Reserved')
                            : tooSmall
                              ? (language === 'vi' ? `Tối đa ${tb.capacity} người` : `Up to ${tb.capacity}`)
                              : ''
                        }
                      >
                        <div className="font-bold">{tb.name}</div>
                        <div className="text-xs opacity-80">{language === 'vi' ? `${tb.capacity} người` : `${tb.capacity} seats`}</div>
                      </button>
                    );
                  })}
                </div>
                {selectedTable && partySize > selectedTable.capacity && (
                  <div className="mt-3 text-sm text-amber-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {language === 'vi'
                      ? `Bàn ${selectedTable.name} tối đa ${selectedTable.capacity} người. Hãy chọn bàn lớn hơn.`
                      : `Table ${selectedTable.name} supports up to ${selectedTable.capacity}. Please choose a larger table.`}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/70 text-sm">{t.checkout.full_name}</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                      placeholder={language === 'vi' ? 'Họ và tên' : 'Full name'}
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t.checkout.phone}
                    </label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                      placeholder={language === 'vi' ? 'Số điện thoại' : 'Phone number'}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm">{language === 'vi' ? 'Ghi chú (tuỳ chọn)' : 'Note (optional)'}</label>
                  <textarea
                    value={form.note}
                    onChange={e => setForm({ ...form, note: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/40"
                    rows={3}
                    placeholder={language === 'vi' ? 'Ví dụ: cần ghế trẻ em, sinh nhật...' : 'Example: birthday decoration, kids chair...'}
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-sm text-green-200 bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {language === 'vi'
                      ? 'Đã gửi yêu cầu đặt bàn! Admin sẽ xác nhận sớm.'
                      : 'Booking request submitted! Admin will confirm soon.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full mt-2 py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 touch-manipulation"
                >
                  {language === 'vi' ? 'Xác nhận đặt bàn' : 'Confirm booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableBooking;



