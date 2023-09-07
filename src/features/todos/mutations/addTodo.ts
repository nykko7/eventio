import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  title: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (params, { session: { userId } }) => {
    const todoTitle = params
    console.log("Creating a todo with title: ", todoTitle, " created by user: ", userId)

    return "Todo was added successfully"
  }
)
