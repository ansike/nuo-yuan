/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cddwlp.cn'],
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
