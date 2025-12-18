# Cấu Trúc Thư Mục Components

Tài liệu này giải thích cách tổ chức các component trong dự án để dễ quản lý và điều chỉnh.

## 📁 Cấu Trúc Thư Mục

```
src/components/
├── giao-dien/          # Giao diện chính (UI Components)
│   ├── Navbar.tsx     # Thanh điều hướng
│   ├── Footer.tsx     # Chân trang
│   ├── Hero.tsx       # Banner chính
│   └── About.tsx      # Trang giới thiệu
│
├── gio-hang/          # Giỏ hàng và thanh toán
│   ├── Cart.tsx       # Giỏ hàng
│   └── CheckoutModal.tsx  # Modal thanh toán
│
├── san-pham/          # Quản lý sản phẩm
│   ├── Menu.tsx       # Danh sách sản phẩm
│   ├── ProductModal.tsx    # Chi tiết sản phẩm
│   └── ReviewSection.tsx   # Đánh giá sản phẩm
│
├── tai-khoan/         # Tài khoản người dùng
│   ├── AuthModal.tsx      # Đăng nhập/Đăng ký
│   └── UserProfile.tsx    # Hồ sơ người dùng
│
├── tien-ich/         # Tiện ích và công cụ
│   ├── Assistant.tsx      # Trợ lý AI
│   └── Sidebar.tsx        # Thanh bên lọc sản phẩm
│
└── quan-tri/         # Quản trị hệ thống
    └── admin/
        ├── AdminDashboard.tsx    # Bảng điều khiển admin
        ├── ProductManager.tsx    # Quản lý sản phẩm
        ├── OrderManager.tsx      # Quản lý đơn hàng
        ├── BannerManager.tsx     # Quản lý banner
        ├── BrandManager.tsx      # Quản lý thương hiệu
        ├── CategoryManager.tsx    # Quản lý danh mục
        ├── PromotionManager.tsx  # Quản lý khuyến mãi
        ├── UserManager.tsx        # Quản lý người dùng
        ├── SalesReports.tsx       # Báo cáo doanh thu
        ├── ToppingManager.tsx    # Quản lý topping
        └── ImageUploader.tsx      # Upload ảnh
```

## 📝 Mô Tả Các Thư Mục

### 🎨 `giao-dien/` - Giao Diện
Chứa các component hiển thị giao diện chính của website:
- **Navbar**: Thanh điều hướng trên cùng
- **Footer**: Chân trang với thông tin liên hệ
- **Hero**: Banner quảng cáo chính
- **About**: Trang giới thiệu về cửa hàng

### 🛒 `gio-hang/` - Giỏ Hàng
Quản lý giỏ hàng và quy trình thanh toán:
- **Cart**: Hiển thị và quản lý giỏ hàng
- **CheckoutModal**: Form thanh toán và đặt hàng

### 🍵 `san-pham/` - Sản Phẩm
Hiển thị và quản lý danh sách sản phẩm:
- **Menu**: Danh sách tất cả sản phẩm với bộ lọc
- **ProductModal**: Chi tiết sản phẩm khi click vào
- **ReviewSection**: Phần đánh giá và bình luận

### 👤 `tai-khoan/` - Tài Khoản
Quản lý tài khoản người dùng:
- **AuthModal**: Đăng nhập/Đăng ký/Quên mật khẩu
- **UserProfile**: Hồ sơ và lịch sử đơn hàng

### 🛠️ `tien-ich/` - Tiện Ích
Các công cụ hỗ trợ:
- **Assistant**: Trợ lý AI chat
- **Sidebar**: Thanh bên để lọc sản phẩm

### ⚙️ `quan-tri/admin/` - Quản Trị
Các công cụ quản trị hệ thống (chỉ admin mới truy cập được):
- **AdminDashboard**: Bảng điều khiển chính
- **ProductManager**: Thêm/sửa/xóa sản phẩm
- **OrderManager**: Quản lý đơn hàng và cập nhật trạng thái
- **BannerManager**: Quản lý banner quảng cáo
- **BrandManager**: Cài đặt thương hiệu
- **CategoryManager**: Quản lý danh mục sản phẩm
- **PromotionManager**: Tạo và quản lý mã giảm giá
- **UserManager**: Quản lý người dùng và phân quyền
- **SalesReports**: Báo cáo doanh thu và thống kê
- **ToppingManager**: Quản lý topping cho sản phẩm
- **ImageUploader**: Component upload ảnh

## 🔧 Cách Điều Chỉnh

### Thêm Component Mới
1. Xác định component thuộc nhóm nào
2. Tạo file trong thư mục tương ứng
3. Cập nhật import trong `App.tsx` hoặc component cha

### Di Chuyển Component
1. Di chuyển file vào thư mục mới
2. Cập nhật tất cả các import liên quan
3. Kiểm tra lại bằng cách chạy `npm run dev`

### Đổi Tên Thư Mục
1. Đổi tên thư mục trong file system
2. Cập nhật tất cả các import paths
3. Tìm và thay thế: `from './components/[tên-cũ]'` → `from './components/[tên-mới]'`

## 💡 Lợi Ích

✅ **Dễ tìm kiếm**: Tên tiếng Việt giúp hiểu ngay component thuộc nhóm nào
✅ **Dễ quản lý**: Phân chia rõ ràng theo chức năng
✅ **Dễ mở rộng**: Thêm component mới vào đúng thư mục
✅ **Dễ bảo trì**: Biết ngay file nào cần sửa khi có vấn đề

## 📌 Lưu Ý

- Tất cả các import paths đã được cập nhật theo cấu trúc mới
- Khi thêm component mới, nhớ cập nhật file này
- Giữ nguyên cấu trúc để dễ làm việc nhóm

