import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
  images: {
    domains: ['repobeats.axiom.co', 'cdn.jsdelivr.net'],
  },
}

export default withPWA(nextConfig)
