import Box from '@mui/material/Box'
import { FC, useEffect, useState } from 'react'
import { client } from 'lib/client'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Database } from 'openapi/database.generated'
import { selectColumn } from 'components/CustomSelect'

type NonNullable<T> = T extends null ? never : T

type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

type SourcesProps = {
  index: number
}

type SourceType = Denull<Database['public']['Tables']['source']['Row']>

export const Sources: FC<SourcesProps> = ({ index }) => {
  const [sources, setSources] = useState<SourceType[]>([])

  useEffect(() => {
    const doStuff = async () => {
      try {
        const { data, error } = await client.from('source').select('*')
        if (error) {
          throw error
        }

        if (data) {
          setSources(data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    void doStuff()
  }, [])

  const columns = [
    {
      ...keyColumn('timestamp', textColumn),
      title: 'Timestamp',
      minWidth: 200
    },
    {
      ...keyColumn('sourceUrl', textColumn),
      title: 'Source link',
      minWidth: 200
    },
    {
      ...keyColumn('dateOfPost', textColumn),
      title: 'Date of incident or publication',
      minWidth: 200
    },
    {
      ...keyColumn(
        'oblastKey',
        selectColumn({
          choices: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
        })
      ),
      title: 'Oblast key',
      minWidth: 200
    },
    {
      ...keyColumn('townKey', textColumn),
      title: 'Town key',
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
    }
  ]

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      width="100%"
    >
      <DataSheetGrid
        value={sources}
        columns={columns}
        height={500}
        onActiveCellChange={({ cell }) => {
          console.log(cell)
        }}
        // onChange={setSources}
      />
    </Box>
  )
}
