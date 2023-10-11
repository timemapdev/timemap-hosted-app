import { Drawer } from 'components/Drawer'
import { FC, memo } from 'react'
import { useValidation } from 'components/ValidationContext'
import { useInputSources } from 'components/InputSourcesContext'
import { Button } from '@mui/joy'
import { UploadIcon } from 'icons/UploadIcon'
import { LiveData } from 'liveData'

type UploadSidebarProps = {
  open: boolean
  setUploadSidebarOpen: (open: boolean) => void
}

export const UploadSidebar: FC<UploadSidebarProps> = memo(
  ({ open, setUploadSidebarOpen }) => {
    const { state } = useValidation()
    const { state: inputsState } = useInputSources()
    const { inputSources } = inputsState

    const validationMessages = state.validation

    console.log(validationMessages)

    return (
      <Drawer
        position="right"
        title="Upload"
        open={open}
        onClose={() => setUploadSidebarOpen(false)}
      >
        <Button
          endDecorator={<UploadIcon />}
          onClick={() => {
            console.log('uploading')
          }}
        >
          Upload
        </Button>
      </Drawer>
    )
  }
)

const uploader = (content: LiveData) => {
  // stuff
}
