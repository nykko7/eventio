import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { MainAuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"
import { Button } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { GlobalModal } from "@/modals"
import { confirmDelete } from "@/utils/mantine-utils"

const Home: BlitzPage = () => {
  const user = useCurrentUser()

  const deleteAccountMutation = () => {
    console.log("Deleting account...")
  }

  return (
    <Layout title="Home">
      {user && (
        <Vertical center fullW fullH>
          <h1>Welcome to Eventio</h1>
          <Button
            onClick={() => {
              openContextModal({
                modal: GlobalModal.becomePro,
                title: "Modal title",
                innerProps: {},
              })
            }}
          >
            Become a pro modal
          </Button>
          <Button
            color="red"
            onClick={() => {
              confirmDelete(() => {
                deleteAccountMutation()
              }, {})
            }}
          >
            Delete account
          </Button>
        </Vertical>
      )}

      {!user && <MainAuthenticationForm />}
    </Layout>
  )
}

export default Home
