import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { FC } from 'react'

type EventsProps = {
  index: number
}

export const Events: FC<EventsProps> = ({ index }) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box sx={{ p: 3 }}>
        <Typography>Events</Typography>
      </Box>
    </div>
  )
}
