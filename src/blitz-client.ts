import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc"
import { notifications } from "@mantine/notifications"

export const authConfig = {
  cookiePrefix: "eventio",
}

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: {
          retry: 2,
        },
        mutations: {
          onSuccess: async () => {
            // N.B. this will be overridden in case you
            // define onSuccess() inside your `useMutation` options
            const queryClient = getQueryClient()
            await queryClient.invalidateQueries()
          },
          onError: async (error: any) => {
            notifications.show({
              title: "Error",
              message: error.message,
              color: "red",
            })
          },
        },
      },
    }),
  ],
})
