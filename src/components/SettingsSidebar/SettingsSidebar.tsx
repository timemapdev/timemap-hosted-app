import { Drawer } from 'components/Drawer'
import { FC, memo, useEffect, useState } from 'react'
import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { Login } from 'components/Login'
import { useAuth } from 'components/AuthContext'
import Button from '@mui/joy/Button'
import { client } from 'lib/client'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Bounds } from 'types'

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
          {session ? <SettingsFormLoader /> : <Login />}
        </Box>
      </Drawer>
    )
  }
)

type SettingsFormValues = {
  id?: string
  subdomain: string
  bounds: Bounds
}

type SettingsFormProps = {
  initialValues?: SettingsFormValues
}

const SettingsForm: FC<SettingsFormProps> = ({ initialValues }) => {
  const { control, handleSubmit } = useForm<SettingsFormValues>({
    defaultValues: initialValues
  })

  const onSubmit: SubmitHandler<SettingsFormValues> = (
    { subdomain, id, ...bounds },
    event
  ) => {
    debugger
    event?.preventDefault()

    client.functions
      .invoke('map-client', {
        method: id ? 'PUT' : 'POST',
        body: {
          id,
          subdomain,
          ...bounds
        }
      })
      .then(({ data, error }) => {
        if (error) {
          throw error
        }

        console.log(data)
      })
      .catch(error => console.log(error))
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        void handleSubmit(onSubmit)(event)
      }}
    >
      <Controller
        name="subdomain"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>Subdomain</FormLabel>
            <Input placeholder="Account name" variant="outlined" {...field} />

            {initialValues?.subdomain ? (
              <FormHelperText>
                Preview{' '}
                <Link
                  fontSize="14px"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://${initialValues?.subdomain}.timemap.dev`}
                >{`https://${initialValues?.subdomain}.timemap.dev`}</Link>
              </FormHelperText>
            ) : null}
          </FormControl>
        )}
      />

      <Box height="20px" />

      <Typography fontSize="16px" fontWeight={500}>
        Bounds
      </Typography>

      <Box height="8px" />

      <Controller
        name="bounds.north"
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormControl
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <FormLabel sx={{ alignSelf: 'center' }}>North</FormLabel>
            <Input
              placeholder="90"
              variant="outlined"
              sx={{ '& input': { textAlign: 'right' } }}
              onChange={event => {
                onChange(parseInt(event.target.value))
              }}
              {...field}
            />
          </FormControl>
        )}
      />

      <Box height="8px" />

      <Controller
        name="bounds.east"
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormControl
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <FormLabel sx={{ alignSelf: 'center' }}>East</FormLabel>
            <Input
              placeholder="180"
              variant="outlined"
              sx={{ '& input': { textAlign: 'right' } }}
              onChange={event => {
                onChange(parseInt(event.target.value))
              }}
              {...field}
            />
          </FormControl>
        )}
      />

      <Box height="8px" />

      <Controller
        name="bounds.south"
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormControl
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <FormLabel sx={{ alignSelf: 'center' }}>South</FormLabel>
            <Input
              placeholder="-90"
              variant="outlined"
              sx={{ '& input': { textAlign: 'right' } }}
              onChange={event => {
                onChange(parseInt(event.target.value))
              }}
              {...field}
            />
          </FormControl>
        )}
      />

      <Box height="8px" />

      <Controller
        name="bounds.west"
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormControl
            sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <FormLabel sx={{ alignSelf: 'center' }}>West</FormLabel>
            <Input
              placeholder="-180"
              variant="outlined"
              sx={{ '& input': { textAlign: 'right' } }}
              onChange={event => {
                onChange(parseInt(event.target.value))
              }}
              {...field}
            />
          </FormControl>
        )}
      />

      <Box height="24px" />

      <Button type="submit">Save</Button>
    </form>
  )
}

const SettingsFormLoader = () => {
  const [settings, setSettings] = useState<SettingsFormValues>()

  useEffect(() => {
    client.functions
      .invoke<{
        map: {
          id: string
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
          const { id, subdomain, ...bounds } = data.map
          setSettings({ id, subdomain, bounds })
        }
      })
      .catch(error => console.log(error))
  }, [])

  return settings ? <SettingsForm initialValues={settings} /> : null
}
