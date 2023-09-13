import { useValidation } from 'components/ValidationContext'
import { useMemo } from 'react'
import { SourceType } from 'types'

export const usePerformant = (rowIndex: number, colName: keyof SourceType) => {
  const { state } = useValidation()

  const cellValue = selectCell(rowIndex, colName)(state)

  const cellValue = useMemo(() => {
    return
  }, [colName, rowIndex, state])
}

const selectCell =
  (rowIndex: number, colName: keyof SourceType) => (state: SourceType[]) => {
    return state?.[rowIndex]?.[colName]
  }

useEffect(() => {
  if (skipCheck && state.skipRows[props.rowIndex] === undefined) {
    const skip = skipCheck(props.rowData)

    dispatch({
      type: 'setSkipRowChanges',
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
          type: 'setValidationChanges',
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
