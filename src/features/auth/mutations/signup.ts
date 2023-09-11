import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "../schemas"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, name, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      name,
      hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
  if (user) {
    await ctx.session.$create({
      userId: user.id,
      role: user.role as Role,
    })
    return user
  }
  return null
})
