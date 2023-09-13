import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useValidation } from 'components/ValidationContext'

type ValidationNotificationProps<T> = {
  rowIndex: string
  columnName: keyof T
}

export const ValidationNotification = <T extends Record<string, unknown>>({
  rowIndex,
  columnName
}: ValidationNotificationProps<T>) => {
  const { state, dispatch } = useValidation()

  const validationResult = state.validation[rowIndex]?.[columnName]

  return validationResult?.length && !state.skipRows[props.rowIndex] ? (
    <Tooltip title={validationResult.join(', ')} variant="solid">
      <IconButton>
        <Error color="danger" size="sm" />
      </IconButton>
    </Tooltip>
  ) : null

  return null
}
