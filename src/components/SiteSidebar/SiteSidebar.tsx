import Box from '@mui/joy/Box'
import { Drawer } from 'components/Drawer'
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
  return (
    <Drawer position="right" title="Add new site" {...props}>
      <Box display="flex" flexDirection="column">
        <SiteSidebarForm {...initialData} />
      </Box>
    </Drawer>
  )
}
