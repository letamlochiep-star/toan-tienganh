'use client';

import { useEffect } from 'react';

export default function Toan9RedirectPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/toan9.html' + window.location.hash);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px', textAlign: 'center', background: '#eef1f8', color: '#141f3d' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Đang chuyển tới phòng học Toán 9 (32 bài)...</h2>
      <p style={{ color: '#56637f', marginBottom: '20px' }}>Toàn bộ 32 bài từ vựng tiếng Anh Toán lớp 9 chuẩn SGK (482 thuật ngữ, hệ phương trình, hình học không gian, hội thoại tương tác).</p>
      <a href="/toan9.html" style={{ background: '#2c4bd6', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Bấm vào đây nếu trình duyệt không tự chuyển
      </a>
    </div>
  );
}
