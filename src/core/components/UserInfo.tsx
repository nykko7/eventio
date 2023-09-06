import Link from "next/link"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import logout from "@/features/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import styles from "@/styles/Home.module.css"
import { Button } from "@mantine/core"

export const UserInfo = () => {
  const [logoutMutation] = useMutation(logout)
  const currentUser = useCurrentUser()

  if (!currentUser) return null

  return (
    <>
      <Button
        className={styles.button}
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </Button>
      <div>
        User id: <code>{currentUser.id}</code>
        <br />
        User role: <code>{currentUser.role}</code>
      </div>
    </>
  )
}
