/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mjs', 'js', 'jsx', 'ts', 'tsx'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
