import { createNextPageApiHandler } from "uploadthing/next-legacy"

import { ourFileRouter } from "@/uploadthing/uploading-router"
import { env } from "@/env.mjs"

const handler = createNextPageApiHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: env.UPLOADTHING_APP_ID,
    uploadthingSecret: env.UPLOADTHING_SECRET,
  },
})

export default handler
