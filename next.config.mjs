import withPWA from 'next-pwa';

const withPwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['images.unsplash.com'] },
};

export default withPwa(nextConfig);
