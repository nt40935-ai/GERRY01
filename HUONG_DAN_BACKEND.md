# 🚀 Hướng Dẫn Đầy Đủ: Tích Hợp Backend SQL cho GERRY COFFEE

## 📋 Tổng Quan

Để ứng dụng hoạt động với dữ liệu chung (khi chia sẻ link cho người khác), cần tích hợp backend database. Tài liệu này hướng dẫn sử dụng **Supabase** (PostgreSQL database miễn phí).

---

## ✅ Những gì sẽ đạt được:

- ✅ Đăng ký/Đăng nhập: Lưu vào database, ai cũng có thể đăng nhập
- ✅ Đơn hàng: Khi khách đặt hàng, admin thấy ngay trên dashboard
- ✅ Sản phẩm: Admin thêm/sửa sản phẩm, tất cả người dùng thấy
- ✅ Đặt bàn: Reservation được lưu chung, admin quản lý được
- ✅ Realtime: Dữ liệu tự động cập nhật không cần refresh

---

## 📝 Bước 1: Tạo Supabase Account & Project

1. Truy cập: **https://supabase.com**
2. Click **"Start your project"** hoặc **"Sign in"**
3. Đăng nhập bằng GitHub (dễ nhất)
4. Click **"New Project"**
5. Điền thông tin:
   - **Name**: `gerry-coffee` 
   - **Database Password**: Tạo password mạnh (lưu lại!)
   - **Region**: Chọn `Southeast Asia (Singapore)`
   - **Pricing Plan**: Chọn **Free**
6. Click **"Create new project"**
7. Đợi 2-3 phút để Supabase setup database

---

## 🔑 Bước 2: Lấy API Keys

1. Trong Supabase Dashboard, click **Settings** (⚙️) ở sidebar trái
2. Click **API** trong menu Settings
3. Copy 2 thông tin quan trọng:
   - **Project URL**: Ví dụ `https://abcdefghijklmnop.supabase.co`
   - **anon public** key: Bắt đầu bằng `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🗄️ Bước 3: Tạo Database Tables

1. Trong Supabase Dashboard, click **SQL Editor** ở sidebar trái
2. Click **"New query"**
3. Copy và paste đoạn SQL sau, sau đó click **Run**:

```sql
-- ============================================
-- 1. BẢNG USERS (Người dùng)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar TEXT,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. BẢNG ORDERS (Đơn hàng)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' 
    CHECK (status IN ('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled')),
  date TEXT NOT NULL,
  items_count INTEGER NOT NULL,
  items JSONB NOT NULL,
  address TEXT,
  payment_method TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. BẢNG PRODUCTS (Sản phẩm)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
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

-- ============================================
-- 4. BẢNG RESERVATIONS (Đặt bàn)
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  note TEXT,
  party_size INTEGER NOT NULL,
  table_id TEXT NOT NULL,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' 
    CHECK (status IN ('Pending', 'Confirmed', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO INDEXES ĐỂ QUERY NHANH HƠN
-- ============================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_datetime ON reservations(datetime);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
```

4. Sau khi chạy xong, vào **Table Editor** để xác nhận đã tạo được 4 bảng

---

## 🔐 Bước 4: Cấu Hình Row Level Security (RLS)

### 4.1. Tắt RLS tạm thời (cho development)

Vào **Authentication** > **Policies**, tìm từng bảng và:

**Cho bảng `users`:**
- Click vào bảng `users`
- Click **"New Policy"** > **"Create policy from scratch"**
- **Policy name**: `Enable all access for users`
- **Allowed operation**: Chọn tất cả (SELECT, INSERT, UPDATE)
- **Policy definition**: `true`
- Click **Save**

**Làm tương tự cho các bảng: `orders`, `products`, `reservations`**

> ⚠️ **Lưu ý**: Đây chỉ là để test. Sau này cần cấu hình RLS kỹ hơn để bảo mật.

---

## 📦 Bước 5: Cài Đặt Supabase Client

Mở terminal và chạy:

```bash
npm install @supabase/supabase-js
```

---

## ⚙️ Bước 6: Cấu Hình Environment Variables

1. Tạo file `.env.local` ở thư mục gốc (cùng cấp với `package.json`)
2. Thêm nội dung sau (thay bằng giá trị thật từ Supabase):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

3. **QUAN TRỌNG**: Thêm `.env.local` vào `.gitignore` để không commit keys lên Git

---

## 💻 Bước 7: Cập Nhật Code

Sau khi tôi tạo các file service, bạn chỉ cần:

1. Uncomment code trong `src/services/orderService.ts`
2. Cập nhật `App.tsx` để sử dụng services mới
3. Test lại ứng dụng

---

## 🎯 Các Bước Tiếp Theo

Sau khi setup xong Supabase:

1. ✅ Tôi sẽ tạo các service files đầy đủ
2. ✅ Cập nhật App.tsx để sử dụng Supabase
3. ✅ Thêm realtime subscriptions để tự động cập nhật
4. ✅ Test và fix bugs

---

## 📊 Supabase Free Tier Limits

- **Database**: 500MB
- **Bandwidth**: 2GB/month
- **API Requests**: Unlimited (reasonable use)
- **Realtime Connections**: 200 concurrent
- **File Storage**: 1GB

**Đủ cho dự án nhỏ và vừa!**

---

## 🆘 Troubleshooting

**Lỗi: "relation does not exist"**
→ Chưa chạy SQL để tạo tables, quay lại Bước 3

**Lỗi: "new row violates row-level security policy"**
→ Chưa cấu hình RLS policies, quay lại Bước 4

**Lỗi: "Invalid API key"**
→ Kiểm tra lại `.env.local`, copy đúng key từ Supabase Dashboard

---

Bạn đã setup Supabase xong chưa? Nếu đã có API keys, tôi sẽ tạo code integration ngay!



