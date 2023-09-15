import { useToggle } from "@mantine/hooks"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export function MainAuthenticationForm() {
  const [type, toggle] = useToggle(["login", "register"])

  return (
    <>
      {type === "login" && <LoginForm toggle={toggle} />}
      {type === "register" && <SignupForm toggle={toggle} />}
    </>
  )
}
