---
name: dung-webapp-hoc-tu
description: Dựng webapp học từ vựng Toán mỗi ngày (thẻ ngày học, nút nghe, thẻ lật, kiểm tra, chuỗi ngày học, trợ lý Gemini) theo từng giai đoạn. Dùng khi cần khởi tạo dự án, thêm màn hình hoặc tích hợp Gemini API.
---

## Mục tiêu
Xây webapp mobile-first, chạy được ngay với dữ liệu `data/words.json`, rồi mở rộng theo giai đoạn.

## Giai đoạn 1 – Bản chạy được
Màn hình:
1. **Hôm nay**: hiện số ngày học, 6 từ mới, nút "Bắt đầu".
2. **Thẻ từ**: thẻ lật (mặt trước: từ + hình; mặt sau: IPA, nghĩa, câu ví dụ), nút loa phát âm (Web Speech API, `lang = "en-US"`).
3. **Kiểm tra**: 6 câu theo skill `tao-bai-kiem-tra`, hiện đúng/sai ngay và giải thích.
4. **Kết quả**: điểm, chuỗi ngày học (streak), nút "Ôn lại từ sai".
Lưu tiến độ bằng localStorage; bọc mọi thao tác đọc/ghi trong try/catch.

## Giai đoạn 2 – Ôn tập và tra cứu
- Lịch Leitner, màn hình "Ôn hôm nay".
- Tìm từ theo lớp, chương, hoặc gõ từ khóa.
- Biểu đồ tiến độ đơn giản (số từ theo hộp).

## Giai đoạn 3 – Trợ lý Gemini
- Tạo API route phía máy chủ `/api/tro-ly` gọi Gemini API; khóa lấy từ `process.env.GEMINI_API_KEY`.
- System instruction = nội dung `knowledge/tinh-cach-tro-ly.md`.
- Chỉ gửi kèm ngữ cảnh: từ đang học và câu hỏi của học sinh. Không gửi tên hay thông tin cá nhân.
- Giới hạn độ dài câu hỏi (≤ 300 ký tự) và số lượt hỏi mỗi phút.
- Nếu API lỗi, hiển thị thông báo thân thiện và vẫn cho học bình thường.

## Giai đoạn 4 – Mở rộng (làm khi được yêu cầu)
- Tài khoản học sinh, bảng điều khiển giáo viên, xuất điểm.
- Luyện đọc có chấm phát âm.

## Cấu trúc thư mục gợi ý
```
tu-vung-toan/
├── .agents/            # rules + skills (Antigravity)
├── knowledge/          # CSV từ vựng + tính cách trợ lý
├── data/words.json     # dữ liệu thẻ (do skill tao-the-tu-vung sinh ra)
├── public/svg/         # hình minh họa
├── src/                # mã nguồn app
└── docs/
```

## Kiểm tra trước khi báo xong
- Chạy app, học hết ngày 1 và làm xong bài kiểm tra.
- Kiểm tra trên màn hình rộng 360 px.
- Tắt mạng: thẻ từ và kiểm tra vẫn dùng được.
- Tìm trong mã nguồn đảm bảo không có khóa API.
