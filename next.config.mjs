/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mjs', 'js', 'jsx', 'ts', 'tsx'],
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.dmclk.ru' },
      { protocol: 'https', hostname: 'lugansk.domclick.ru' },
    ],
  },
};

export default nextConfig;
