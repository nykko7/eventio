import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import getTodos from "@/features/todos/queries/getTodos"
import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { List, Title, Text, Loader, Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"
import { Suspense } from "react"

const Todos = () => {
  const [todos] = useQuery(getTodos, {})

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "Todo added",
        message: result,
        color: "green",
      })
    },
  })
  const createTodo = () => {
    $addTodo({ title: "New todo" })
  }

  return (
    <Vertical>
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
