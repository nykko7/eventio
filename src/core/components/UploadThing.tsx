import { generateComponents } from "@uploadthing/react"
import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { OurFileRouter } from "@/uploadthing/uploading-router"

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
