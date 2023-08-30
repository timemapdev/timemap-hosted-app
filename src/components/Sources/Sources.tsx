import Box from '@mui/material/Box'
import { FC, useEffect, useState } from 'react'
import { client } from 'lib/client'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Database } from 'openapi/database.generated'

type SourcesProps = {
  index: number
}

export const Sources: FC<SourcesProps> = ({ index }) => {
  const [sources, setSources] = useState<
    Database['public']['Tables']['source']['Row'][]
  >([])

  console.log('Sources', sources)

  useEffect(() => {
    const doStuff = async () => {
      try {
        const result = await client.from('source').select('*')

        if (result.data) {
          setSources(result.data)
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
      title: 'Timestamp'
    },
    {
      ...keyColumn('sourceUrl', textColumn),
      title: 'Source link'
    },
    {
      ...keyColumn('dateOfPost', textColumn),
      title: 'Date of incident or publication'
    },
    {
      ...keyColumn('oblastKey', textColumn),
      title: 'Oblast key'
    },
    {
      ...keyColumn('townKey', textColumn),
      title: 'Town key'
    },
    {
      ...keyColumn('manualLatLng', textColumn),
      title: 'Coordinates'
    },
    {
      ...keyColumn('googleDriveLinks', textColumn),
      title: 'Google Drive links'
    },
    {
      ...keyColumn('archiveLink', textColumn),
      title: 'Source archive link'
    },
    {
      ...keyColumn('comment', textColumn),
      title: 'Comment'
    },
    {
      ...keyColumn('typeOfIncident', textColumn),
      title: 'Type of incident'
    },
    {
      ...keyColumn('meansOfAttack', textColumn),
      title: 'Means of attack'
    },
    {
      ...keyColumn('eventKey', textColumn),
      title: 'Event key'
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
        // onChange={setSources}
      />
    </Box>
  )
}
