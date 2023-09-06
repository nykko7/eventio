import Layout from "@/core/layouts/Layout"
import getTodos from "@/features/todos/queries/getTodos"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { List, Title, Text, Loader } from "@mantine/core"
import { Suspense } from "react"

const Todos = () => {
  const [todos] = useQuery(getTodos, {})
  return (
    <List>
      {todos.map((todo) => (
        <List.Item key={todo.id}>
          <Text>{todo.title}</Text>
        </List.Item>
      ))}
    </List>
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
