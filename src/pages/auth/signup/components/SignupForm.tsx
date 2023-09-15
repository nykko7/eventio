import signup from "@/features/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Vertical } from "mantine-layout-components"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values) => {
    await signupMutation(values)
  }

  return (
    <Vertical>
      <Title>Create an Account</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name..."
          {...form.getInputProps("name")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps("password")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  )
}

export default SignupForm
