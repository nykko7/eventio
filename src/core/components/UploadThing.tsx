import { generateComponents } from "@uploadthing/react"

import type { OurFileRouter } from "@/uploadthing/uploading-router"

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()
