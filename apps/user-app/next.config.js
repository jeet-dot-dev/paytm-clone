/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/store', '@repo/db', '@repo/ui'],
};

export default nextConfig;