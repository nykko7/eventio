import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Text } from "@mantine/core"
import { useStringQuery } from "@/utils/utils"
import { useQuery } from "@blitzjs/rpc"
import verifyEmailToken from "@/features/auth/queries/verifyEmailToken"

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQuery("token")

  const [result, { isSuccess, isError }] = useQuery(
    verifyEmailToken,
    {
      token: token,
    },
    {
      enabled: !!token,
    }
  )

  return (
    <Layout title="VerifyEmail">
      <Vertical spacing="md">
        <>
          {result && isSuccess && (
            <Text size="lg" weight={500}>
              Your email has been verified
            </Text>
          )}
          {isError && (
            <Text size="lg" weight={500}>
              The token is invalid or expired
            </Text>
          )}
        </>
      </Vertical>
    </Layout>
  )
}

export default VerifyEmailPage
