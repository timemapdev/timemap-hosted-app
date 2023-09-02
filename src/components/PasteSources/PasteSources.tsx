/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Box from '@mui/joy/Box'
import { FC, useEffect, useState } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Database } from 'openapi/database.generated'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { CellWithId, Column } from 'react-datasheet-grid/dist/types'
import Input from '@mui/joy/Input'
import { sourceModel } from 'models'

type NonNullable<T> = T extends null ? never : T

type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

type SourceTypeRaw = Database['public']['Tables']['source']['Row']

type SourceType = Denull<SourceTypeRaw>

type ValidationMessages<T> = {
  [K in keyof T]?: string[]
}

type PasteSourcesProps = {
  tabIndex: number
}

export const PasteSources: FC<PasteSourcesProps> = ({ tabIndex }) => {
  const [validationSidebarOpen, setValidationSidebarOpen] = useState(false)
  const [sources, setSources] = useState<SourceType[]>([{}])
  const [selectedCell, setSelectedCell] = useState<CellWithId | null>(null)
  const [validationMessages, setValidationMessages] = useState<
    Record<string, ValidationMessages<SourceTypeRaw>>
  >({})

  useEffect(() => {
    console.log('Validation messages', validationMessages)
  }, [validationMessages])

  useEffect(() => {
    sources.forEach((source, index) => {
      if (!source.timestamp) {
        return
      }

      sourceModel
        .safeParseAsync(source)
        .then(result => {
          if (result.success) {
            return
          }

          setValidationMessages(prev => ({
            ...prev,
            [index]: result.error.issues.map(({ path: [path], message }) => ({
              ...prev[index],
              [path]: [message]
            }))
          }))
        })
        .catch(e => {
          console.log(e)
        })
    })
  }, [sources])

  const columns = [
    {
      ...keyColumn('timestamp', textColumn),
      title: 'Upload time',
      minWidth: 150
    },
    {
      ...keyColumn('sourceUrl', textColumn),
      title: 'Source video hyperlink',
      minWidth: 500
    },
    {
      ...keyColumn('dateOfPost', textColumn),
      title: 'Date',
      minWidth: 60
    },
    {
      ...keyColumn('yearOfPost', textColumn),
      title: 'Year',
      minWidth: 60
    },
    {
      ...keyColumn('oblast', textColumn),
      title: 'Oblast',
      minWidth: 140
    },
    {
      ...keyColumn('town', textColumn),
      title: 'Town/village',
      minWidth: 140
    },
    {
      ...keyColumn('manualLatLng', textColumn),
      title: 'Coordinates',
      minWidth: 200
    },
    {
      ...keyColumn('googleDriveLinks', textColumn),
      title: 'Upload file or files',
      minWidth: 200
    },
    {
      ...keyColumn('fileNames', textColumn),
      title: 'Copy here name of the uploaded file or files',
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
    }
  ]

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <Box>
        <Input
          value={
            selectedCell && selectedCell.colId
              ? sources[selectedCell?.row][
                  selectedCell.colId as keyof SourceType
                ] ?? ''
              : ''
          }
        />
      </Box>
      <Box height="8px" />
      <DataSheetGrid<SourceType>
        value={sources}
        columns={columns as Partial<Column<SourceType, any, any>>[]}
        height={500}
        onChange={setSources}
        onActiveCellChange={({ cell }) => {
          setSelectedCell(cell)
        }}
      />
      <ValidationSidebar
        open={validationSidebarOpen}
        onClose={() => setValidationSidebarOpen(false)}
      />
    </Box>
  )
}
