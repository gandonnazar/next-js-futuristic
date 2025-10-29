/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  basePath: '/next-js-futuristic',
  assetPrefix: '/next-js-futuristic',
}

module.exports = nextConfig
