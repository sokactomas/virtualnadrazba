/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s.unitedclassifieds.sk', 'img.unitedclassifieds.sk'],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    PLATFORMCORE_PLATFORMCORECONFIG_APPNAME: process.env.PLATFORMCORE_PLATFORMCORECONFIG_APPNAME
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
  },
}

module.exports = nextConfig
