import { memo, useLayoutEffect, useRef } from 'react'
import { CellProps, Column } from 'react-datasheet-grid'
import Select, { GroupBase, SelectInstance } from 'react-select'

type Choice = {
  label: string
  value: string
}

type SelectOptions = {
  choices: Choice[]
  disabled?: boolean
}

export const CustomSelect = memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null)

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus()
      } else {
        ref.current?.blur()
      }
    }, [focus])

    return (
      <Select
        ref={ref}
        styles={{
          container: provided => ({
            ...provided,
            flex: 1,
            alignSelf: 'stretch',
            pointerEvents: focus ? undefined : 'none'
          }),
          control: provided => ({
            ...provided,
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            background: 'none'
          }),
          indicatorSeparator: provided => ({
            ...provided,
            opacity: 0
          }),
          indicatorsContainer: provided => ({
            ...provided,
            opacity: active ? 1 : 0
          }),
          placeholder: provided => ({
            ...provided,
            opacity: active ? 1 : 0
          })
        }}
        isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={choice => {
          if (choice === null) {
            return
          }

          setRowData(choice.value)
          setTimeout(stopEditing, 0)
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    )
  }
)

export const selectColumn = (
  options: SelectOptions
): Column<string | null, SelectOptions> => ({
  component: CustomSelect as <T, C>(props: CellProps<T, C>) => JSX.Element,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find(choice => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find(choice => choice.label === value)?.value ?? null
})
