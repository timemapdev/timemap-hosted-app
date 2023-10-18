import Chip from '@mui/joy/Chip'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import { Dispatch, FC, SetStateAction } from 'react'
import { useValidation } from 'components/ValidationContext'
import { useInputSources } from 'components/InputSourcesContext'
import { toLiveData } from 'lib/munging'

type UploadNavButtonProps = {
  setUploadSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const UploadNavButton: FC<UploadNavButtonProps> = ({
  setUploadSidebarOpen
}) => {
  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const liveData = toLiveData({ inputSources, validation, skipRows })

  const { events, associations, sources } = liveData

  const uploadCount =
    Object.values(sources).length + events.length + associations.length

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      pr="8px"
      pl="8px"
    >
      <Button
        onClick={() => setUploadSidebarOpen(value => !value)}
        variant="plain"
        size="sm"
        endDecorator={
          <Chip color="success" variant="soft" size="sm">
            {uploadCount}
          </Chip>
        }
        sx={{
          '--Link-gap': '0.5rem',
          pl: 1,
          py: 0.5,
          borderRadius: 'md'
        }}
      >
        Upload
      </Button>
    </Box>
  )
}
