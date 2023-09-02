import Box from '@mui/joy/Box'
import { Drawer } from 'components/Drawer'
import { FC } from 'react'

type ValidationSidebarProps = {
  open: boolean
  onClose: () => void
}

export const ValidationSidebar: FC<ValidationSidebarProps> = ({ ...props }) => (
  <Drawer position="right" title="Validation" {...props}>
    <Box display="flex" flexDirection="column">
      Stuff goes here
    </Box>
  </Drawer>
)
