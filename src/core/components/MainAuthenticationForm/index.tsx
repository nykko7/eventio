import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
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
import login from "@/features/auth/mutations/login"
import signup from "@/features/auth/mutations/signup"
import { Vertical } from "mantine-layout-components"
import { SignupInput } from "@/features/auth/schemas"
import { z } from "zod"

type LoginFormProps = {
  onSuccess?: (user: any) => void
}

type SignupFormType = z.infer<typeof SignupInput>

export const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key)

  return {
    ...inputProps,
    checked: inputProps.value,
  }
}

export function MainAuthenticationForm(props: LoginFormProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [$login, { isLoading: isLoggingIn }] = useMutation(login)
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup)

  const form = useForm<SignupFormType>({
    initialValues: {
      email: "",
      password: "",
      name: "",

      terms: false,
    },
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  })

  // const onLogin = async (values) => {
  //   const user = await $login(values)
  //   props.onSuccess?.(user)
  // }

  // const onSignUp = async (values) => {
  //   await $signup(values)
  // }

  const loading = isLoggingIn || isSigningUp

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Eventio, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <FacebookButton radius="xl">Facebook</FacebookButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            if (type === "login") {
              await $login(values)
            } else {
              await $signup(values)
            }
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                required
                placeholder="Your name"
                {...form.getInputProps("name")}
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
                {...bindCheckboxToForm(form, "terms")}
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
            <Button disabled={!form.isValid()} loading={loading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
