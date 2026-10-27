'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/' && !window.location.hash) {
      window.location.replace('/index.html');
    }
  }, []);

  return (
    <main style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/index.html"
        title="Từ vựng Toán mỗi ngày"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />
    </main>
  );
}
