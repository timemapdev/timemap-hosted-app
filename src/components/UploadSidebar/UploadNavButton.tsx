import Link from '@mui/joy/Link'
import { Button } from '@mui/joy'
import Box from '@mui/joy/Box'
import { Dispatch, FC, SetStateAction } from 'react'
import { UploadIcon } from 'icons/UploadIcon'

type UploadNavButtonProps = {
  setUploadSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const UploadNavButton: FC<UploadNavButtonProps> = ({
  setUploadSidebarOpen
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      pr="8px"
      pl="8px"
    >
      <Link
        component={Button}
        onClick={() => setUploadSidebarOpen(value => !value)}
        underline="none"
        variant="plain"
        size="sm"
        sx={{
          '--Link-gap': '0.5rem',
          pl: 1,
          py: 0.5,
          borderRadius: 'md'
        }}
      >
        <UploadIcon />
      </Link>
    </Box>
  )
}
