# Hướng dẫn tạo webapp học từ vựng Toán bằng Google Antigravity

## Bạn có gì trong gói này
| Đường dẫn | Vai trò |
| --- | --- |
| `.agents/rules/du-an-tu-vung-toan.md` | Quy tắc luôn bật cho agent: mục tiêu, kỹ thuật, nội dung |
| `.agents/skills/tao-the-tu-vung/SKILL.md` | Skill sinh dữ liệu thẻ từ (ví dụ, mẹo nhớ, mô tả hình) |
| `.agents/skills/tao-bai-kiem-tra/SKILL.md` | Skill sinh bài kiểm tra 6 câu và lịch ôn Leitner |
| `.agents/skills/dung-webapp-hoc-tu/SKILL.md` | Skill dựng app theo giai đoạn |
| `knowledge/tu-vung-toan-6-9.csv` | File tri thức: 244 từ, 40 ngày, IPA, nghĩa |
| `knowledge/tinh-cach-tro-ly.md` | Tính cách "Cô Toán Song Ngữ" (system instruction cho Gemini trong app) |

Rule và skill dành cho agent đang xây app (trong Antigravity). Tính cách trợ lý dành cho Gemini chạy bên trong app khi học sinh dùng.

## Bước 1 – Cài Antigravity và mở thư mục
1. Cài Antigravity, đăng nhập bằng tài khoản Google.
2. Giải nén gói, chọn **Open Folder** và mở thư mục `tu-vung-toan`.
3. Nếu bạn dùng bản Antigravity cũ, thư mục có thể là `.agent/` (số ít). Bản mới mặc định `.agents/` nhưng vẫn đọc được `.agent/`.

## Bước 2 – Kiểm tra rule và skill đã nhận
1. Mở phần **Customizations / Settings → Rules** và **Skills** của Antigravity.
2. Xác nhận thấy rule `du-an-tu-vung-toan` và ba skill. Giới hạn mỗi file rule là khoảng 12.000 ký tự; các file trong gói đều nằm dưới mức này.
3. Muốn dùng skill cho mọi dự án: chép thư mục skill vào `~/.gemini/config/skills/`.

## Bước 3 – Chạy lần lượt các lệnh (dán vào Agent Manager)
**Lệnh 1 – Tạo dữ liệu thẻ**
```
Đọc knowledge/tu-vung-toan-6-9.csv và tính cách trong knowledge/tinh-cach-tro-ly.md.
Dùng skill tao-the-tu-vung để tạo data/words.json cho ngày 1 đến ngày 5 trước.
Cho tôi xem 6 thẻ mẫu để duyệt.
```
Khi bạn duyệt, yêu cầu làm tiếp các ngày còn lại (mỗi lần 5–10 ngày để dễ rà soát).

**Lệnh 2 – Tạo bài kiểm tra**
```
Dùng skill tao-bai-kiem-tra để tạo bài kiểm tra 6 câu cho ngày 1 đến ngày 5
và hàm chọn từ ôn theo hộp Leitner. Viết kèm kiểm thử đơn giản.
```

**Lệnh 3 – Dựng app (giai đoạn 1)**
```
Dùng skill dung-webapp-hoc-tu, làm giai đoạn 1: màn hình Hôm nay, Thẻ từ,
Kiểm tra, Kết quả; lưu tiến độ bằng localStorage. Chạy thử trên màn hình 360 px
rồi báo cách chạy.
```

**Lệnh 4 – Tích hợp Gemini (giai đoạn 3)**
```
Làm giai đoạn 3 của skill dung-webapp-hoc-tu: API route /api/tro-ly gọi Gemini,
system instruction lấy từ knowledge/tinh-cach-tro-ly.md. Khóa API đọc từ
biến môi trường GEMINI_API_KEY; hướng dẫn tôi tạo file .env.local.
```

## Bước 4 – Tạo khóa Gemini API
1. Vào Google AI Studio, tạo API key.
2. Tạo file `.env.local` ở gốc dự án: `GEMINI_API_KEY=khóa_của_bạn`.
3. Thêm `.env.local` vào `.gitignore`. Không dán khóa vào khung chat với agent.
4. Khi đưa lên Vercel, đặt khóa trong mục Environment Variables.

## Bước 5 – Rà soát trước khi cho học sinh dùng
- Đối chiếu nghĩa tiếng Việt với SGK Toán KNTT từng lớp.
- Nghe thử toàn bộ phát âm; từ nào đọc sai thì thêm file audio riêng.
- Duyệt từng thẻ: đổi `status` từ `draft` sang `approved`.
- Thử với 10–15 học sinh trong 7 ngày, ghi lại từ nào hay sai rồi chỉnh.

## Lưu ý
- Tên thư mục, đường dẫn menu và giới hạn của Antigravity có thể thay đổi theo phiên bản; nếu khác, xem tài liệu trên antigravity.google/docs.
- Chủ đề từng ngày đang bám mạch chương SGK KNTT theo trí nhớ, chưa đối chiếu trực tiếp với sách: hãy rà lại trước khi phát hành.
