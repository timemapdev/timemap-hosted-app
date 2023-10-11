import { FC, useMemo } from 'react'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { toSpreadColumnDefinitions, toSpreadColumnValues } from 'lib/munging'
import { textColumn, keyColumn, DataSheetGrid } from 'react-datasheet-grid'
import Box from '@mui/joy/Box'
import { useWindowSize } from '@uidotdev/usehooks'
import { Column } from 'react-datasheet-grid/dist/types'

import { EmptyTab } from 'components/EmptyTab'
import { toAssociationsOutput } from 'models/toAssociationsOutput'
import { AssociationOutput, AssociationOutputRow } from 'types'

type AssociationsOutputProps = {
  tabIndex: number
}

export const AssociationsOutput: FC<AssociationsOutputProps> = ({
  tabIndex
}) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const { associationsOutput, maxDepth } = useMemo(() => {
    return toAssociationsOutput({
      inputSources,
      validation,
      skipRows
    })
  }, [inputSources, validation, skipRows])

  const columns = [
    {
      ...keyColumn('id', textColumn),
      title: 'id',
      minWidth: 200
    },
    {
      ...keyColumn('title', textColumn),
      title: 'title',
      minWidth: 200
    },
    {
      ...keyColumn('desc', textColumn),
      title: 'desc',
      minWidth: 200
    },
    {
      ...keyColumn('mode', textColumn),
      title: 'mode',
      minWidth: 200
    },
    ...toSpreadColumnDefinitions({ name: 'filter_path', size: maxDepth })
  ]

  const { height } = useWindowSize()

  if (!associationsOutput.length) {
    return <EmptyTab tabIndex={tabIndex} name="associations" />
  }

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <DataSheetGrid<AssociationOutputRow>
        value={flattenAssociations(associationsOutput)}
        columns={columns as Partial<Column<AssociationOutputRow, any, any>>[]}
        height={(height ?? 1000) - 100}
      />
    </Box>
  )
}

const flattenAssociations = (
  associationsOutput: AssociationOutput[]
): AssociationOutputRow[] => {
  return associationsOutput.map(associationOutput => {
    const { filter_paths, ...association } = associationOutput
    return {
      ...association,
      ...toSpreadColumnValues({
        columnPrefix: 'filter_path',
        values: filter_paths
      })
    }
  })
}
