import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Box, Button, Modal, Text, TextInput, Textarea } from "@mantine/core"
import { useStringParam } from "@/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUserForProfile from "@/features/users/queries/getUserForProfile"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { Form, useForm, zodResolver } from "@mantine/form"
import updateProfile from "@/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { EditProfileForm } from "@/features/users/forms/EditProfileForm"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")
  const [user] = useQuery(
    getUserForProfile,
    { username },
    {
      enabled: !!username,
    }
  )

  const [opened, { open, close }] = useDisclosure(false)

  const currentUser = useCurrentUser()

  const isOwner = currentUser?.id === user?.id

  if (!user) return <Text>User not found :(</Text>

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {
    onSuccess: () => {
      showNotification({
        color: "green",
        title: "Success",
        message: "Profile updated",
      })
      close()
    },
  })

  const router = useRouter()

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          form.reset()
        }}
        title="Edit Profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username === user.username) {
              if (username) router.push(Routes.ProfilePage({ username }))
            }
          }}
          isSubmitting={isLoading}
        />
      </Modal>

      <Layout title="Username">
        <Vertical spacing="md">
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Text>Hello {user.name}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Bio: {user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  )
}

export default ProfilePage
