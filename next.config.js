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
  // Add debugging options
  webpack: (config, { dev, isServer }) => {
    // Add source maps in development
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
  // Ensure proper handling of environment variables
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
  // Add experimental features that might help with build
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig 