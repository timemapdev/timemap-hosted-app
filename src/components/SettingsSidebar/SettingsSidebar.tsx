import { Drawer } from 'components/Drawer'
import { FC, memo, useState } from 'react'
import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { Login } from 'components/Login'
import { useAuth } from 'components/AuthContext'
import Button from '@mui/joy/Button'
import { client } from 'lib/client'

type SettingsSidebarProps = {
  open: boolean
  setSettingsSidebarOpen: (open: boolean) => void
}

export const SettingsSidebar: FC<SettingsSidebarProps> = memo(
  ({ open, setSettingsSidebarOpen }) => {
    const { state } = useAuth()
    const { session } = state

    return (
      <Drawer
        position="right"
        title="Settings"
        open={open}
        onClose={() => setSettingsSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          {session ? <SettingsForm /> : <Login />}
        </Box>
      </Drawer>
    )
  }
)

const SettingsForm = () => {
  const [subdomain, setSubdomain] = useState('')

  client.functions
    .invoke('map-client', { method: 'GET' })
    .then(({ data, error }) => {
      if (error) {
        throw error
      }

      console.log(data)
    })
    .catch(error => console.log(error))

  return (
    <>
      <Input
        placeholder="Account name"
        variant="outlined"
        value={subdomain}
        onChange={event => setSubdomain(event.target.value)}
      />

      <Box height="16px" />

      <Button
        // disabled={uploadDisabled || !subdomain}
        // loading={uploading}
        // endDecorator={<UploadIcon />}
        onClick={() => saveSubdomain({ subdomain })}
      >
        Save
      </Button>
    </>
  )
}

type SetSubdomaiArgs = {
  subdomain: string
}

const saveSubdomain = ({ subdomain }: SetSubdomaiArgs) => {
  client.functions
    .invoke('map-client', {
      body: { subdomain }
    })
    .then(({ data, error }) => {
      if (error) {
        throw error
      }

      console.log(data)
    })
    .catch(error => console.log(error))
}
