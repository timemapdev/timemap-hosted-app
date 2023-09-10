import {
  TextColumnData,
  TextComponent
} from 'components/TextComponent/TextComponent'
import { memo, useEffect } from 'react'
import {
  CellComponent,
  CellProps,
  Column
} from 'react-datasheet-grid/dist/types'
import Error from '@mui/icons-material/Error'
import { IconButton, Tooltip } from '@mui/joy'
import { useValidation } from 'components/ValidationContext'
import { SourceTypeRaw } from 'types'

export const ValidatedCell = memo<
  CellProps<string | null, TextColumnData<string | null>>
>(props => {
  const { validate, colNameTemp, skipCheck } = props.columnData
  const { state, dispatch } = useValidation()

  useEffect(() => {
    if (skipCheck && state.skipRows[props.rowIndex] === undefined) {
      const skip = skipCheck(props.rowData)

      dispatch({
        type: 'setSkipRow',
        payload: {
          row: props.rowIndex,
          skip
        }
      })
    }

    if (validate && !state.skipRows[props.rowIndex]) {
      const result = validate(props.rowData)

      result?.length
        ? dispatch({
            type: 'setValidationResult',
            payload: {
              row: props.rowIndex,
              column: colNameTemp, // FIX this to use correct column name
              messages: result
            }
          })
        : dispatch({
            type: 'clearValidationResult',
            payload: {
              row: props.rowIndex,
              column: colNameTemp
            }
          })
    }
  }, [props.rowData, validate])

  const validationResult: string[] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    state.validation[`${props.rowIndex}`]?.[colNameTemp] ?? []

  return (
    <>
      <TextComponent {...props} />
      {validationResult?.length && !state.skipRows[props.rowIndex] ? (
        <Tooltip title={validationResult.join(', ')} variant="solid">
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

  colNameTemp: keyof SourceTypeRaw

  skipCheck?: (value: T) => boolean
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
  validate = () => [],
  skipCheck,
  colNameTemp
}: TextColumnOptions<T>): Partial<Column<T, TextColumnData<T>, string>> {
  return {
    component: ValidatedCell as unknown as CellComponent<T, TextColumnData<T>>,
    columnData: {
      placeholder,
      alignRight,
      continuousUpdates,
      formatInputOnFocus,
      formatBlurredInput,
      parseUserInput,
      validate,
      colNameTemp,
      skipCheck
    },
    deleteValue: () => deletedValue,
    copyValue: ({ rowData }) => formatForCopy(rowData),
    pasteValue: ({ value }) => parsePastedValue(value),
    isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined
  }
}
