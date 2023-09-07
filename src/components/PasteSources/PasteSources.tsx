import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { FC, useRef, useState, useMemo } from 'react'
import { textColumn, keyColumn, DataSheetGridRef } from 'react-datasheet-grid'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { CellWithId, Column } from 'react-datasheet-grid/dist/types'
import { PasteSourcesGrid } from 'components/PasteSources/PasteSourcesGrid'
import { createValidatedColumn } from 'components/ValidatedCell'
import { ValidationProvider } from 'components/ValidationContext'
import { ValidationNavButton } from 'components/ValidationSidebar/ValidationNavButton'
import { SourceType } from 'types'

type PasteSourcesProps = {
  tabIndex: number
}

export const PasteSources: FC<PasteSourcesProps> = ({ tabIndex }) => {
  const [validationSidebarOpen, setValidationSidebarOpen] = useState(false)
  const [sources, setSources] = useState<SourceType[]>([{} as SourceType])
  const [selectedCell, setSelectedCell] = useState<CellWithId | null>(null)
  const ref = useRef<DataSheetGridRef>(null)

  const columns = useMemo(
    () => [
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
        ...keyColumn(
          'dateOfPost',
          createValidatedColumn({
            validate: dateOfPostValidation,
            colNameTemp: 'dateOfPost'
          })
        ),
        title: 'Date',
        minWidth: 80
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
    ],
    []
  )

  return (
    <ValidationProvider>
      <Box
        role="tabpanel"
        id={`simple-tabpanel-${tabIndex}`}
        aria-labelledby={`simple-tab-${tabIndex}`}
        width="100%"
      >
        <Box display="flex" padding="8px">
          <Box flex={1}>
            <Input
              disabled={true}
              // onFocus={() => {
              //   if (selectedCell && ref.current) {
              //     ref.current?.setSelection({
              //       min: selectedCell,
              //       max: selectedCell
              //     })
              //   }
              // }}
              value={
                selectedCell && selectedCell.colId
                  ? sources[selectedCell?.row][
                      selectedCell.colId as keyof SourceType
                    ] ?? ''
                  : ''
              }
            />
          </Box>
          <ValidationNavButton
            setValidationSidebarOpen={setValidationSidebarOpen}
          />
        </Box>
        <Box height="8px" />

        <PasteSourcesGrid
          gridRef={ref}
          sources={sources}
          columns={columns as Partial<Column<SourceType, any, any>>[]}
          onChange={setSources}
          setSelectedCell={setSelectedCell}
        />

        <ValidationSidebar
          open={validationSidebarOpen}
          setValidationSidebarOpen={setValidationSidebarOpen}
          gridRef={ref}
        />
      </Box>
    </ValidationProvider>
  )
}

const dateOfPostValidation = (value: string) => {
  if (typeof value !== 'string') {
    return ['Please enter date']
  }

  if (!/^\d{1,2}.\d{1,2}$/.test(value)) {
    return ['Please enter date in format DD.MM']
  }

  return []
}
