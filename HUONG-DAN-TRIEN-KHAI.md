# 🌐 Hướng Dẫn Triển Khai Dự Án Lên Internet Miễn Phí

Dự án này có thể được triển khai miễn phí trên nhiều nền tảng. Dưới đây là các cách phổ biến nhất:

## 🚀 Phương Pháp 1: Vercel (Khuyên Dùng - Dễ Nhất)

**Vercel là cách dễ nhất và nhanh nhất để deploy React app miễn phí!**

### Bước 1: Chuẩn bị
1. Đảm bảo bạn đã có tài khoản GitHub
2. Push code lên GitHub repository

### Bước 2: Deploy trên Vercel
1. Truy cập: https://vercel.com
2. Đăng nhập bằng tài khoản GitHub
3. Click **"Add New Project"**
4. Import repository từ GitHub của bạn
5. Cấu hình:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Bước 3: Thêm Environment Variables
Trong Vercel Dashboard, vào **Settings > Environment Variables**, thêm:
- `VITE_API_KEY`: API key của Gemini (nếu có)
- `VITE_BASE_PATH`: `/` (để app chạy ở root path)

### Bước 4: Deploy!
Click **Deploy** và đợi vài phút. Vercel sẽ tự động:
- Build project
- Deploy lên CDN toàn cầu
- Cung cấp URL miễn phí (ví dụ: `your-project.vercel.app`)

**✅ Ưu điểm:**
- Miễn phí hoàn toàn
- Tự động deploy khi push code mới
- CDN toàn cầu, tốc độ nhanh
- SSL/HTTPS tự động
- Custom domain miễn phí

---

## 🌟 Phương Pháp 2: Netlify (Cũng Rất Dễ)

### Bước 1: Chuẩn bị
1. Push code lên GitHub

### Bước 2: Deploy trên Netlify
1. Truy cập: https://netlify.com
2. Đăng nhập bằng GitHub
3. Click **"Add new site" > "Import an existing project"**
4. Chọn repository từ GitHub
5. Cấu hình:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Bước 3: Thêm Environment Variables
Vào **Site settings > Environment variables**, thêm:
- `VITE_API_KEY`: API key của Gemini
- `VITE_BASE_PATH`: `/`

### Bước 4: Deploy!
Click **Deploy site**. Netlify sẽ tự động deploy và cung cấp URL miễn phí.

**✅ Ưu điểm:**
- Miễn phí
- Tự động deploy
- CDN toàn cầu
- SSL tự động

---

## 📦 Phương Pháp 3: GitHub Pages (Miễn Phí, Cần GitHub Actions)

### Bước 1: Tạo GitHub Actions Workflow
File `.github/workflows/deploy.yml` đã được tạo sẵn trong project.

### Bước 2: Cấu hình GitHub Secrets
1. Vào repository trên GitHub
2. **Settings > Secrets and variables > Actions**
3. Thêm secrets:
   - `VITE_API_KEY`: API key của Gemini (nếu có)

### Bước 3: Kích hoạt GitHub Pages
1. Vào **Settings > Pages**
2. **Source**: Chọn **"GitHub Actions"**
3. Save

### Bước 4: Push code và chờ deploy
Mỗi khi push code lên branch `main`, GitHub Actions sẽ tự động build và deploy.

**URL sẽ là**: `https://your-username.github.io/gerry-coffee/`

**✅ Ưu điểm:**
- Miễn phí hoàn toàn
- Tích hợp với GitHub
- Tự động deploy

---

## ☁️ Phương Pháp 4: Cloudflare Pages (Nhanh và Miễn Phí)

### Bước 1: Chuẩn bị
1. Push code lên GitHub

### Bước 2: Deploy trên Cloudflare
1. Truy cập: https://pages.cloudflare.com
2. Đăng nhập (hoặc tạo tài khoản miễn phí)
3. Click **"Create a project"**
4. Kết nối với GitHub và chọn repository
5. Cấu hình:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### Bước 3: Thêm Environment Variables
Trong project settings, thêm:
- `VITE_API_KEY`: API key của Gemini
- `VITE_BASE_PATH`: `/`

### Bước 4: Deploy!
Click **Save and Deploy**. Cloudflare sẽ tự động deploy.

**✅ Ưu điểm:**
- Miễn phí
- CDN cực nhanh
- SSL tự động
- Custom domain miễn phí

---

## 📝 Lưu Ý Quan Trọng

### 1. API Key (Gemini)
- Nếu app sử dụng Gemini API, bạn cần có API key
- Lấy API key tại: https://makersuite.google.com/app/apikey
- **KHÔNG** commit API key vào code! Chỉ thêm vào Environment Variables trên hosting platform.

### 2. Build Project Trước Khi Deploy
Để test build local:
```bash
npm install
npm run build
```

### 3. Kiểm Tra File `.env.local`
Đảm bảo file `.env.local` có trong `.gitignore` (đã có sẵn) để không commit API key lên GitHub.

---

## 🎯 Khuyến Nghị

**Cho người mới bắt đầu**: Dùng **Vercel** - đơn giản nhất, nhanh nhất!

**Cho người muốn tích hợp với GitHub**: Dùng **GitHub Pages** hoặc **Vercel**

**Cho người muốn tốc độ tối đa**: Dùng **Cloudflare Pages**

---

## ❓ Câu Hỏi Thường Gặp

**Q: Có cần trả phí không?**
A: Không! Tất cả các nền tảng trên đều miễn phí cho dự án cá nhân.

**Q: URL sẽ như thế nào?**
A: 
- Vercel: `your-project.vercel.app`
- Netlify: `your-project.netlify.app`
- GitHub Pages: `username.github.io/repo-name`
- Cloudflare: `your-project.pages.dev`

**Q: Có thể dùng domain riêng không?**
A: Có! Tất cả các nền tảng trên đều hỗ trợ custom domain miễn phí.

**Q: Deploy mất bao lâu?**
A: Thường từ 1-5 phút tùy vào kích thước project.

---

## 🆘 Cần Giúp Đỡ?

Nếu gặp vấn đề khi deploy, kiểm tra:
1. Build command có đúng không (`npm run build`)
2. Output directory có đúng không (`dist`)
3. Environment variables đã được thêm chưa
4. Code đã được push lên GitHub chưa

Chúc bạn deploy thành công! 🎉
