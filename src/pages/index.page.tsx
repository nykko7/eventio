import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Horizontal, Vertical } from "mantine-layout-components"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Horizontal debug spacing="xl" fullH fullW center>
        <Vertical debug spacing="0">
          <div>Hello</div>
          <div>World</div>
        </Vertical>
        <Vertical debug>
          <div>Hello</div>
          <div>World</div>
        </Vertical>
      </Horizontal>
    </Layout>
  )
}

export default Home
