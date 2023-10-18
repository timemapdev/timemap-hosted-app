import { Drawer } from 'components/Drawer'
import { Dispatch, FC, SetStateAction, memo, useState } from 'react'
import { useValidation } from 'components/ValidationContext'
import { useInputSources } from 'components/InputSourcesContext'
import { Box, Button, Typography } from '@mui/joy'
import { UploadIcon } from 'icons/UploadIcon'
import { toLiveData } from 'lib/munging'
import Input from '@mui/material/Input'
import { LiveData } from 'types'
import { Login } from 'components/Login'

type UploadSidebarProps = {
  open: boolean
  setUploadSidebarOpen: (open: boolean) => void
}

export const UploadSidebar: FC<UploadSidebarProps> = memo(
  ({ open, setUploadSidebarOpen }) => {
    const [uploading, setUploading] = useState(false)
    const [accountName, setAccountName] = useState('')
    const { state: validationState } = useValidation()
    const { validation, skipRows } = validationState

    const { state: inputsState } = useInputSources()
    const { inputSources } = inputsState

    const liveData = toLiveData({ inputSources, validation, skipRows })

    const { events, associations, sources } = liveData

    const uploadDisabled =
      !Object.values(sources).length && !events.length && !associations.length

    return (
      <Drawer
        position="right"
        title="Upload"
        open={open}
        onClose={() => setUploadSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          <Typography>Available to upload</Typography>

          <ItemRow count={Object.values(sources).length} label="Sources" />
          <ItemRow count={events.length} label="Events" />
          <ItemRow count={associations.length} label="Associations" />

          <Box height="24px" />

          <Button
            disabled={uploadDisabled || !accountName}
            loading={uploading}
            endDecorator={<UploadIcon />}
            onClick={upload({ accountName, liveData, setUploading })}
          >
            Upload
          </Button>

          <Box height="16px" />

          <Typography>Uploading will overwrite current map data</Typography>
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
}

const upload =
  ({ accountName, liveData, setUploading }: UploadArgs) =>
  () => {
    setUploading(true)

    fetch(`https://${accountName}.timemap.dev/api/content`, {
      method: 'POST',
      body: JSON.stringify(liveData),
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
