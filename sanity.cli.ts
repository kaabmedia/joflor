import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Auto-updates Studio dependencies. Zet op false als je versies handmatig wilt beheren.
   */
  autoUpdates: true,
});
