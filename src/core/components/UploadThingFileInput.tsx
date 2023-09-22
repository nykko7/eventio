import { notifications } from "@mantine/notifications"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { Horizontal, Vertical } from "mantine-layout-components"
import { useBoolean } from "react-hanger"
import { useUploadThing } from "./UploadThing"
import { ActionIcon, Image, FileInput, Indicator, Loader, Text, Tooltip } from "@mantine/core"
import { getUploadthingUrl } from "@/utils/image-utils"
import { ReactFC } from "types"
import { UseFormReturnType } from "@mantine/form"

const UploadThingFileInput: ReactFC<{
  form: UseFormReturnType<any>
  name: string
  label: string
}> = ({ form, name, label }) => {
  const loading = useBoolean(false)

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      loading.setFalse()
      notifications.show({
        message: "Image uploaded!",
        color: "green",
        icon: <IconPhoto size={16} />,
      })
      // form.setFieldValue("avatarImageKey", permittedFileInfo?.[0]?.key)
      const fileKey = files?.[0]?.key
      if (fileKey) {
        form.setFieldValue(name, fileKey)
      }
    },
    onUploadError: () => {
      loading.setFalse()
      notifications.show({
        message: "Image upload failed!",
        color: "red",
        icon: <IconPhoto size={16} />,
      })
    },
  })

  const existingImageKey = form.values[name]
  return (
    <Vertical>
      <Horizontal spacing="xs" center>
        <Text size="sm" weight={500}>
          {label}
        </Text>
        {loading.value && <Loader size={"xs"} />}
      </Horizontal>
      {existingImageKey && (
        <Indicator
          color="none"
          label={
            <Tooltip color="dark" label="Clear image">
              <ActionIcon
                onClick={() => {
                  form.setFieldValue(name, "")
                }}
                variant="light"
                size="xs"
              >
                <IconX size={13} />
              </ActionIcon>
            </Tooltip>
          }
        >
          <Image width={60} radius="sm" src={getUploadthingUrl(existingImageKey)} />
        </Indicator>
      )}
      {!existingImageKey && (
        <FileInput
          disabled={loading.value}
          clearable={true}
          onChange={(file) => {
            loading.setTrue()
            if (file) {
              startUpload([file])
            }
          }}
          icon={<IconPhoto size={"16"} />}
          placeholder={label}
        />
      )}
    </Vertical>
  )
}

export default UploadThingFileInput
