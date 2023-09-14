import IconButton from '@mui/joy/IconButton'
import Tooltip from '@mui/joy/Tooltip'
import { useValidation } from 'components/ValidationContext'
import { ErrorIcon } from 'icons/ErrorIcon'

type ValidationNotificationProps<T> = {
  rowIndex: number
  columnName: keyof T
}

export const ValidationNotification = <T extends Record<string, unknown>>({
  rowIndex,
  columnName
}: ValidationNotificationProps<T>) => {
  const { state } = useValidation<T>()

  if (state.skipRows[rowIndex]) {
    return null
  }

  const validationResult = state.validation[rowIndex]?.[columnName]

  if (!validationResult?.length) {
    return null
  }

  return (
    <Tooltip title={validationResult.join(', ')} variant="solid">
      <IconButton color="danger">
        <ErrorIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
