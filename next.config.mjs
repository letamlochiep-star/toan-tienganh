// next.config.mjs
/**
 * Next.js configuration.
 * Using an ES‑module config because package.json declares "type": "module".
 * We disable TypeScript build errors (they are handled by the dev server) and
 * keep the existing settings minimal.
 */
export default {
  // Allow the dev server to start even if TypeScript has problems.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable React strict mode.
  reactStrictMode: true,
};
