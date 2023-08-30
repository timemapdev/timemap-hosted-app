import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { SiteSidebarForm } from 'components/SiteSidebar/SiteSidebarForm'
import { FC } from 'react'

type InitialSite = {
  oblast: string
  town: string
}

type SiteSidebarProps = {
  open: boolean
  onClose: () => void
  initialData: InitialSite
}

export const SiteSidebar: FC<SiteSidebarProps> = ({
  initialData,
  ...props
}) => {
  console.log('Initial data', initialData)

  return (
    <Drawer anchor="right" {...props}>
      <Box display="flex" flexDirection="column" width="400px" padding="8px">
        <SiteSidebarForm {...initialData} />
      </Box>
    </Drawer>
  )
}
