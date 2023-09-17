import Box from '@mui/joy/Box'
import { FC } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Column } from 'react-datasheet-grid/dist/types'
import Input from '@mui/joy/Input'
import { SourceType } from 'types'

type SourceOutputRow = {
  id: string
  title: string
  thumbnail: string
  description: string
  type: string
  paths: string[]
}

type SourcesOutputProps = {
  tabIndex: number
  sourceOutputs: SourceOutputRow[]
}

export const SourcesOutput: FC<SourcesOutputProps> = ({
  tabIndex,
  sourceOutputs
}) => {
  const maxPaths = sourceOutputs.reduce((acc, { paths }) => {
    return Math.max(acc, paths.length)
  }, 0)

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

    {
      ...keyColumn('manualLatLng', textColumn),
      title: 'Coordinates',
      minWidth: 200
    },
    {
      ...keyColumn('googleDriveLinks', textColumn),
      title: 'Google Drive links',
      minWidth: 200
    },
    {
      ...keyColumn('archiveLink', textColumn),
      title: 'Source archive link',
      minWidth: 200
    },
    {
      ...keyColumn('comment', textColumn),
      title: 'Comment',
      minWidth: 200
    },
    {
      ...keyColumn('typeOfIncident', textColumn),
      title: 'Type of incident',
      minWidth: 200
    },
    {
      ...keyColumn('meansOfAttack', textColumn),
      title: 'Means of attack',
      minWidth: 200
    },
    {
      ...keyColumn('eventKey', textColumn),
      title: 'Event key',
      minWidth: 200
    },
    Array.from(new Array(maxPaths), (_, index) => ({
      ...keyColumn(`path${index + 1}`, textColumn),
      title: `path${index + 1}`,
      minWidth: 200
    }))
  ]

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <Box>
        <Input tabIndex={-1} value="25.02" />
      </Box>
      <Box height="8px" />
      <DataSheetGrid<SourceOutputRow>
        value={sourceOutputs}
        columns={columns as Partial<Column<SourceOutputRow, any, any>>[]}
        height={500}
      />
    </Box>
  )
}
