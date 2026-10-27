# Quy tắc dự án: Webapp học từ vựng tiếng Anh Toán THCS (lớp 6–9)

## Mục tiêu
Xây webapp giúp học sinh THCS học 6 từ vựng tiếng Anh chuyên ngành Toán mỗi ngày, trong 40 ngày, bám sách giáo khoa Toán "Kết nối tri thức với cuộc sống" (KNTT).

## Nguồn dữ liệu duy nhất
- Toàn bộ từ vựng nằm trong `knowledge/tu-vung-toan-6-9.csv`. Không tự thêm hoặc đổi nghĩa từ nếu chưa được người dùng đồng ý.
- Cột: `day, grade, topic, term, ipa_us, meaning_vi`. Câu ví dụ được sinh bằng skill `tao-the-tu-vung`, lưu vào `data/words.json`.
- Tính cách trợ lý AI trong app nằm ở `knowledge/tinh-cach-tro-ly.md`. Dùng nội dung file này làm system instruction khi gọi Gemini API.

## Quy tắc kỹ thuật
- Ngôn ngữ giao diện: tiếng Việt. Từ vựng và câu ví dụ: tiếng Anh.
- Ưu tiên điện thoại (mobile-first), nút lớn, chữ phiên âm rõ, dùng được khi mạng yếu.
- Bản đầu: Next.js hoặc HTML/JS thuần, dữ liệu từ file JSON, lưu tiến độ bằng localStorage. Chưa làm tài khoản và cơ sở dữ liệu.
- Phát âm: dùng Web Speech API (giọng en-US) làm phương án mặc định; có chỗ để thay bằng file audio sau này.
- Khóa API Gemini chỉ đặt ở biến môi trường phía máy chủ (`GEMINI_API_KEY`). Tuyệt đối không ghi khóa vào mã nguồn, vào file dữ liệu hoặc vào trình duyệt.
- Mỗi lần chạy xong một tác vụ lớn, báo cáo ngắn: đã làm gì, file nào thay đổi, cách chạy thử.

## Quy tắc nội dung
- Phiên âm dùng IPA giọng Mỹ. Từ Anh–Mỹ khác nhau (trapezoid/trapezium, cuboid/rectangular prism) hiển thị cả hai, giọng Mỹ ghi trước.
- Nghĩa tiếng Việt dùng đúng thuật ngữ SGK Toán KNTT. Không chắc thì đánh dấu `CẦN_RÀ_SOÁT` thay vì đoán.
- Câu ví dụ: ngắn (tối đa 12 từ), từ vựng đơn giản, đúng toán học, bám nội dung bài của ngày đó.
- Hình minh họa: tự tạo bằng SVG, không sao chép hình từ SGK hay từ web.
- Không hiển thị nội dung dài chép từ SGK; chỉ dùng thuật ngữ và câu tự viết.

## Cách làm việc
1. Trước khi viết mã, đọc `knowledge/` và `docs/`.
2. Việc nào có skill phù hợp (`tao-the-tu-vung`, `tao-bai-kiem-tra`, `dung-webapp-hoc-tu`) thì làm theo skill.
3. Chạy thử trước khi báo hoàn thành; nếu không chạy thử được, nói rõ.
