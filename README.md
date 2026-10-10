# 💖 Món Quà Huyền Ảo & Lãng Mạn Dành Tặng Vợ Yêu

> **Kỷ niệm tình yêu từ ngày 20/01/2026**  
> Dự án kết hợp công nghệ hiện đại giữa **HTML5, CSS3, JavaScript** và **Python Backend**.

---

## 🌟 Điểm nổi bật & Tính năng huyền ảo

1. **Giao diện Vũ Trụ & Cực Quang Lung Linh (Ethereal Universe & Aurora)**:
   - Bầu trời sao động (`Canvas`) với hàng trăm vì sao lấp lánh, hiệu ứng sao băng bay ngang bầu trời ngẫu nhiên.
   - Ánh hào quang cực quang (Nebula / Aurora Orbs) mềm mại chuyển động huyền ảo.
   - Bụi tiên lấp lánh theo từng chuyển động của con trỏ chuột hoặc ngón tay chạm màn hình.

2. **Đồng hồ đếm thời gian yêu nhau (Love Journey Counter)**:
   - Bắt đầu từ ngày định mệnh **20/01/2026**.
   - Đếm chính xác từng Ngày, Giờ, Phút và Giây theo thời gian thực.
   - Tự động tính toán các cột mốc ý nghĩa tiếp theo (100 ngày, 1 năm, 500 ngày...) kèm thanh đo tiến trình lung linh.

3. **Phong bì 3D Hoàng Gia & Con Dấu Sáp Phát Sáng**:
   - Phong bì mở nắp 3D chân thực, con dấu sáp vàng khắc tim `♥` giải phóng chùm ánh sáng và trái tim khi chạm vào.
   - Kèm hiệu ứng âm thanh ngân vang kỳ diệu (Magical Chime).

4. **Bút máy dạ quang viết thư tình (Glowing Quill & Calligraphy)**:
   - Lá thư mở ra với phong cách thư pháp sang trọng.
   - Cây bút dạ quang lướt theo từng dòng chữ, tỏa ra ánh sáng stardust khi viết.
   - Lời thư chứa chan cảm xúc gửi gắm tới người vợ yêu (Thẻo Thẻo).

5. **Giai điệu tình yêu du dương (Web Audio Synthesizer)**:
   - Bộ tổng hợp âm thanh hộp nhạc / đàn piano êm dịu tích hợp sẵn, không lo lỗi đường link mạng hay bản quyền.
   - Nút bật/tắt tinh tế trên thanh điều hướng cùng hiệu ứng equalizer sóng nhạc.

6. **Hộp điều ước sao băng & Lời nhắn**:
   - Vợ và chồng có thể nhập những điều ước, lời nhắn yêu thương.
   - Khi chạy bằng Python, lời nhắn được lưu cục bộ trong `data/wishes.json`.
   - Trên GitHub Pages, lời nhắn được gửi riêng qua Formspree; GitHub Pages không chạy Python và lời nhắn không được hiển thị công khai trên trang.

7. **Mưa cánh hoa hồng & Ngàn nụ hôn (Interactive Particle Burst)**:
   - Nút bấm thả ngàn nụ hoa và trái tim bay lơ lửng khắp màn hình.

---

## 🚀 Hướng dẫn khởi chạy

### Cách 1: Chạy 1-Click bằng file `run.bat` (Khuyên dùng trên Windows)
- Nhấp đúp chuột vào file **`run.bat`**.
- Trình duyệt sẽ tự động mở lên tại địa chỉ: `http://localhost:5000`.

### Cách 2: Chạy bằng lệnh dòng lệnh Python
Mở Terminal / PowerShell trong thư mục này và gõ:
```bash
python app.py
```
Sau đó truy cập: `http://localhost:5000`

### Cách 3: Đăng trang tĩnh bằng GitHub Pages
- Đưa `index.html`, `style.css` và `script.js` lên GitHub, sau đó bật GitHub Pages trong phần **Settings → Pages**.
- Form lời nhắn dùng Formspree; Python backend không chạy trên GitHub Pages.
- Các file dữ liệu riêng tư trong `data/wishes.json` được loại khỏi Git bằng `.gitignore`.

### Cách 4: Mở trực tiếp không cần server
- Nhấp đúp vào `index.html` để xem giao diện. Các API Python chỉ hoạt động khi chạy `app.py` bằng một server cục bộ.

---

## 📂 Cấu trúc thư mục

- `index.html`: Giao diện web chính hiện đại, lãng mạn.
- `style.css`: Toàn bộ hiệu ứng 3D, glassmorphism, gradient aurora, hoạt họa.
- `script.js`: Xử lý canvas bầu trời sao, đếm ngày, âm thanh Web Audio, hiệu ứng gõ chữ, kết nối Python API/Formspree.
- `app.py`: Server Python chuẩn (không cần cài thêm thư viện phụ thuộc), cung cấp REST API (`/api/status`, `/api/wishes`, `/api/quotes`).
- `run.bat`: File khởi động nhanh tiện lợi trên Windows.
- `data/wishes.json`: Dữ liệu lời nhắn cục bộ; được loại khỏi Git để tránh công khai nội dung riêng tư.

