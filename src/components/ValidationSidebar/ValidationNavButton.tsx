import Link from '@mui/joy/Link'
import Chip from '@mui/joy/Chip'
import { Button } from '@mui/joy'
import Box from '@mui/joy/Box'
import { Dispatch, FC, SetStateAction } from 'react'
import { useValidation } from 'components/ValidationContext'

type ValidationNavButtonProps = {
  setValidationSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const ValidationNavButton: FC<ValidationNavButtonProps> = ({
  setValidationSidebarOpen
}) => {
  const { state } = useValidation()
  const errorCount = Object.values(state).reduce((acc, curr) => {
    return Object.keys(curr).length + acc
  }, 0)

  return (
    <Box
      width="150px"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      pr="8px"
    >
      <Link
        component={Button}
        onClick={() => setValidationSidebarOpen(value => !value)}
        underline="none"
        variant="plain"
        size="sm"
        endDecorator={
          <Chip
            color={errorCount ? 'danger' : 'success'}
            variant="soft"
            size="sm"
          >
            {errorCount}
          </Chip>
        }
        sx={{
          '--Link-gap': '0.5rem',
          pl: 1,
          py: 0.5,
          borderRadius: 'md'
        }}
      >
        Errors
      </Link>
    </Box>
  )
}
