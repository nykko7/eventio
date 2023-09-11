import { resolver } from "@blitzjs/rpc"
import db from "db"
import { TodoInput } from "../schemas"

export default resolver.pipe(
  resolver.zod(TodoInput),
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
