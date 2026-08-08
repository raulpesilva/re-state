import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

export default withMDX({
  agentRules: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/getting-started/:path*',
        destination: '/docs/getting-started/:path*',
        permanent: true,
      },
      {
        source: '/methods/:path*',
        destination: '/docs/methods/:path*',
        permanent: true,
      },
    ];
  },
});
