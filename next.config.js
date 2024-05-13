/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdn.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.foundersguide.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
