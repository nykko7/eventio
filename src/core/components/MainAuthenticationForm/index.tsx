import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"

import { FacebookButton, GoogleButton } from "./SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import { FORM_ERROR } from "../Form"
import { AuthenticationError } from "blitz"
import login from "@/features/auth/mutations/login"
import signup from "@/features/auth/mutations/signup"

type LoginFormProps = {
  onSuccess?: (user: any) => void
}

export function AuthenticationForm(props: LoginFormProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [$login] = useMutation(login)
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  const onLogin = async (values) => {
    const user = await $login(values)
    props.onSuccess?.(user)
  }

  const onSignUp = async (values) => {
    try {
      await signupMutation(values)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  const onSubmit = (values) => {
    if (type === "login") {
      onLogin(values)
    } else {
      onSignUp(values)
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Eventio, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            {...form.getInputProps("email")}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
