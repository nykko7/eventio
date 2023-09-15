import Layout from "src/core/layouts/Layout"

import forgotPassword from "@/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Button, TextInput, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { Vertical } from "mantine-layout-components"
import { ForgotPasswordInput, ForgotPasswordInputType } from "@/features/auth/schemas"
import { notifications } from "@mantine/notifications"

const ForgotPasswordPage: BlitzPage = () => {
  const [$forgotPassword, { isSuccess, isLoading }] = useMutation(forgotPassword)

  const form = useForm<ForgotPasswordInputType>({
    initialValues: {
      email: "",
    },

    validate: zodResolver(ForgotPasswordInput),
  })

  return (
    <Layout title="Forgot Your Password?">
      <Title order={3}>Forgot your password?</Title>

      {isSuccess && (
        <Vertical spacing={"xs"}>
          <Title order={4}>Request Submitted</Title>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </Vertical>
      )}

      {!isSuccess && (
        <form
          onSubmit={form.onSubmit(async (values) => {
            await $forgotPassword(values)
            notifications.show({
              color: "green",
              title: "Success",
              message:
                "If your email is in our system, you will receive instructions to reset your password shortly.",
            })
          })}
        >
          <Vertical>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Button disabled={!form.isValid()} loading={isLoading} type="submit">
              Submit
            </Button>
          </Vertical>
        </form>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
