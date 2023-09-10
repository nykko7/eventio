import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({
  // id: z?.string().optional(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({}, { session: { userId } }) => {
    console.log("This is an admin only mutation!")
    return { message: "You have the privileges to run this mutation!" }
  }
)
