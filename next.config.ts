import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin de Turbopack-root op deze map (web/), zodat een eventuele lockfile
  // in een bovenliggende map de module-resolutie niet meer in de war stuurt.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
