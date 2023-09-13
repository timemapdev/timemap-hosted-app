import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { FC, useRef, useState, useMemo, useCallback } from 'react'
import { textColumn, keyColumn, DataSheetGridRef } from 'react-datasheet-grid'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { CellWithId, Column } from 'react-datasheet-grid/dist/types'
import { PasteSourcesGrid } from 'components/PasteSources/PasteSourcesGrid'
import { createValidatedColumn } from 'components/ValidatedCell'
import { ValidationProvider } from 'components/ValidationContext'
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
import { sourceValidationRules } from 'components/PasteSources/validation'

type PasteSourcesProps = {
  tabIndex: number
}

export const PasteSources: FC<PasteSourcesProps> = ({ tabIndex }) => {
  const [validationSidebarOpen, setValidationSidebarOpen] = useState(false)
  const [sources, setSourcesRaw] = useState<SourceType[]>([{} as SourceType])
  const [selectedCell, setSelectedCell] = useState<CellWithId | null>(null)
  const ref = useRef<DataSheetGridRef>(null)

  const setSources = useCallback((sourcesCurrent: SourceType[]) => {
    setSourcesRaw(sourcesPrevious => {
      const changes = getStateChanges(sourcesCurrent, sourcesPrevious)

      if (changes) {
        const validationResults = validateState(sourceValidationRules)(changes)
        console.log(validationResults)
      }

      return sourcesCurrent
    })
  }, [])

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
        minWidth: 200
      },
      {
        ...keyColumn(
          'meansOfAttack',
          createValidatedColumn({
            columnName: 'meansOfAttack'
          })
        ),
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
