import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type SitesProps = {
  index: number
}

export const Sites: FC<SitesProps> = ({ index }) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box sx={{ p: 3 }}>
        <Typography>Sites</Typography>
      </Box>
    </div>
  )
}
