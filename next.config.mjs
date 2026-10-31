// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/toan-6',
        destination: '/toan6.html',
      },
      {
        source: '/lop-6',
        destination: '/toan6.html',
      },
      {
        source: '/toan-7',
        destination: '/toan7.html',
      },
      {
        source: '/lop-7',
        destination: '/toan7.html',
      },
      {
        source: '/toan-8',
        destination: '/toan8.html',
      },
      {
        source: '/lop-8',
        destination: '/toan8.html',
      },
      {
        source: '/toan-9',
        destination: '/toan9.html',
      },
      {
        source: '/lop-9',
        destination: '/toan9.html',
      },
    ];
  },
};

export default nextConfig;
