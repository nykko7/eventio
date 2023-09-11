import Layout from "@/core/layouts/Layout"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const onSubmit = async (values) => {
    assert(token, "token is required.")
    await resetPasswordMutation({ ...values, token })
  }

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validate: {},
  })

  return (
    <Layout title="Reset Your Password">
      <div>
        <h1>Set a New Password</h1>

        {isSuccess ? (
          <div>
            <h2>Password Reset Successfully</h2>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label="Password" {...form.getInputProps("email")} />
            <PasswordInput
              withAsterisk
              label="Password confirmation"
              {...form.getInputProps("email")}
            />

            <Button type="submit">Submit</Button>
          </form>
        )}
      </div>
    </Layout>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
