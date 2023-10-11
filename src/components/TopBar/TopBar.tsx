import Box from '@mui/joy/Box'
import { FC, ReactNode } from 'react'

type TopBarProps = {
  children: ReactNode
}

export const TopBar: FC<TopBarProps> = ({ children }) => (
  <Box
    display="flex"
    padding="8px"
    position="sticky"
    top="0"
    zIndex="1"
    borderBottom="1px solid #e8ebed"
    sx={{ backgroundColor: '#F5F7FA' }}
    justifyContent="flex-end"
  >
    {children}
  </Box>
)
