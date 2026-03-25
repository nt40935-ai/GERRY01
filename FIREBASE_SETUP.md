# 🔥 Hướng Dẫn Tích Hợp Firebase để Đồng Bộ Đơn Hàng

## Vấn đề hiện tại
Ứng dụng đang sử dụng localStorage, nên:
- Đơn hàng chỉ lưu trên trình duyệt của khách hàng
- Admin không thể xem đơn hàng từ trình duyệt khác
- Dữ liệu không được đồng bộ giữa các thiết bị

## Giải pháp: Firebase Firestore

Firestore là database realtime của Google, cho phép:
- ✅ Lưu trữ dữ liệu chung (cloud)
- ✅ Đồng bộ realtime giữa các thiết bị
- ✅ Miễn phí cho dự án nhỏ
- ✅ Dễ tích hợp với React

## Các bước tích hợp:

### 1. Tạo Firebase Project
1. Truy cập: https://console.firebase.google.com
2. Click "Add project"
3. Đặt tên project: `gerry-coffee` (hoặc tên bạn muốn)
4. Chọn "Enable Google Analytics" (optional)
5. Click "Create project"

### 2. Tạo Firestore Database
1. Trong Firebase Console, chọn "Firestore Database"
2. Click "Create database"
3. Chọn "Start in test mode" (cho development)
4. Chọn location (gần Việt Nam: `asia-southeast1`)
5. Click "Enable"

### 3. Cài đặt Firebase SDK
```bash
npm install firebase
```

### 4. Cấu hình Firebase
Tạo file `src/services/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Lấy từ Firebase Console > Project Settings > General > Your apps
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 5. Cập nhật App.tsx để sử dụng Firestore
Thay vì localStorage, sử dụng Firestore để:
- Lưu đơn hàng: `collection(db, 'orders')`
- Đọc đơn hàng: `getDocs(collection(db, 'orders'))`
- Lắng nghe thay đổi: `onSnapshot(collection(db, 'orders'), ...)`

## Lưu ý bảo mật:
Sau khi setup xong, cần cấu hình Firestore Security Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if true; // Tạm thời cho mọi người (chỉ cho dev)
      // Sau này cần thêm authentication
    }
  }
}
```

## Ưu điểm:
- ✅ Đơn hàng được lưu trên cloud
- ✅ Admin có thể xem đơn hàng từ bất kỳ đâu
- ✅ Realtime sync - đơn hàng mới tự động hiển thị
- ✅ Miễn phí cho 50K reads/20K writes/ngày

Bạn có muốn tôi giúp tích hợp Firebase vào code không?





