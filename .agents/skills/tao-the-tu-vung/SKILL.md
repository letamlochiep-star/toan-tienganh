---
name: tao-the-tu-vung
description: Tạo dữ liệu thẻ từ vựng Toán THCS (từ, IPA, nghĩa, câu ví dụ, mô tả hình SVG) từ file knowledge/tu-vung-toan-6-9.csv thành data/words.json cho webapp. Dùng khi cần sinh, bổ sung hoặc chỉnh dữ liệu thẻ từ.
---

## Mục tiêu
Biến mỗi dòng trong `knowledge/tu-vung-toan-6-9.csv` thành một thẻ từ đầy đủ trong `data/words.json`.

## Đầu vào
- `knowledge/tu-vung-toan-6-9.csv` (cột: day, grade, topic, term, ipa_us, meaning_vi).
- `knowledge/tinh-cach-tro-ly.md` để giữ giọng văn.

## Quy trình
1. Đọc CSV, giữ nguyên `term`, `ipa_us`, `meaning_vi`. Không đổi nghĩa.
2. Với mỗi từ, viết thêm:
   - `example_en`: một câu tiếng Anh ≤ 12 từ, đúng toán, bám chủ đề `topic`.
   - `example_vi`: bản dịch tiếng Việt tự nhiên.
   - `memory_tip`: một mẹo nhớ ngắn tiếng Việt (có thể để trống nếu không có mẹo tốt).
   - `image_hint`: một câu mô tả hình SVG cần vẽ.
   - `image_file`: tên file SVG dạng `ten-tu.svg` (viết thường, dấu gạch ngang).
3. Xuất JSON theo cấu trúc:
```json
{
  "id": "0001",
  "day": 1,
  "grade": 6,
  "topic": "so-tu-nhien",
  "term": "natural number",
  "ipa_us": "/ˈnætʃrəl ˈnʌmbər/",
  "meaning_vi": "số tự nhiên",
  "example_en": "0, 1, 2 are natural numbers.",
  "example_vi": "0, 1, 2 là các số tự nhiên.",
  "memory_tip": "",
  "image_hint": "Trục số có các điểm 0, 1, 2, 3.",
  "image_file": "natural-number.svg",
  "status": "draft"
}
```
4. Mọi thẻ mới có `status: "draft"`. Chỉ người dùng (giáo viên) mới đổi sang `approved`.
5. Sau khi sinh, in thống kê: tổng số thẻ, số thẻ theo từng lớp, danh sách thẻ nghi ngờ (câu ví dụ dài, nghĩa chưa chắc).

## Ràng buộc
- Không bịa từ mới ngoài CSV.
- Không dùng ví dụ có số liệu sai về toán học; tự kiểm tra lại từng câu.
- Không chép câu từ sách giáo khoa; tự viết câu mới.
