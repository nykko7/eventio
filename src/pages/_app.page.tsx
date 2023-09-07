import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React, { Suspense } from "react"
import { withBlitz } from "@/blitz-client"
import "@/styles/globals.css"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Suspense fallback="Loading...">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <Notifications position="top-right" />
          <Suspense fallback="Loading...">
            <Component {...pageProps} />
          </Suspense>
        </MantineProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
