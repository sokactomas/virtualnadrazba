/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s.unitedclassifieds.sk', 'img.unitedclassifieds.sk'],
  },
}

module.exports = nextConfig
