import { Group } from "@mantine/core"
import { FacebookButton, GoogleButton } from "./SocialButtons"

export const SocialButtonsAuth = () => (
  <Group grow mb="md" mt="md">
    <GoogleButton radius="xl">Google</GoogleButton>
    <FacebookButton radius="xl">Facebook</FacebookButton>
  </Group>
)
