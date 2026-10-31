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
    ];
  },
};

export default nextConfig;
