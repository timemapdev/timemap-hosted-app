import Box from '@mui/joy/Box'
import { FC } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Column } from 'react-datasheet-grid/dist/types'
import Input from '@mui/joy/Input'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { typeFromUrl } from 'lib/munging'
import { SourceSite } from 'types'
import { getGoogleDriveIds } from 'lib/munging/getGoogleDriveIds'

type SourceOutputRow = {
  id: string
  title: string
  thumbnail: string
  description: string
  type: string
  paths1: string
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
    return Math.max(acc, googleDriveLinks?.length ?? 0)
  }, 0)

  const exportsSources: SourceOutputRow[] = inputSources
    .filter((_, index) => {
      if (skipRows[index]) {
        return false
      }

      if (validation[index]) {
        return false
      }
      debugger
      // TODO need to make sure validation has happened
      return true
    })
    .map(({ sourceUrl, comment, googleDriveLinks }) => {
      const sourceSite = typeFromUrl(sourceUrl)

      return {
        id: sourceUrl,
        title: '',
        thumbnail: '',
        description: comment,
        type: sourceSite,
        ...generatePaths({
          sourceSite,
          sourceUrl,
          googleDriveLinks: googleDriveLinks
        })
      }
    })

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
    ...Array.from(new Array(maxPaths), (_, index) => ({
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
        value={exportsSources}
        columns={columns as Partial<Column<SourceOutputRow, any, any>>[]}
        height={500}
      />
    </Box>
  )
}

type GeneratePathsArgs = {
  sourceSite: SourceSite
  sourceUrl: string
  googleDriveLinks: string[]
}

const generatePaths = ({
  sourceSite,
  sourceUrl,
  googleDriveLinks
}: GeneratePathsArgs) => {
  if (sourceSite === 'Manual') {
    getGoogleDriveIds(googleDriveLinks).reduce((acc, id, index) => {
      return {
        ...acc,
        [`paths${index + 1}`]: id
      }
    }, {})
  }

  return {
    paths1: sourceUrl
  }
}