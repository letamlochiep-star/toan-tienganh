'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).tvt_route) {
      (window as any).tvt_route();
    }
  }, []);

  return (
    <>
      <div className="top">
        <div className="wrap">
          <div className="brandrow">
            <div className="brand">
              <b>Từ vựng Toán mỗi ngày</b>
              <span id="sub">Lớp 6–9 · SGK Kết nối tri thức</span>
            </div>
            <div className="chips">
              <span className="chip" title="Số ngày học liên tiếp">
                🔥 Chuỗi <b id="streak">0</b> ngày
              </span>
              <span className="chip" title="Số ngày hoàn thành">
                📚 Hoàn thành <b id="donecount">0</b>/40
              </span>
              <span className="chip" title="Tổng lượt truy cập website">
                👁️ <b id="visitcount">...</b> lượt xem
              </span>
            </div>
          </div>
          <nav className="tabs" id="tabs" aria-label="Chức năng">
            <a href="#hom-nay" data-r="hom-nay">Hôm nay</a>
            <a href="#toan-6" data-r="toan-6">Toán 6 (42 bài)</a>
            <a href="#kiem-tra" data-r="kiem-tra">Kiểm tra</a>
            <a href="#lo-trinh" data-r="lo-trinh">Lộ trình 40 ngày</a>
            <a href="#tu-dien" data-r="tu-dien">Từ điển</a>
            <a href="#on-tap" data-r="on-tap">Ôn tập</a>
            <a href="#thong-ke" data-r="thong-ke">Thống kê</a>
            <a href="#mo-rong" data-r="mo-rong">Mở rộng</a>
          </nav>
        </div>
      </div>
      <div className="wrap">
        <main id="view" tabIndex={-1}></main>
      </div>

      <footer className="app-footer">
        <div className="wrap footer-wrap">
          <div className="footer-author">
            <b>© Bản quyền nội dung & Phần mềm: Thầy Lê Tâm</b>
            <span>Giáo viên trường THCS Quang Trung, Phường Xuân Hương, TP. Đà Lạt, Tỉnh Lâm Đồng</span>
          </div>
          <div className="footer-contact">
            <span className="footer-badge">Toán Song Ngữ THCS</span>
            <span>📞 Liên hệ / Zalo: <a href="tel:0913443127"><b>0913.443.127</b></a></span>
          </div>
        </div>
      </footer>

      <div className="toast" id="toast" role="status" aria-live="polite" hidden></div>
      <Script src="/word-icons.js" strategy="beforeInteractive" />
      <Script src="/toan6-data.js" strategy="beforeInteractive" />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
