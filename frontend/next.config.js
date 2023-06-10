/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  distDir: 'build',
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
