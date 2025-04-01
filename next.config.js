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
  // Remove experimental features that might cause issues
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  // },
  // Remove webpack config as it might cause issues
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     config.devtool = 'source-map';
  //   }
  //   return config;
  // },
  // Remove env config as it's handled by amplify.yml
  // env: {
  //   NODE_ENV: process.env.NODE_ENV,
  // },
}

module.exports = nextConfig 