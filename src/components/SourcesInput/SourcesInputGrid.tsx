import { useWindowSize } from '@uidotdev/usehooks'
import { FC, RefObject, memo, useEffect } from 'react'
import { Column, DataSheetGrid, DataSheetGridRef } from 'react-datasheet-grid'
import { SourceType } from 'types'
import { useValidation } from 'components/ValidationContext'
import { useInputSources } from 'components/InputSourcesContext'
import { getSkipRows, validateState } from 'lib/validation'
import { sourceValidationRules } from 'components/SourcesInput/validation'

type PasteSourceGridProps = {
  gridRef: RefObject<DataSheetGridRef>
  columns: Partial<Column<SourceType, any, any>>[]
}

export const validateSources = validateState(sourceValidationRules)

export const SourcesInputGrid: FC<PasteSourceGridProps> = memo(
  ({ gridRef, columns }) => {
    const { dispatch: validationDispatch } = useValidation()
    const { state: inputsState, dispatch: inputsDispatch } = useInputSources()

    const { inputChanges, inputSources } = inputsState

    useEffect(() => {
      if (inputChanges) {
        validationDispatch({
          type: 'setSkipRowChanges',
          payload: getSkipRows(inputChanges)
        })

        validationDispatch({
          type: 'setValidationChanges',
          payload: validateSources(inputChanges) ?? {}
        })
      }
    }, [validationDispatch, inputChanges])

    const { height } = useWindowSize()

    return (
      <DataSheetGrid<SourceType>
        ref={gridRef}
        value={inputSources}
        columns={columns}
        height={(height ?? 1000) - 156}
        onChange={change => {
          inputsDispatch({ type: 'setInputSources', payload: change })
        }}
        onActiveCellChange={({ cell }) => {
          inputsDispatch({ type: 'setSelectedCell', payload: cell })
        }}
      />
    )
  }
)
