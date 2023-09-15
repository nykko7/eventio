import { ErrorFallbackProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { MainAuthenticationForm } from "./MainAuthenticationForm"
import React from "react"
import { Vertical } from "mantine-layout-components"
import { Paper, Text } from "@mantine/core"

const ErrorComponent: React.FC<{ statusCode: string | number; title: string }> = ({
  statusCode,
  title,
}) => {
  return (
    <Vertical center fullW>
      <Paper p="xl" w="100%" maw={400} radius="md">
        <Vertical spacing="0" fullW center>
          <Text color="dimmed" fz="md" fw="bold">
            {statusCode}
          </Text>
          <Vertical spacing="0" center>
            <Text fz="xl">An error ocurred 😥</Text>
            <Text fz="md" color="dimmed">
              {title}
            </Text>
          </Vertical>
        </Vertical>
      </Paper>
    </Vertical>
  )
}

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <MainAuthenticationForm />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
