/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  distDir: 'build',
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
