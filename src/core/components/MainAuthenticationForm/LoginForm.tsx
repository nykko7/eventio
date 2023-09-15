import { useForm, zodResolver } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  PaperProps,
} from "@mantine/core"

import { useMutation } from "@blitzjs/rpc"
import login from "@/features/auth/mutations/login"
import { Vertical } from "mantine-layout-components"
import { LoginInputType, LoginInput } from "@/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { SocialButtonsAuth } from "./SocialButtonsAuth"
import { ReactFC } from "types"

export const LoginForm: ReactFC<{
  toggle: () => void
}> = ({ toggle }) => {
  const [$login, { isLoading }] = useMutation(login)

  const form = useForm<LoginInputType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  })

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Eventio, login with
        </Text>

        <SocialButtonsAuth />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            await $login(values)
          })}
        >
          <Stack>
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
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor onClick={toggle} component="button" type="button" color="dimmed" size="xs">
              Don't have an account? Register
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
