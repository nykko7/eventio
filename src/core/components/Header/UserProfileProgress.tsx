import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { RingProgress, Tooltip, Text, List } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import Link from "next/link"

const UserProfileProgress = () => {
  const user = useCurrentUser()
  if (!user) return null

  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile picture",
    },
    {
      key: "coverImageKey",
      label: "Cover image",
    },
  ]

  const existingKeys = keys.filter((key) => user[key.key])

  const missingKeys = keys.filter((key) => !user[key.key])

  const progress = Math.round((existingKeys.length / keys.length) * 100)

  if (progress === 100) return null

  return (
    <Vertical>
      <Link href={Routes.EditProfilePage()}>
        <Tooltip
          label={
            <Vertical spacing="xs">
              <Text fw={"bold"}>{`Profile progress (${progress}%)`}</Text>
              <Vertical spacing={0}>
                <Text>Missing:</Text>
                <List>
                  {missingKeys.map(({ label }) => (
                    <List.Item key={label}>
                      <Text>{label}</Text>
                    </List.Item>
                  ))}
                </List>
              </Vertical>
            </Vertical>
          }
          color="dark"
        >
          <RingProgress
            size={25}
            thickness={4}
            roundCaps
            sections={[{ value: progress, color: "cyan" }]}
          />
        </Tooltip>
      </Link>
    </Vertical>
  )
}

export default UserProfileProgress
