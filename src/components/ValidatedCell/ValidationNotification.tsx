// import IconButton from '@mui/material/IconButton'
// import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'

type ValidationNotificationProps = {
  rowIndex: number
  columnName: string
}

export const ValidationNotification: FC<ValidationNotificationProps> = () =>
  //{
  // rowIndex,
  // columnName
  //}
  {
    // const { validate, columnNameTemp, skipCheck } = props.columnData
    // const { state, dispatch } = useValidation()

    // const validationResult: string[] =
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   state.validation[`${props.rowIndex}`]?.[columnNameTemp] ?? []

    // return validationResult?.length && !state.skipRows[props.rowIndex] ? (
    //   <Tooltip title={validationResult.join(', ')} variant="solid">
    //     <IconButton>
    //       <Error color="danger" size="sm" />
    //     </IconButton>
    //   </Tooltip>
    // ) : null

    return null
  }
