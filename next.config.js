/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Ensure proper handling of static files
  distDir: '.next',
  generateEtags: true,
}

module.exports = nextConfig 