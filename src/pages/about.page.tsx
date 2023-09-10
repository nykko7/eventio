import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <div>This is from about page</div>
    </Layout>
  )
}

AboutPage.authenticate = true

export default AboutPage
