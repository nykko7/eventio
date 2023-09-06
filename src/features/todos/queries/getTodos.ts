import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  console.log("user is searching for: ", search)
  const todos = [
    { id: 1, title: "My first todo", userId: 1 },
    { id: 2, title: "My second todo", userId: 1 },
    { id: 3, title: "My third todo", userId: 2 },
  ]

  return todos
})
