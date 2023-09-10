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
        ...keyColumn(
          'timestamp',
          createValidatedColumn({
            skipCheck: rowData => rowData === null || rowData === undefined,
            colNameTemp: 'timestamp'
          })
        ),
        title: 'Upload time',
        minWidth: 150
      },
      {
        ...keyColumn(
          'sourceUrl',
          createValidatedColumn({
            validate: sourceUrlValidation,
            colNameTemp: 'sourceUrl'
          })
        ),
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
        ...keyColumn(
          'yearOfPost',
          createValidatedColumn({
            validate: yearOfPostValidation,
            colNameTemp: 'yearOfPost'
          })
        ),
        title: 'Year',
        minWidth: 60
      },
      {
        ...keyColumn(
          'oblast',
          createValidatedColumn({
            validate: oblastValidation,
            colNameTemp: 'oblast'
          })
        ),
        title: 'Oblast',
        minWidth: 140
      },
      {
        ...keyColumn(
          'town',
          createValidatedColumn({
            validate: townValidation,
            colNameTemp: 'town'
          })
        ),
        title: 'Town/village',
        minWidth: 140
      },
      {
        ...keyColumn(
          'manualLatLng',
          createValidatedColumn({
            validate: coordinatesValidation,
            colNameTemp: 'manualLatLng'
          })
        ),
        title: 'Coordinates',
        minWidth: 200
      },
      {
        ...keyColumn(
          'googleDriveLinks',
          createValidatedColumn({
            validate: googleDriveLinksValidation,
            colNameTemp: 'googleDriveLinks'
          })
        ),
        title: 'Upload file or files',
        minWidth: 200
      },
      {
        ...keyColumn('fileNames', textColumn),
        title: 'Copy here name of the uploaded file or files',
        minWidth: 200
      },
      {
        ...keyColumn(
          'archiveLink',
          createValidatedColumn({
            validate: archiveLinkValidation,
            colNameTemp: 'archiveLink'
          })
        ),
        title: 'Source archive link',
        minWidth: 200
      },
      {
        ...keyColumn(
          'comment',
          createValidatedColumn({
            validate: commentValidation,
            colNameTemp: 'comment'
          })
        ),
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

  throw new Error('Kickstart error: create typeOfIncident validation next')

  return (
    <ValidationProvider>
      <Box
        role="tabpanel"
        id={`simple-tabpanel-${tabIndex}`}
        aria-labelledby={`simple-tab-${tabIndex}`}
        width="100%"
      >
        <Box
          display="flex"
          padding="8px"
          position="sticky"
          top="0"
          zIndex="1"
          borderBottom="1px solid #e8ebed"
          sx={{ backgroundColor: '#F5F7FA' }}
        >
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

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

const dateOfPostValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter date']
  }

  if (!/^\d{1,2}.\d{1,2}$/.test(value)) {
    return ['Please enter date in format DD.MM']
  }

  return []
}

const sourceUrlValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter a source URL']
  }

  const chunks = value.split(',').map(str => str.trim())

  if (chunks.length > 1) {
    return [
      'Multiple comma separated items found. Please place each URL on a separate row'
    ]
  }

  if (!URL_REGEX.test(chunks[0])) {
    return ['Please enter a valid URL']
  }

  return []
}

const yearOfPostValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter year']
  }

  if (!/^\d{4}$/.test(value)) {
    return ['Please enter year in format YYYY']
  }

  const year = Number(value)

  if (year < 2022) {
    return ['Please enter year 2022 or later']
  }

  return []
}

const oblasts = [
  'Cherkasy Oblast',
  'Chernihiv Oblast',
  'Chernivtsi Oblast',
  'Dnipropetrovsk Oblast',
  'Donetsk Oblast',
  'Ivano-Frankivsk Oblast',
  'Kharkiv Oblast',
  'Kherson Oblast',
  'Khmelnytskyi Oblast',
  'Kyiv Oblast',
  'Kirovohrad Oblast',
  'Luhansk Oblast',
  'Lviv Oblast',
  'Mykolaiv Oblast',
  'Odessa Oblast',
  'Poltava Oblast',
  'Rivne Oblast',
  'Sumy Oblast',
  'Ternopil Oblast',
  'Vinnytsia Oblast',
  'Volyn Oblast',
  'Zakarpattia Oblast',
  'Zaporizhia Oblast',
  'Zhytomyr Oblast'
]

const oblastValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter oblast']
  }

  if (!oblasts.includes(value)) {
    return ['Please enter of the following oblasts: ' + oblasts.join(', ')]
  }

  return []
}

const townValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter town name']
  }

  return []
}

const coordinatesValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter coordinates']
  }

  const chunks = value
    .split(',')
    .map(str => str.trim())
    .map(str => Number(str))

  if (chunks.length !== 2) {
    return [
      'Please enter coordinates in format LAT, LNG, for example 49.8397, 24.0297'
    ]
  }

  if (chunks[0] < 44 || chunks[0] > 53) {
    return ['Please enter latitude between 44 and 53']
  }

  if (chunks[1] < 22 || chunks[1] > 41) {
    return ['Please enter longitude between 22 and 41']
  }

  return []
}

const googleDriveLinksValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter Google Drive links']
  }

  const chunks = value.split(',').map(str => str.trim())

  if (chunks.length < 1) {
    return ['Please enter at least one Google Drive link']
  }

  const containsInvalidLink = chunks.some(
    link => !link.startsWith('https://drive.google.com/open?id=')
  )

  if (containsInvalidLink) {
    return ['Each link should start with https://drive.google.com/open?id=']
  }

  return []
}

const archiveLinkValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter archive link']
  }

  if (!URL_REGEX.test(value)) {
    return ['Please enter a valid URL']
  }

  return []
}

const commentValidation = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter a comment']
  }

  return []
}
