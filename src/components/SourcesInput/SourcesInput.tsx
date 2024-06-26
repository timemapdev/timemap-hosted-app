import Box from '@mui/joy/Box'
import { FC, useRef, useState, useMemo } from 'react'
import { textColumn, keyColumn, DataSheetGridRef } from 'react-datasheet-grid'
import { ValidationSidebar } from 'components/ValidationSidebar'
import { Column } from 'react-datasheet-grid/dist/types'
import { SourcesInputGrid } from 'components/SourcesInput/SourcesInputGrid'
import { createValidatedColumn } from 'components/ValidatedCell'
import { ValidationNavButton } from 'components/ValidationSidebar/ValidationNavButton'
import { SourceType } from 'types'
import { TopBar } from 'components/TopBar'
import { UploadNavButton, UploadSidebar } from 'components/UploadSidebar'
import { SettingsNavButton, SettingsSidebar } from 'components/SettingsSidebar'

type SourcesInputProps = {
  tabIndex: number
}

export const SourcesInput: FC<SourcesInputProps> = ({ tabIndex }) => {
  const [validationSidebarOpen, setValidationSidebarOpen] = useState(false)
  const [uploadSidebarOpen, setUploadSidebarOpen] = useState(false)
  const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false)

  const ref = useRef<DataSheetGridRef>(null)

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
      <TopBar>
        <ValidationNavButton
          setValidationSidebarOpen={setValidationSidebarOpen}
        />
        <UploadNavButton setUploadSidebarOpen={setUploadSidebarOpen} />
        <SettingsNavButton setSettingsSidebarOpen={setSettingsSidebarOpen} />
      </TopBar>

      <Box
        width={
          validationSidebarOpen || uploadSidebarOpen
            ? 'calc(100% - 380px)'
            : '100%'
        }
      >
        <SourcesInputGrid
          gridRef={ref}
          columns={columns as Partial<Column<SourceType, any, any>>[]}
        />
      </Box>

      <ValidationSidebar
        open={validationSidebarOpen}
        setValidationSidebarOpen={setValidationSidebarOpen}
        gridRef={ref}
      />

      <UploadSidebar
        open={uploadSidebarOpen}
        setUploadSidebarOpen={setUploadSidebarOpen}
      />

      <SettingsSidebar
        open={settingsSidebarOpen}
        setSettingsSidebarOpen={setSettingsSidebarOpen}
      />
    </Box>
  )
}
