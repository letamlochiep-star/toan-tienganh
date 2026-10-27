---
name: tao-bai-kiem-tra
description: Sinh bài kiểm tra nhanh 6 câu cho từng ngày học từ vựng Toán và lịch ôn tập Leitner từ data/words.json. Dùng khi cần tạo câu hỏi, đáp án, giải thích hoặc logic chấm điểm cho webapp.
---

## Mục tiêu
Tạo bài kiểm tra 6 câu cho mỗi ngày (3–4 phút) và logic chọn từ ôn theo hộp Leitner.

## Dạng câu hỏi (trộn đủ 4 dạng trong 6 câu)
1. `choose_meaning`: cho từ tiếng Anh, chọn nghĩa tiếng Việt (4 phương án).
2. `listen_choose`: phát âm từ, chọn từ đúng (4 phương án).
3. `fill_blank`: điền từ vào chỗ trống trong câu ví dụ (4 phương án).
4. `match_image`: nối từ với hình SVG.

## Quy tắc phương án nhiễu
- Lấy từ cùng `topic` hoặc cùng `grade` để gây nhầm lẫn hợp lý (ví dụ numerator và denominator).
- Không dùng phương án đúng hai lần; không dùng phương án nhiễu mà cũng đúng nghĩa.
- Trộn ngẫu nhiên vị trí đáp án đúng.

## Đầu ra (JSON mỗi câu)
```json
{
  "id": "q-0001-1",
  "word_id": "0001",
  "type": "choose_meaning",
  "prompt": "natural number",
  "options": ["số tự nhiên", "số nguyên", "số thực", "số hữu tỉ"],
  "answer_index": 0,
  "explain_vi": "natural number là số tự nhiên: 0, 1, 2, ..."
}
```

## Lịch ôn Leitner
| Hộp | Ôn lại sau |
| --- | --- |
| 1 | 1 ngày |
| 2 | 3 ngày |
| 3 | 7 ngày |
| 4 | 14 ngày |
| 5 | 30 ngày |
- Trả lời đúng: lên một hộp. Trả lời sai: về hộp 1.
- Mỗi ngày: 6 từ mới + tối đa 6 từ đến hạn ôn. Nếu quá nhiều từ đến hạn, ưu tiên từ ở hộp thấp.
- Cuối mỗi tuần thêm một ngày ôn tổng hợp, không có từ mới.

## Ràng buộc
- Chỉ dùng từ có `status: "approved"` trong bản chính thức; bản thử có thể dùng `draft`.
- Viết logic chấm và lịch ôn thành hàm thuần (dễ viết kiểm thử), tách khỏi giao diện.
