import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import toggleTodo from "@/features/todos/mutations/toggleTodo"
import getTodos from "@/features/todos/queries/getTodos"
import { TodoFormType, TodoInput } from "@/features/todos/schemas"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { List, Title, Text, Loader, Button, Input, Checkbox } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"
import { z } from "zod"

const Todo = ({ todo, refetchTodos }) => {
  const [$toggleTodo] = useMutation(toggleTodo)

  return (
    <Horizontal>
      <Checkbox
        checked={todo.done}
        onChange={async () => {
          await $toggleTodo({ id: todo.id })
          refetchTodos()
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  )
}

const Todos = () => {
  const user = useCurrentUser()
  const [todos, { refetch }] = useQuery(getTodos, {})

  const [todoTitle, setTodoTitle] = useState("")

  const [$addTodo, { isLoading }] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Todo added",
        message: `Created todo: ${todo.title}`,
        color: "green",
      })

      refetch()
    },
  })

  const form = useForm<TodoFormType>({
    initialValues: {
      todoTitle: "",
    },
    validate: zodResolver(TodoInput),
  })

  return (
    <Vertical>
      {user && <Text>Hello {user.name}, here are your todos: </Text>}
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $addTodo({ ...values })
        })}
      >
        <Input
          placeholder="Enter todo title"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.currentTarget.value)}
        />
        <Button loading={isLoading} type="submit">
          Create a todo
        </Button>
        <List>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} refetchTodos={refetch} />
          ))}
        </List>
      </form>
    </Vertical>
  )
}
const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Title>Todos</Title>
      <Todos />
    </Layout>
  )
}

export default TodosPage
