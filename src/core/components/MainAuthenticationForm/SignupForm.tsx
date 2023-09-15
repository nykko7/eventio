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
  PaperProps,
} from "@mantine/core"

import { FacebookButton, GoogleButton } from "./SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import signup from "@/features/auth/mutations/signup"
import { Vertical } from "mantine-layout-components"
import { SignupInput, SignupInputType } from "@/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { SocialButtonsAuth } from "./SocialButtonsAuth"
import { PromiseReturnType } from "blitz"
import { ReactFC } from "types"

export const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key)

  return {
    ...inputProps,
    checked: inputProps.value,
  }
}

export const SignupForm: ReactFC<{
  toggle: () => void
}> = ({ toggle }) => {
  const [$signup, { isLoading }] = useMutation(signup)

  const form = useForm<SignupInputType>({
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

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Eventio, register with
        </Text>

        <SocialButtonsAuth />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            await $signup(values)
          })}
        >
          <Stack>
            <TextInput
              label="Name"
              required
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <Vertical fullW spacing={"3px"}>
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                radius="md"
                w="100%"
              />
              <Text
                fz="xs"
                color="dimmed"
                sx={{ alignSelf: "flex-end" }}
                component={Link}
                href={Routes.ForgotPasswordPage()}
              >
                Forgot password?
              </Text>
            </Vertical>

            <Checkbox
              label="I accept terms and conditions"
              {...bindCheckboxToForm(form, "terms")}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" onClick={toggle} size="xs">
              Already have an account? Login
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
