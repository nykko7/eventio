import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import {
  Anchor,
  AppShell,
  Box,
  Button,
  Footer,
  Header,
  Indicator,
  Loader,
  Modal,
  Text,
  Tooltip,
} from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "../components/RootErrorFallback"
import { useRouter } from "next/router"
import Conditional from "conditional-wrap"
import UserAvatar from "../components/UserAvatar"
import UserProfileProgress from "../components/Header/UserProfileProgress"
import OnboardingWizard from "../components/OnboardingWizard"

type Props = {
  title?: string
  children?: React.ReactNode
  maxWidth?: number
}

const Layout: BlitzLayout<Props> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear()
  const [logoutMutation] = useMutation(logout)

  const router = useRouter()
  const user = useCurrentUser()

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
          <Header height={55} p="xs">
            <Horizontal fullH spaceBetween>
              <Anchor
                underline={false}
                color={"gray.3"}
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Eventio
              </Anchor>

              {user && (
                <Horizontal center>
                  <Horizontal center spacing={"xs"}>
                    <Conditional
                      condition={!!user.username}
                      wrap={(children) => {
                        return (
                          <Link
                            href={Routes.ProfilePage({
                              username: user.username as string,
                            })}
                          >
                            {children}
                          </Link>
                        )
                      }}
                    >
                      <Horizontal>
                        <Conditional
                          condition={user.isAdmin}
                          wrap={(children) => (
                            <Indicator
                              color="none"
                              position="bottom-end"
                              label={
                                <Tooltip label="Admin User" color="dark">
                                  <Box>
                                    <IconUserShield size={15} />
                                  </Box>
                                </Tooltip>
                              }
                            >
                              {children}
                            </Indicator>
                          )}
                        >
                          <UserAvatar user={user} />
                        </Conditional>
                        <Text>{user.name}</Text>
                      </Horizontal>
                    </Conditional>
                    <UserProfileProgress />
                  </Horizontal>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation()
                      router.push("/")
                    }}
                  >
                    Logout
                  </Button>
                </Horizontal>
              )}
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
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical center fullH fullW>
                  <Loader />
                </Vertical>
              }
            >
              <Modal
                size={"xl"}
                centered
                title="Onboarding Modal"
                opened={!user?.onboarded}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                onClose={() => {}}
              >
                <OnboardingWizard />
              </Modal>
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
