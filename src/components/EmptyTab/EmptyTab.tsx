import Box from '@mui/joy/Box'
import { FC } from 'react'
import { Link, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

type EmptyTabProps = {
  name: 'sources' | 'associations' | 'events'
  tabIndex: number
}

export const EmptyTab: FC<EmptyTabProps> = ({ name, tabIndex }) => (
  <Box
    role="tabpanel"
    id={`simple-tabpanel-${tabIndex}`}
    aria-labelledby={`simple-tab-${tabIndex}`}
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Box display="flex" flexDirection="column" width="fit-content">
      <Typography fontWeight="700">{`No ${name} available to export`}</Typography>
      <Typography>
        Please add valid source rows to{' '}
        <Link component={RouterLink} to="/inputs">
          Sources input
        </Link>
      </Typography>
    </Box>
  </Box>
)
