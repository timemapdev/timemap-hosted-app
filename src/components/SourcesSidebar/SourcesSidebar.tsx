import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { FC } from 'react'

type SourcesSidebarProps = {
  isOpen: boolean
  closeDrawer: () => void
}

export const SourcesSidebar: FC<SourcesSidebarProps> = ({
  isOpen,
  closeDrawer
}) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={closeDrawer}
    hideBackdrop
    variant="persistent"
  >
    <Box display="flex" width="400px" flexDirection="column">
      Stuff goes here
    </Box>
  </Drawer>
)
