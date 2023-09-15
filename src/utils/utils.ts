import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

// export const useStringParam = (param: string) => {
//   const router = useRouter()
//   const value = router.query[param] as string
//   return value
// }

export const useStringParam = (name) => {
  const param = useParam(name, "string")
  const value = param as string
  return value
}

export const useStringQuery = (name) => {
  const router = useRouter()
  const value = router.query[name] as string
  return value
}
