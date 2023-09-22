import { Form, UseFormReturnType } from "@mantine/form"
import { Horizontal, Vertical } from "mantine-layout-components"
import React from "react"
import { UpdateProfileInputType } from "../schemas"
import {
  Button,
  FileInput,
  Loader,
  TextInput,
  Textarea,
  Text,
  Image,
  Indicator,
  ActionIcon,
  Tooltip,
  Avatar,
} from "@mantine/core"
import { ReactFC } from "types"
import { UploadButton, useUploadThing } from "@/core/components/UploadThing"
import { notifications, showNotification } from "@mantine/notifications"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { useBoolean } from "react-hanger"
import { getUploadthingUrl } from "@/utils/image-utils"
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
