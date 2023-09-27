import { ValidationResults } from 'types'

type IncludeInOutputArgs = {
  skipRows: Record<string, boolean>
  validation: ValidationResults<Record<string, unknown>>
  index: number
}

export const includeInOutput = ({
  skipRows,
  validation,
  index
}: IncludeInOutputArgs) => {
  return (
    skipRows[index] === false &&
    !Object.values(validation[index]).some(col => col !== undefined)
  )
}
