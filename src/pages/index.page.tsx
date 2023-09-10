import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { MainAuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"
import { Button } from "@mantine/core"
import adminOnlyMutation from "@/features/auth/mutations/adminOnlyMutation"
import { useMutation } from "@blitzjs/rpc"

const Home: BlitzPage = () => {
  const user = useCurrentUser()
  const [$adminOnlyMutation] = useMutation(adminOnlyMutation)

  return (
    <Layout title="Home">
      {user?.isAdmin && (
        <Vertical center fullW fullH>
          <h1>Welcome to Eventio</h1>
          {!user.isAdmin && (
            <>
              <h2>You are an admin</h2>
              <Button onClick={() => $adminOnlyMutation({})}>Admin Only Button</Button>
            </>
          )}
        </Vertical>
      )}

      {!user && <MainAuthenticationForm />}
    </Layout>
  )
}

export default Home
