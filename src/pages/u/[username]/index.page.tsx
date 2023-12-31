import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Alert, Image, Button, Modal, Text } from "@mantine/core"
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
import { getUploadthingUrl } from "@/utils/image-utils"

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
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const [$updateProfile, { isLoading }] = useMutation(updateProfile)

  const [$requestVerificationEmail, { isLoading: isSendingEmail, isSuccess }] =
    useMutation(requestVerificationEmail)

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
            showNotification({
              color: "green",
              title: "Success",
              message: "Profile updated",
            })
            if (username !== user.username) {
              if (username) router.push(Routes.ProfilePage({ username }))
            } else {
              router.reload()
            }
            close()
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
                        showNotification({
                          color: "green",
                          title: "Success",
                          message: "Verification email sent",
                        })
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
          {user.coverImageKey && (
            <Image
              width="300px"
              height="200px"
              fit="cover"
              src={getUploadthingUrl(user.coverImageKey)}
            />
          )}
          <Text>Hello {user.name}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Bio: {user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  )
}

export default ProfilePage
