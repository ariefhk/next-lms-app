/* eslint-disable @typescript-eslint/no-explicit-any */

type ActionStatus = "success" | "error"
type ActionError = {
  errorFields?: Record<string, any> | null
  [key: string]: string | Record<string, any> | null | undefined
}
type ActionData = Record<string, any> | null

interface ActionOutput {
  status: ActionStatus
  message: string
  data?: ActionData | null
  errors?: ActionError | null
}

const actionOutput = (actionOutput: ActionOutput) => {
  return {
    status: actionOutput.status,
    message: actionOutput.message,
    data: actionOutput?.data ? actionOutput.data : null,
    errors: actionOutput?.errors ? actionOutput.errors : null,
  }
}

export { actionOutput }
