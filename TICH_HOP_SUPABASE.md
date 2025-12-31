# 🔗 Hướng Dẫn Tích Hợp Supabase vào Code

## ✅ Đã hoàn thành:
1. ✅ Cài đặt `@supabase/supabase-js`
2. ✅ Tạo `src/services/supabase.ts` - Cấu hình Supabase client
3. ✅ Tạo `src/services/orderService.ts` - Service làm việc với Orders

## 📋 Bước tiếp theo:

### 1. Setup Supabase Project (Nếu chưa làm)
Xem file **HUONG_DAN_BACKEND.md** để:
- Tạo Supabase account
- Tạo project mới
- Chạy SQL script để tạo tables
- Copy API keys

### 2. Tạo file `.env.local`

Tạo file `.env.local` ở thư mục gốc với nội dung:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Lưu ý:** Thay `your-project-id` và `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` bằng giá trị thật từ Supabase Dashboard.

### 3. Cập nhật App.tsx để sử dụng Supabase

Tôi sẽ tạo file hướng dẫn chi tiết cách tích hợp vào App.tsx. Bạn có muốn tôi cập nhật App.tsx ngay bây giờ không?

---

## 🎯 Lợi ích sau khi tích hợp:

1. **Đơn hàng đồng bộ:** Khi khách đặt hàng → Admin thấy ngay trên dashboard
2. **Realtime:** Không cần refresh, đơn hàng mới tự động hiện
3. **Multi-device:** Mọi người dùng thấy cùng dữ liệu
4. **Backup tự động:** Dữ liệu được lưu trên cloud, không mất khi xóa localStorage

---

## 📝 Code hiện tại đã sẵn sàng:

- `orderService.ts` đã có đầy đủ functions:
  - `getOrders()` - Lấy tất cả đơn hàng
  - `createOrder()` - Tạo đơn hàng mới
  - `updateOrderStatus()` - Cập nhật trạng thái
  - `subscribeToOrders()` - Lắng nghe thay đổi realtime

- Code có **fallback về localStorage** nếu Supabase chưa được cấu hình, nên app vẫn hoạt động bình thường.

---

**Bạn đã setup Supabase project chưa? Nếu rồi, tôi sẽ giúp tích hợp vào App.tsx ngay!**

