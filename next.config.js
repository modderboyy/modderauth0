/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gisqgjbgbqrassitzjla.supabase.co'],
  },
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig