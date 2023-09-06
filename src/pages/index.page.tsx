import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Horizontal, Vertical } from "mantine-layout-components"
import { UserInfo } from "@/core/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Horizontal debug spacing="xl" fullH fullW center>
        <Vertical debug spacing="0">
          <UserInfo />
        </Vertical>
      </Horizontal>
    </Layout>
  )
}

export default Home
