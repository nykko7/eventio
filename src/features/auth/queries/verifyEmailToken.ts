import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { hash256 } from "@blitzjs/auth"

const Input = z.object({
  token: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
  // 1. Try to find this token in the db
  const hashedToken = hash256(token)
  const dbToken = await db.token.findFirst({
    where: {
      hashedToken,
      type: "VERIFY_EMAIL",
    },
  })

  // If token not found, error
  if (!dbToken) throw new Error("Invalid token")

  // 2. Delete token so it can't be used again
  await db.token.deleteMany({ where: { id: dbToken.id } })

  // 3. If token has not expired, then update the user
  if (dbToken.expiresAt > new Date()) {
    await db.user.update({
      where: { id: dbToken.userId },
      data: { emailVerifiedAt: new Date() },
    })
  } else {
    throw new Error("Token expired")
  }

  return true
})
