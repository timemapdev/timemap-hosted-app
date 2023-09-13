import {
  TextColumnData,
  TextComponent
} from 'components/TextComponent/TextComponent'
import { ValidationNotification } from 'components/ValidatedCell/ValidationNotification'
import { NamedExoticComponent, memo } from 'react'
import { CellProps, Column } from 'react-datasheet-grid/dist/types'
import { SourceTypeRaw } from 'types'

type ValidatedColumnData<T> = TextColumnData<T> & {
  columnName: keyof SourceTypeRaw
}

export const ValidatedCell = memo<
  CellProps<string | null, ValidatedColumnData<string | null>>
>(props => {
  const { rowIndex, columnData } = props
  const { columnName } = columnData

  return (
    <>
      <TextComponent {...props} />
      <ValidationNotification rowIndex={rowIndex} columnName={columnName} />
    </>
  )
})

type ValidatedColumnOptions<T> = {
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
  columnName: keyof SourceTypeRaw
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
  columnName
}: ValidatedColumnOptions<T>): Partial<
  Column<T, ValidatedColumnData<T>, string>
> {
  return {
    component: StripStopEditing(ValidatedCell),
    columnData: {
      placeholder,
      alignRight,
      continuousUpdates,
      formatInputOnFocus,
      formatBlurredInput,
      parseUserInput,
      columnName
    },
    deleteValue: () => deletedValue,
    copyValue: ({ rowData }) => formatForCopy(rowData),
    pasteValue: ({ value }) => parsePastedValue(value),
    isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined
  }
}

const StripStopEditing =
  (
    Component: NamedExoticComponent<
      CellProps<string | null, ValidatedColumnData<string | null>>
    >
  ) =>
  (props: any) => {
    const { stopEditing, ...rest } = props
    return <Component {...rest} />
  }
