/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatea-bucket.s3.amazonaws.com", "s2.coinmarketcap.com"],
  },
};

module.exports = nextConfig;
