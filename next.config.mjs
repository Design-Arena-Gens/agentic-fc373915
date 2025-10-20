/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias['@clerk/nextjs/server$'] = new URL('./src/mocks/clerk-server.ts', import.meta.url).pathname;
      config.resolve.alias['@clerk/nextjs'] = new URL('./src/mocks/clerk.tsx', import.meta.url).pathname;
    }
    return config;
  },
};

export default nextConfig;