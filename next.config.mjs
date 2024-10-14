/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'danny-job-board.s3.amazonaws.com',
          },
        ],
      },
};

export default nextConfig;
