import { isDev } from "@/config"
import { Resend } from "resend"
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"

import { nodemailerAppTransport } from "./transports/nodemailer-app-transport"
import { render } from "@react-email/render"

import { env } from "@/env.mjs"

const resend = new Resend(env.RESEND_API_KEY)

export const sendEmail = async ({ subject, to, react }) => {
  const message: CreateEmailOptions = {
    from: "contact@reaprende.cl",
    to,
    subject,
    react,
  }

  // if (isDev) {
  //   const previewEmail = (await import("preview-email")).default
  //   await previewEmail(message)
  //   return
  // } else {

  if (isDev) {
    const html = render(react)
    return nodemailerAppTransport.sendMail(
      {
        ...message,
        html,
      },
      (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      }
    )
  }
  return resend.emails.send({
    ...message,
    react,
  })
  // }
}
