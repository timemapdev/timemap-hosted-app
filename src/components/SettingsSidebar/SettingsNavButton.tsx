import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import { Dispatch, FC, SetStateAction } from 'react'

type SettingsNavButtonProps = {
  setSettingsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const SettingsNavButton: FC<SettingsNavButtonProps> = ({
  setSettingsSidebarOpen
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="flex-end"
    pr="8px"
    pl="8px"
  >
    <Button
      onClick={() => setSettingsSidebarOpen(value => !value)}
      variant="plain"
      size="sm"
      sx={{
        '--Link-gap': '0.5rem',
        pl: 1,
        py: 0.5,
        borderRadius: 'md'
      }}
    >
      Settings
    </Button>
  </Box>
)
