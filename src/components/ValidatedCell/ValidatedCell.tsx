import {
  TextColumnData,
  TextComponent
} from 'components/TextComponent/TextComponent'
import { memo, useEffect, useState } from 'react'
import {
  CellComponent,
  CellProps,
  Column
} from 'react-datasheet-grid/dist/types'
import Error from '@mui/icons-material/Error'
import { IconButton, Tooltip } from '@mui/joy'

export const ValidatedCell = memo<
  CellProps<string | null, TextColumnData<string | null>>
>(props => {
  const { validate } = props.columnData
  const [validationResult, setValidationResult] = useState<string[]>([])

  useEffect(
    () => setValidationResult(validate(props.rowData)),
    [props.rowData, validate]
  )

  return (
    <>
      <TextComponent {...props} />
      {validationResult.length ? (
        <Tooltip title={validationResult.join(', ')} variant="plain">
          <IconButton>
            <Error color="danger" size="sm" />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  )
})

type TextColumnOptions<T> = {
  placeholder?: string
  alignRight?: boolean
  // When true, data is updated as the user types, otherwise it is only updated on blur. Default to true
  continuousUpdates?: boolean
  // Value to use when deleting the cell
  deletedValue?: T
  // Parse what the user types
  parseUserInput?: (value: string) => T
  // Format the value of the input when it is blurred
  formatBlurredInput?: (value: T) => string
  // Format the value of the input when it gets focused
  formatInputOnFocus?: (value: T) => string
  // Format the value when copy
  formatForCopy?: (value: T) => string
  // Parse the pasted value
  parsePastedValue?: (value: string) => T

  validate?: (value: T) => string[]
}

// export const validatedColumn = createValidatedColumn<string | null>()

export function createValidatedColumn<T = string | null>({
  placeholder,
  alignRight = false,
  continuousUpdates = true,
  deletedValue = null as unknown as T,
  parseUserInput = value => (value.trim() || null) as unknown as T,
  formatBlurredInput = value => String(value ?? ''),
  formatInputOnFocus = value => String(value ?? ''),
  formatForCopy = value => String(value ?? ''),
  parsePastedValue = value =>
    (value.replace(/[\n\r]+/g, ' ').trim() || (null as unknown)) as T,
  validate = () => []
}: TextColumnOptions<T> = {}): Partial<Column<T, TextColumnData<T>, string>> {
  return {
    component: ValidatedCell as unknown as CellComponent<T, TextColumnData<T>>,
    columnData: {
      placeholder,
      alignRight,
      continuousUpdates,
      formatInputOnFocus,
      formatBlurredInput,
      parseUserInput,
      validate
    },
    deleteValue: () => deletedValue,
    copyValue: ({ rowData }) => formatForCopy(rowData),
    pasteValue: ({ value }) => parsePastedValue(value),
    isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined
  }
}
