# RC DNS LAB

Bảng điều khiển thử nghiệm DNS và thuê bao RevenueCat Sandbox.

## Trạng thái hiện tại

- [x] Khởi tạo Next.js + TypeScript.
- [x] Giao diện dashboard tiếng Việt theo phong cách xanh đen / vàng.
- [x] API health check cho ứng dụng.
- [x] Khu vực mô tả các kịch bản QA FREE / GOLD_ACTIVE / GOLD_EXPIRED.
- [ ] Kết nối Supabase Auth và cơ sở dữ liệu.
- [ ] Kết nối RevenueCat Sandbox/Test Store.
- [ ] Triển khai DNS DoH/DoT và kiểm tra resolver thực tế.
- [ ] Sinh cấu hình DNS mã hóa cho iOS.

Các trạng thái trong giao diện hiện là nhãn kịch bản, không phải entitlement trực tiếp.

## Yêu cầu

- Node.js 20.9 trở lên
- npm

## Chạy local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở http://localhost:3000.

## Kiểm tra

```bash
npm run build
```

Health endpoint: `/api/health`.

## Biến môi trường

Xem `.env.example`. Không đưa RevenueCat secret API key hoặc Supabase service-role key vào biến `NEXT_PUBLIC_*`, không commit file `.env.local`.

## Kiến trúc QA

- DNS chỉ thực hiện phân giải tên miền và kiểm tra kết nối.
- RevenueCat Sandbox/Test Store là nguồn dữ liệu thử nghiệm subscription.
- Gold chỉ được hiển thị khi SDK/backend nhận entitlement hợp lệ trong môi trường thử nghiệm.
- Không cài CA gốc để giải mã HTTPS của ứng dụng bên thứ ba.
