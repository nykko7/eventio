import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Anchor, AppShell, Footer, Header, Navbar, Text } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"

type Props = {
  title?: string
  children?: React.ReactNode
  maxWidth?: number
}

const Layout: BlitzLayout<Props> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={45} p="xs">
            <Horizontal fullH>
              <Anchor
                underline={false}
                color={"gray.3"}
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Eventio
              </Anchor>
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={60} p="xs">
            <Horizontal fullH fullW center>
              <Text fw="bold" fz="xs" color="dimmed">
                Copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullH fullW>
          <Suspense fallback="Loading...">{children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
