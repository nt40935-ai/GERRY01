# 🗄️ Hướng Dẫn Tích Hợp Backend SQL (Supabase)

## Vấn đề hiện tại
- Dữ liệu chỉ lưu trên localStorage (trình duyệt cục bộ)
- Khi chia sẻ link cho người khác, dữ liệu không đồng bộ
- Admin không thể xem đơn hàng, user đăng ký từ các thiết bị khác

## Giải pháp: Supabase (PostgreSQL Database)

Supabase cung cấp:
- ✅ PostgreSQL database (SQL thật)
- ✅ REST API tự động
- ✅ Realtime subscriptions
- ✅ Authentication (đăng nhập/đăng ký)
- ✅ Miễn phí cho dự án nhỏ
- ✅ Không cần server riêng

---

## Bước 1: Tạo Supabase Project

1. Truy cập: https://supabase.com
2. Đăng ký/Đăng nhập (dùng GitHub/GitLab)
3. Click **"New Project"**
4. Điền thông tin:
   - **Name**: `gerry-coffee`
   - **Database Password**: (tạo password mạnh, lưu lại!)
   - **Region**: `Southeast Asia (Singapore)` (gần Việt Nam nhất)
5. Click **"Create new project"**
6. Đợi 2-3 phút để Supabase setup

---

## Bước 2: Lấy API Keys

1. Vào **Settings** (⚙️) > **API**
2. Copy các thông tin sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: (giữ bí mật, chỉ dùng backend)

---

## Bước 3: Tạo Database Tables

Vào **SQL Editor** trong Supabase, chạy các lệnh sau:

```sql
-- 1. Bảng Users (Người dùng)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer',
  avatar TEXT,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bảng Orders (Đơn hàng)
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  customer_name TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  date TEXT NOT NULL,
  items_count INTEGER NOT NULL,
  items JSONB NOT NULL, -- Lưu toàn bộ items dưới dạng JSON
  address TEXT,
  payment_method TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Bảng Products (Sản phẩm)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  image TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  is_best_seller BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Bảng Reservations (Đặt bàn)
CREATE TABLE reservations (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  note TEXT,
  party_size INTEGER NOT NULL,
  table_id TEXT NOT NULL,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes để query nhanh hơn
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_datetime ON reservations(datetime);
```

---

## Bước 4: Cấu hình Row Level Security (RLS)

Vào **Authentication** > **Policies**, tạo policies cho mỗi table:

### Cho bảng `orders`:
```sql
-- Cho phép mọi người đọc orders (để admin xem)
CREATE POLICY "Enable read access for all users" ON orders
  FOR SELECT USING (true);

-- Cho phép insert orders
CREATE POLICY "Enable insert for authenticated users" ON orders
  FOR INSERT WITH CHECK (true);

-- Cho phép update orders (để admin cập nhật status)
CREATE POLICY "Enable update for all users" ON orders
  FOR UPDATE USING (true);
```

### Cho bảng `users`:
```sql
-- Cho phép đọc users
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

-- Cho phép insert users (đăng ký)
CREATE POLICY "Enable insert for all users" ON users
  FOR INSERT WITH CHECK (true);

-- Cho phép update user của chính mình
CREATE POLICY "Enable update for users" ON users
  FOR UPDATE USING (true);
```

---

## Bước 5: Cài đặt Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## Bước 6: Tạo file cấu hình

Tạo file `.env.local`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Bước 7: Tích hợp vào Code

Sau khi cài đặt xong, tôi sẽ tạo các file:
- `src/services/supabase.ts` - Khởi tạo Supabase client
- `src/services/orderService.ts` - Service để làm việc với orders
- `src/services/userService.ts` - Service để làm việc với users
- Cập nhật `App.tsx` để sử dụng Supabase thay vì localStorage

---

## Lưu ý:

1. **Miễn phí**: Supabase free tier cho phép:
   - 500MB database
   - 2GB bandwidth
   - 50K monthly active users
   - Đủ cho dự án nhỏ

2. **Bảo mật**: Sau khi setup xong, cần cấu hình RLS policies kỹ hơn để bảo vệ dữ liệu

3. **Realtime**: Supabase hỗ trợ realtime, đơn hàng mới sẽ tự động hiển thị trên admin dashboard

---

Bạn có muốn tôi tạo code structure sẵn để khi cài đặt xong Supabase client sẽ hoạt động ngay không?

