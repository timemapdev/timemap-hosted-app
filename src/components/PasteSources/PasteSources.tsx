import Box from '@mui/joy/Box'
import { FC, Profiler, useEffect, useRef, useState, useMemo } from 'react'
import { textColumn, keyColumn, DataSheetGridRef } from 'react-datasheet-grid'
import { Database } from 'openapi/database.generated'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { CellWithId, Column } from 'react-datasheet-grid/dist/types'
import { sourceModel } from 'models'
import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import Chip from '@mui/joy/Chip'
import { Button } from '@mui/joy'
import { PasteSourcesGrid } from 'components/PasteSources/PasteSourcesGrid'

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
  const ref = useRef<DataSheetGridRef>(null)

  useEffect(() => {
    sources.forEach((source, rowNum) => {
      if (!source.timestamp) {
        return
      }

      sourceModel
        .safeParseAsync(source)
        .then(result => {
          if (result.success) {
            return
          }

          setValidationMessages(prev => {
            return {
              ...prev,
              [rowNum]: result.error.issues.reduce(
                (acc, { path: [path], message }) => {
                  console.log('Path: ', path)
                  console.log('Error: ', prev[rowNum])
                  return {
                    ...acc,
                    ...prev[rowNum],
                    [path]: [message]
                  }
                },
                {}
              )
            }
          })
        })
        .catch(e => {
          console.log(e)
        })
    })
  }, [sources])

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
    ],
    []
  )

  const errorCount = Object.keys(validationMessages).length
  console.log('Validation messages: ', validationMessages)
  return (
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
        <Box
          width="150px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          pr="8px"
        >
          <Link
            component={Button}
            onClick={() => setValidationSidebarOpen(value => !value)}
            underline="none"
            variant="plain"
            size="sm"
            endDecorator={
              <Chip
                color={errorCount ? 'danger' : 'success'}
                variant="soft"
                size="sm"
              >
                {errorCount}
              </Chip>
            }
            sx={{ '--Link-gap': '0.5rem', pl: 1, py: 0.5, borderRadius: 'md' }}
          >
            Errors
          </Link>
        </Box>
      </Box>
      <Box height="8px" />
      <Profiler
        id="PasteSources"
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime
        ) => {
          console.log({
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime
          })
        }}
      >
        <PasteSourcesGrid
          gridRef={ref}
          sources={sources}
          columns={columns as Partial<Column<SourceType, any, any>>[]}
          onChange={setSources}
          setSelectedCell={setSelectedCell}
        />
      </Profiler>
      <ValidationSidebar
        open={validationSidebarOpen}
        setValidationSidebarOpen={setValidationSidebarOpen}
        validationMessages={validationMessages}
        gridRef={ref}
      />
    </Box>
  )
}
