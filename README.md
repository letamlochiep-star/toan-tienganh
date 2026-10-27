# Từ Vựng Toán Mỗi Ngày (Lớp 6–9)

Ứng dụng học từ vựng Toán Tiếng Anh THCS (Lớp 6 đến Lớp 9) bám sát chương trình SGK Kết Nối Tri Thức.

## 🌟 Tính Năng Nổi Bật

- **Lộ trình 40 ngày học**: Mỗi ngày 6 từ vựng toán học có phát âm chuẩn, phiên âm IPA, giải nghĩa tiếng Việt và câu ví dụ song ngữ.
- **Phát âm Web Speech API**: Nghe phát âm từ vựng chuẩn giọng bản ngữ en-US trên mọi thiết bị.
- **Bài kiểm tra 6 câu**: Đa dạng hình thức (chọn nghĩa, điền từ, nghe chọn từ, chọn thuật ngữ) tính điểm và duy trì chuỗi ngày học (streak).
- **Ôn tập ngắt quãng (Spaced Repetition / Leitner)**: 5 hộp ôn tập ngắt quãng tự động lên lịch sau 1, 3, 7, 14, 30 ngày.
- **Từ điển tra cứu nhanh**: Tìm kiếm từ vựng theo tiếng Anh hoặc tiếng Việt, lọc theo từng khối lớp 6–9.
- **Khu vực mở rộng**: Tùy chỉnh thông tin lớp học, thêm từ vựng mới, sao lưu & khôi phục dữ liệu qua LocalStorage.

## 🚀 Cách Chạy Ứng Dụng

### 1. Chạy trực tiếp (Standalone HTML)
Mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox) trên máy tính hoặc điện thoại mà không cần cài đặt.

### 2. Chạy với Next.js (Dự án đầy đủ)
```bash
# Cài đặt dependencies
npm install

# Chạy server phát triển
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

## 📁 Cấu Trúc Thư Mục
- `index.html`: Webapp chạy trực tiếp dạng Single Page Application.
- `app/`: Next.js App Router (trang chủ, màn hình học theo ngày).
- `components/`: Các React component (Header, ProgressBar, WordCard, SpeakableWord...).
- `data/`: Dữ liệu từ vựng 40 ngày (`words.json`).
- `knowledge/`: Bộ từ vựng gốc THCS (`tu-vung-toan-6-9.csv`).
- `public/`: Chứa file tĩnh, hình ảnh minh họa SVG và file âm thanh.
