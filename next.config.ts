import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:locale(en|fr|es|de|ja|pt|ru|zh)/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
