import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { EditProfileForm } from "@/features/users/forms/EditProfileForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import updateProfile from "@/features/users/mutations/updateProfile"
import { showNotification } from "@mantine/notifications"
import { useForm, zodResolver } from "@mantine/form"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { useRouter } from "next/router"
import getUserForEditingProfile from "@/features/users/queries/getUserForEditingProfile"

export const EditProfilePage: BlitzPage = () => {
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {
    onSuccess: () => {
      showNotification({
        color: "green",
        title: "Success",
        message: "Profile updated",
      })
    },
  })

  const [data] = useQuery(getUserForEditingProfile, {})

  const form = useForm<UpdateProfileInputType>({
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
    initialValues: {
      username: data?.username || "",
      name: data?.name || "",
      bio: data?.bio || "",
    },
  })

  const router = useRouter()

  return (
    <Layout title="EditProfile">
      <Vertical spacing="md">
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username) router.push(Routes.ProfilePage({ username }))
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  )
}

export default EditProfilePage