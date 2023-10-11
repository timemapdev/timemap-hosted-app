import Box from '@mui/joy/Box'
import { Drawer } from 'components/Drawer'
import { FC, memo } from 'react'
import { useValidation } from 'components/ValidationContext'

type UploadSidebarProps = {
  open: boolean
  setUploadSidebarOpen: (open: boolean) => void
}

export const UploadSidebar: FC<UploadSidebarProps> = memo(
  ({ open, setUploadSidebarOpen }) => {
    const { state } = useValidation()

    const validationMessages = state.validation

    console.log(validationMessages)

    return (
      <Drawer
        position="right"
        title="Upload"
        open={open}
        onClose={() => setUploadSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          Uploading...
        </Box>
      </Drawer>
    )
  }
)
