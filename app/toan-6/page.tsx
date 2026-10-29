'use client';

import { useEffect } from 'react';

export default function Toan6RedirectPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/toan6.html' + window.location.hash);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px', textAlign: 'center', background: '#eef1f8', color: '#141f3d' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Đang chuyển tới phòng học Toán 6 (42 bài)...</h2>
      <p style={{ color: '#56637f', marginBottom: '20px' }}>Toàn bộ 42 bài từ vựng tiếng Anh Toán lớp 6 kèm hội thoại Mr. Pi, Tron, Vuong và luyện nghe.</p>
      <a href="/toan6.html" style={{ background: '#2c4bd6', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Bấm vào đây nếu trình duyệt không tự chuyển
      </a>
    </div>
  );
}
