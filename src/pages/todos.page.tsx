import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import toggleTodo from "@/features/todos/mutations/toggleTodo"
import getTodos from "@/features/todos/queries/getTodos"
import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { List, Title, Text, Loader, Button, Input, Checkbox } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"

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
  const [todos, { refetch }] = useQuery(getTodos, {})

  const [todoTitle, setTodoTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Todo added",
        message: `Created todo: ${todo.title}`,
        color: "green",
      })

      refetch()
    },
  })
  const createTodo = async () => {
    await $addTodo({ todoTitle })
  }

  return (
    <Vertical>
      <Input
        placeholder="Enter todo title"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.currentTarget.value)}
      />
      <Button onClick={createTodo}>Create a todo</Button>
      <List>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} refetchTodos={refetch} />
        ))}
      </List>
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
