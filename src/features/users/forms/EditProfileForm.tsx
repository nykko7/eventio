import { Form, UseFormReturnType } from "@mantine/form"
import { Vertical } from "mantine-layout-components"
import React from "react"
import { UpdateProfileInputType } from "../schemas"
import { Button, TextInput, Textarea } from "@mantine/core"
import { ReactFC } from "types"
import UploadThingFileInput from "@/core/components/UploadThingFileInput"

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => void
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Vertical fullW>
        <TextInput
          w="100%"
          label="Name"
          required
          placeholder="Your name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          label="Bio"
          placeholder="Your bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
        <UploadThingFileInput form={form} name="avatarImageKey" label="Profile Picture" />
        <UploadThingFileInput form={form} name="coverImageKey" label="Cover Image" />

        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  )
}
