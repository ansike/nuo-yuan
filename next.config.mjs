/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: [""],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/page/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
