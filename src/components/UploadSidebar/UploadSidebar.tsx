import { Drawer } from 'components/Drawer'
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from 'react'
import { useValidation } from 'components/ValidationContext'
import { useInputSources } from 'components/InputSourcesContext'
import { Box, Button, Typography } from '@mui/joy'
import { UploadIcon } from 'icons/UploadIcon'
import { toLiveData } from 'lib/munging'
import { Bounds, LiveData } from 'types'
import { client } from 'lib/client'
import Link from '@mui/material/Link'

type UploadSidebarProps = {
  open: boolean
  setUploadSidebarOpen: (open: boolean) => void
}

export const UploadSidebar: FC<UploadSidebarProps> = memo(
  ({ open, setUploadSidebarOpen }) => {
    const [uploading, setUploading] = useState(false)
    const [accountName, setAccountName] = useState('')
    const [bounds, setBounds] = useState({
      north: 90,
      east: 180,
      south: -90,
      west: -180
    })
    const { state: validationState } = useValidation()
    const { validation, skipRows } = validationState

    const { state: inputsState } = useInputSources()
    const { inputSources } = inputsState

    const liveData = toLiveData({ inputSources, validation, skipRows })

    const { events, associations, sources } = liveData

    const uploadDisabled =
      !Object.values(sources).length && !events.length && !associations.length

    useEffect(() => {
      client.functions
        .invoke<{
          map: {
            subdomain: string
            north: number
            east: number
            south: number
            west: number
          }
        }>('map-client', { method: 'GET' })
        .then(({ data, error }) => {
          if (error) {
            throw error
          }

          if (data) {
            const { north, east, south, west } = data.map

            setAccountName(data.map.subdomain)
            setBounds({ north, east, south, west })
          }
        })
        .catch(error => console.log(error))
    }, [])

    return (
      <Drawer
        position="right"
        title="Upload"
        open={open}
        onClose={() => setUploadSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          <Typography>Available to upload</Typography>

          <Box height="8px" />

          <ItemRow count={Object.values(sources).length} label="Sources" />
          <ItemRow count={events.length} label="Events" />
          <ItemRow count={associations.length} label="Associations" />

          <Box height="24px" />

          <Button
            disabled={uploadDisabled || !accountName}
            loading={uploading}
            endDecorator={<UploadIcon />}
            onClick={upload({ accountName, liveData, setUploading, bounds })}
          >
            Upload
          </Button>

          <Box height="8px" />

          <Typography fontSize="14px">
            Uploading will overwrite current map data
          </Typography>

          <Box height="24px" />

          <Typography fontSize="14px">
            Preview{' '}
            <Link
              fontSize="14px"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://${accountName}.timemap.dev`}
            >{`https://${accountName}.timemap.dev`}</Link>
          </Typography>
        </Box>
      </Drawer>
    )
  }
)

type ItemRowProps = {
  count: number
  label: string
}

const ItemRow: FC<ItemRowProps> = ({ count, label }) => (
  <Typography textColor={count ? 'neutral' : 'neutral.400'}>
    {count} {label}
  </Typography>
)

type UploadArgs = {
  accountName: string
  liveData: LiveData
  setUploading: Dispatch<SetStateAction<boolean>>
  bounds: Bounds
}

const upload =
  ({ accountName, liveData, setUploading, bounds }: UploadArgs) =>
  () => {
    setUploading(true)

    fetch(`https://${accountName}.timemap.dev/api/content`, {
      method: 'POST',
      body: JSON.stringify({
        ...liveData,
        bounds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Upload failed')
        } else {
          console.log('Upload succeeded')
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setUploading(false))
  }
