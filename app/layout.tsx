import './globals.css';

export const metadata = {
  title: 'Từ vựng Toán mỗi ngày',
  description: 'Học từ vựng Toán Tiếng Anh cho học sinh THCS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
