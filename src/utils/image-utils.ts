export const getUploadthingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://utfs.io/f/${fileKey}` : ""
}

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return ""
  const [first, second] = name.toUpperCase().split(" ")
  return `${first ? first[0] : ""}${second ? second[0] : ""}`
}
