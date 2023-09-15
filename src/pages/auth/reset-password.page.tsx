import Layout from "@/core/layouts/Layout"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { Button, PasswordInput, Title, Text } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ResetPasswordInput, ResetPasswordInputType } from "@/features/auth/schemas"
import { useStringQuery } from "@/utils/utils"
import { Vertical } from "mantine-layout-components"

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQuery("token")

  const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword)

  const form = useForm<ResetPasswordInputType>({
    initialValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },
    validateInputOnBlur: true,

    validate: zodResolver(ResetPasswordInput),
  })

  if (!token) return <Text>Invalid token</Text>

  return (
    <Layout title="Reset Your Password">
      <div>
        <Title order={2}>Set a New Password</Title>

        {isSuccess && (
          <Vertical>
            <Title order={3}>Password Reset Successfully</Title>
            <Text>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </Text>
          </Vertical>
        )}

        {!isSuccess && (
          <form
            onSubmit={form.onSubmit(async (values) => {
              await $resetPassword({ ...values, token })
            })}
          >
            <Vertical fullW>
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password confirmation"
                {...form.getInputProps("passwordConfirmation")}
              />

              <Button loading={isLoading} disabled={!form.isValid()} type="submit">
                Submit
              </Button>
            </Vertical>
          </form>
        )}
      </div>
    </Layout>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
