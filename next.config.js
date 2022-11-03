/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s.unitedclassifieds.sk', 'img.unitedclassifieds.sk'],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
  },
}

module.exports = nextConfig
