import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
}

export default withPWA(nextConfig)
