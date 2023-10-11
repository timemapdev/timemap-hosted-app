import Box from '@mui/joy/Box'
import { FC } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Column } from 'react-datasheet-grid/dist/types'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { toSpreadColumnDefinitions, toSpreadColumnValues } from 'lib/munging'
import { useWindowSize } from '@uidotdev/usehooks'
import { EmptyTab } from 'components/EmptyTab'
import { toSourcesOutput } from 'models/toSourcesOutput'
import { SourceOutput } from 'types'

type SourceOutputRow = {
  id: string
  title: string
  thumbnail: string
  description: string
  type: string
  path1: string
}

type SourcesOutputProps = {
  tabIndex: number
}

export const SourcesOutput: FC<SourcesOutputProps> = ({ tabIndex }) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const maxPaths = inputSources.reduce((acc, { googleDriveLinks }) => {
    return Math.max(acc, googleDriveLinks?.split(',')?.length ?? 0)
  }, 0)

  const sourcesOutput = toSourcesOutput({ inputSources, validation, skipRows })

  const columns = [
    {
      ...keyColumn('id', textColumn),
      title: 'Id',
      minWidth: 200
    },
    {
      ...keyColumn('title', textColumn),
      title: 'Title',
      minWidth: 200
    },
    {
      ...keyColumn('thumbnail', textColumn),
      title: 'Thumbnail',
      minWidth: 200
    },
    {
      ...keyColumn('description', textColumn),
      title: 'Description',
      minWidth: 200
    },
    {
      ...keyColumn('type', textColumn),
      title: 'Type',
      minWidth: 200
    },
    ...toSpreadColumnDefinitions({ name: 'path', size: maxPaths })
  ]

  const { height } = useWindowSize()

  if (!sourcesOutput.length) {
    return <EmptyTab tabIndex={tabIndex} name="sources" />
  }

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <DataSheetGrid<SourceOutputRow>
        value={flattenSources(sourcesOutput)}
        columns={columns as Partial<Column<SourceOutputRow, any, any>>[]}
        height={(height ?? 1000) - 100}
      />
    </Box>
  )
}

const flattenSources = (sourcesOutput: SourceOutput[]): SourceOutputRow[] => {
  return sourcesOutput.map(({ paths, ...source }) => ({
    ...source,
    ...toSpreadColumnValues({ columnPrefix: 'path', values: paths })
  }))
}
