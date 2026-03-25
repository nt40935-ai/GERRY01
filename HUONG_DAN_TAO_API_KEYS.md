# 🔑 Hướng Dẫn Tạo API Keys từ Supabase

## ⚠️ QUAN TRỌNG: Bạn cần tự tạo API keys từ Supabase

Code đã sẵn sàng, nhưng **chưa có API keys**. Bạn cần làm các bước sau:

---

## 📝 Bước 1: Tạo Supabase Account & Project

1. Truy cập: **https://supabase.com**
2. Click **"Start your project"** hoặc đăng nhập
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

## ⚙️ Bước 3: Tạo file `.env.local`

1. Tạo file `.env.local` ở thư mục gốc (cùng cấp với `package.json`)
2. Thêm nội dung sau (thay bằng giá trị thật từ Supabase):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

**Ví dụ thật:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzIwMCwiZXhwIjoxOTU0NTQzMjAwfQ.example
```

---

## 🗄️ Bước 4: Tạo Database Tables

1. Trong Supabase Dashboard, click **SQL Editor** ở sidebar trái
2. Click **"New query"**
3. Copy và paste đoạn SQL từ file **HUONG_DAN_BACKEND.md** (phần Bước 3)
4. Click **Run**
5. Xác nhận đã tạo được 4 bảng: `users`, `orders`, `products`, `reservations`

---

## 🔐 Bước 5: Cấu Hình Row Level Security (RLS)

Vào **Authentication** > **Policies**, cho mỗi bảng (`users`, `orders`, `products`, `reservations`):

1. Click vào bảng
2. Click **"New Policy"** > **"Create policy from scratch"**
3. **Policy name**: `Enable all access`
4. **Allowed operation**: Chọn tất cả (SELECT, INSERT, UPDATE, DELETE)
5. **Policy definition**: `true`
6. Click **Save**

> ⚠️ **Lưu ý**: Đây chỉ là để test. Sau này cần cấu hình RLS kỹ hơn để bảo mật.

---

## ✅ Bước 6: Test

Sau khi tạo `.env.local`:

1. Restart dev server (nếu đang chạy):
   ```bash
   npm run dev
   ```

2. App sẽ tự động kết nối với Supabase
3. Test:
   - Đăng ký/Đăng nhập → Kiểm tra Supabase Table Editor xem có user mới không
   - Đặt hàng → Kiểm tra bảng `orders`
   - Admin thêm sản phẩm → Kiểm tra bảng `products`

---

## 🆘 Troubleshooting

**Lỗi: "Supabase config missing"**
→ Chưa tạo file `.env.local` hoặc keys không đúng

**Lỗi: "relation does not exist"**
→ Chưa chạy SQL để tạo tables, quay lại Bước 4

**Lỗi: "new row violates row-level security policy"**
→ Chưa cấu hình RLS policies, quay lại Bước 5

**Lỗi: "Invalid API key"**
→ Kiểm tra lại `.env.local`, copy đúng key từ Supabase Dashboard

---

## 📝 Lưu ý

- File `.env.local` sẽ tự động được gitignore (không commit lên Git)
- API keys là thông tin bảo mật, không chia sẻ công khai
- Supabase Free tier đủ cho dự án nhỏ và vừa

---

**Bạn đã tạo Supabase project chưa? Nếu đã có API keys, tôi có thể giúp tạo file `.env.local` cho bạn!**



