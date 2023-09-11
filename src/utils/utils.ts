import { useRouter } from "next/router"

export const useStringParam = (param: string) => {
  const router = useRouter()
  const value = router.query[param] as string
  return value
}
