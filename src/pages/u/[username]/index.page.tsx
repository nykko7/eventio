import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Alert, Box, Button, Modal, Text, TextInput, Textarea } from "@mantine/core"
import { useStringParam } from "@/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUserForProfile from "@/features/users/queries/getUserForProfile"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { Form, useForm, zodResolver } from "@mantine/form"
import updateProfile from "@/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { notifications, showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { EditProfileForm } from "@/features/users/forms/EditProfileForm"
import { IconAlertCircle } from "@tabler/icons-react"
import requestVerificationEmail from "@/features/auth/mutations/requestVerificationEmail"

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

  const router = useRouter()

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

  const [$requestVerificationEmail, { isLoading: isSendingEmail, isSuccess }] = useMutation(
    requestVerificationEmail,
    {
      onSuccess: () => {
        showNotification({
          color: "green",
          title: "Success",
          message: "Verification email sent",
        })
      },
    }
  )

  if (!user) return <Text>User not found :(</Text>

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
          {isOwner && !currentUser?.emailVerifiedAt && (
            <Alert
              icon={<IconAlertCircle size={"1rem"} />}
              color="red"
              variant="outline"
              title={isSuccess ? "Email sent!" : "Warning"}
            >
              <Vertical>
                {!isSuccess && (
                  <>
                    <Text>Your email is still not verified. Please check your inbox.</Text>
                    <Button
                      size="xs"
                      color="red"
                      variant="light"
                      loading={isSendingEmail}
                      onClick={async () => {
                        await $requestVerificationEmail()
                      }}
                    >
                      Resend email
                    </Button>
                  </>
                )}
                {isSuccess && (
                  <Text size="xs">
                    The email has been sent and should arrive in the next few minutes.
                    <br />
                    Please be patient and check your spam folder.
                  </Text>
                )}
              </Vertical>
            </Alert>
          )}
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
