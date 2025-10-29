/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  basePath: isProd ? '/next-js-futuristic' : '',
  assetPrefix: isProd ? '/next-js-futuristic' : '',
}

module.exports = nextConfig
