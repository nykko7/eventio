import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import getTodos from "@/features/todos/queries/getTodos"
import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { List, Title, Text, Loader, Button, Input } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"

const Todos = () => {
  const [todos] = useQuery(getTodos, {})

  const [todoTitle, setTodoTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Todo added",
        message: `Created todo: ${todo.title}`,
        color: "green",
      })
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
          <List.Item key={todo.id}>
            <Text>{todo.title}</Text>
          </List.Item>
        ))}
      </List>
    </Vertical>
  )
}
const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Title>Todos</Title>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  )
}

export default TodosPage
