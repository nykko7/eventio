import { getAvatarFallbackName, getUploadthingUrl } from "@/utils/image-utils"
import { Avatar, AvatarProps } from "@mantine/core"
import { ReactFC } from "types"

type Props = {
  user: {
    name?: string | null
    avatarImageKey?: string | null
  }
} & Partial<AvatarProps>

const UserAvatar: ReactFC<Props> = ({ user, ...rest }) => {
  return (
    <Avatar src={getUploadthingUrl(user.avatarImageKey)} alt="avatar" radius="xl" {...rest}>
      {getAvatarFallbackName(user.name)}
    </Avatar>
  )
}

export default UserAvatar
