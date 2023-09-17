import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { FC, useRef, useState, useMemo, useEffect } from 'react'
import { textColumn, keyColumn, DataSheetGridRef } from 'react-datasheet-grid'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { CellWithId, Column } from 'react-datasheet-grid/dist/types'
import { SourcesInputGrid } from 'components/SourcesInput/SourcesInputGrid'
import { createValidatedColumn } from 'components/ValidatedCell'
import { useValidation } from 'components/ValidationContext'
import { ValidationNavButton } from 'components/ValidationSidebar/ValidationNavButton'
import {
  ObjectChange,
  ObjectValidationResult,
  SourceType,
  StateChanges,
  ValidationResults,
  ValidationRules
} from 'types'

import { getStateChanges } from 'lib/changes'
import { sourceValidationRules } from 'components/SourcesInput/validation'

type SourcesInputProps = {
  tabIndex: number
}

const emptyRow = {
  timestamp: '',
  sourceUrl: '',
  dateOfPost: '',
  yearOfPost: '',
  oblast: '',
  town: '',
  manualLatLng: '',
  googleDriveLinks: [],
  fileNames: '',
  archiveLink: '',
  comment: '',
  typeOfIncident: [],
  meansOfAttack: []
}

export const SourcesInput: FC<SourcesInputProps> = ({ tabIndex }) => {
  const [validationSidebarOpen, setValidationSidebarOpen] = useState(false)
  const [sources, setSources] = useState<SourceType[]>([emptyRow])
  const previousSources = useRef<SourceType[]>(sources)
  const [selectedCell, setSelectedCell] = useState<CellWithId | null>(null)
  const ref = useRef<DataSheetGridRef>(null)
  const { dispatch } = useValidation()

  useEffect(() => {
    const changes = getStateChanges(sources, previousSources.current)

    if (changes) {
      dispatch({
        type: 'setSkipRowChanges',
        payload: getSkipRows(changes)
      })

      dispatch({
        type: 'setValidationChanges',
        payload: validateSources(changes) ?? {}
      })
    }
  }, [dispatch, sources])

  const columns = useMemo(
    () => [
      {
        ...keyColumn(
          'timestamp',
          createValidatedColumn({
            columnName: 'timestamp'
          })
        ),
        title: 'Upload time',
        minWidth: 150
      },
      {
        ...keyColumn(
          'sourceUrl',
          createValidatedColumn({
            columnName: 'sourceUrl'
          })
        ),
        title: 'Source video hyperlink',
        minWidth: 500
      },
      {
        ...keyColumn(
          'dateOfPost',
          createValidatedColumn({
            columnName: 'dateOfPost'
          })
        ),
        title: 'Date',
        minWidth: 80
      },
      {
        ...keyColumn(
          'yearOfPost',
          createValidatedColumn({
            columnName: 'yearOfPost'
          })
        ),
        title: 'Year',
        minWidth: 60
      },
      {
        ...keyColumn(
          'oblast',
          createValidatedColumn({
            columnName: 'oblast'
          })
        ),
        title: 'Oblast',
        minWidth: 140
      },
      {
        ...keyColumn(
          'town',
          createValidatedColumn({
            columnName: 'town'
          })
        ),
        title: 'Town/village',
        minWidth: 140
      },
      {
        ...keyColumn(
          'manualLatLng',
          createValidatedColumn({
            columnName: 'manualLatLng'
          })
        ),
        title: 'Coordinates',
        minWidth: 200
      },
      {
        ...keyColumn(
          'googleDriveLinks',
          createValidatedColumn({
            columnName: 'googleDriveLinks'
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
            columnName: 'archiveLink'
          })
        ),
        title: 'Source archive link',
        minWidth: 200
      },
      {
        ...keyColumn(
          'comment',
          createValidatedColumn({
            columnName: 'comment'
          })
        ),
        title: 'Comment',
        minWidth: 200
      },
      {
        ...keyColumn(
          'typeOfIncident',
          createValidatedColumn({
            columnName: 'typeOfIncident'
          })
        ),
        title: 'Type of incident',
        minWidth: 300
      },
      {
        ...keyColumn(
          'meansOfAttack',
          createValidatedColumn({
            columnName: 'meansOfAttack'
          })
        ),
        title: 'Means of attack',
        minWidth: 300
      }
    ],
    []
  )

  return (
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

      <Box width={validationSidebarOpen ? 'calc(100% - 360px)' : '100%'}>
        <SourcesInputGrid
          gridRef={ref}
          sources={sources}
          columns={columns as Partial<Column<SourceType, any, any>>[]}
          onChange={setSources}
          setSelectedCell={setSelectedCell}
        />
      </Box>

      <ValidationSidebar
        open={validationSidebarOpen}
        setValidationSidebarOpen={setValidationSidebarOpen}
        gridRef={ref}
      />
    </Box>
  )
}

const getSkipRows = <T extends Record<string, unknown>>(
  changes: StateChanges<T>
) => {
  return Object.entries(changes).reduce((acc, [rowNum, objectChanges]) => {
    if (typeof objectChanges.timestamp === 'undefined') {
      return acc
    }

    return {
      ...acc,
      [rowNum]: !objectChanges.timestamp.current
    }
  }, {})
}

const validateState =
  <T extends Record<string, unknown>>(rules: ValidationRules<T>) =>
  (data: StateChanges<T>) => {
    const initial: ValidationResults<T> = {}

    const results = Object.entries(data).reduce<ValidationResults<T>>(
      (acc, [rowNum, objectChanges]) => {
        const rowResults = validateObject(rules)(objectChanges)

        if (!rowResults) {
          return acc
        }

        return {
          ...acc,
          [rowNum]: rowResults
        }
      },
      initial
    )

    return results === initial ? undefined : results
  }

const validateObject =
  <T extends Record<string, unknown>>(rules: ValidationRules<T>) =>
  (rowChange: ObjectChange<T>) => {
    const initial: ObjectValidationResult<T> = {}
    const results = Object.entries(rowChange).reduce<ObjectValidationResult<T>>(
      (acc, [columnName, value]) => {
        if (!rules[columnName]) {
          return acc
        }

        const result = rules[columnName](value?.current)

        return {
          ...acc,
          [columnName]: result
        }
      },
      initial
    )

    return results === initial ? undefined : results
  }

const validateSources = validateState(sourceValidationRules)
