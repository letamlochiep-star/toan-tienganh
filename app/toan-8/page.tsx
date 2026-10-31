'use client';

import { useEffect } from 'react';

export default function Toan8RedirectPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/toan8.html' + window.location.hash);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px', textAlign: 'center', background: '#eef1f8', color: '#141f3d' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Đang chuyển tới phòng học Toán 8 (39 bài)...</h2>
      <p style={{ color: '#56637f', marginBottom: '20px' }}>Toàn bộ 39 bài từ vựng tiếng Anh Toán lớp 8 chuẩn SGK (780 thuật ngữ, đa thức, hình học, hội thoại tương tác).</p>
      <a href="/toan8.html" style={{ background: '#2c4bd6', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Bấm vào đây nếu trình duyệt không tự chuyển
      </a>
    </div>
  );
}
