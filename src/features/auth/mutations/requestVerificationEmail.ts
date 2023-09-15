import { URL_ORIGIN } from "@/config"
import { regenerateToken } from "@/utils/blitz-utils"
import { resolver } from "@blitzjs/rpc"
import db, { TokenType } from "db"
import EmailTemplateVerifyEmail from "email/react-email/emails/verify-email"
import { sendEmail } from "email/sendEmail"
import React from "react"

export const getEmailVerifyLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL,
  })

  const link = `${URL_ORIGIN}/auth/verify-email?token=${token}`
  return link
}

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  const user = await db.user.findFirst({ where: { id: userId } })

  if (!user) throw new Error("User not found")

  const emailVerifyUrl = await getEmailVerifyLink({
    userId,
    userEmail: user.email,
  })

  await sendEmail({
    to: user.email,
    subject: "Verify your email address",
    react: React.createElement(EmailTemplateVerifyEmail, {
      props: {
        emailVerifyUrl,
      },
    }),
  })
  return true
})
