import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { FC } from 'react'

type AssociationsProps = {
  index: number
}

export const Associations: FC<AssociationsProps> = ({ index }) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box sx={{ p: 3 }}>
        <Typography>Associations</Typography>
      </Box>
    </div>
  )
}
