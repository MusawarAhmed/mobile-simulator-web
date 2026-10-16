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
  async redirects() {
    return [
      {
        source: '/subscription/:path*',
        destination: '/support/subscription-doesnt-work-on-chrome',
        permanent: false,
      },
      {
        source: '/account/:path*',
        destination: '/support/subscription-doesnt-work-on-chrome',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
