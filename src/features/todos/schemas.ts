import { z } from "zod"

export const TodoInput = z.object({
  todoTitle: z.string(),
})

export type TodoFormType = z.infer<typeof TodoInput>
