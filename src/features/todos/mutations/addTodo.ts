import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  todoTitle: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    const todo = await db.todo.create({
      data: {
        title: todoTitle,
        user: { connect: { id: userId } },
      },
    })
    return todo
  }
)
