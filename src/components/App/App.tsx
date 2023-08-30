import Box from '@mui/material/Box'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const App: FC = () => (
  <Box display="flex">
    <style>
      {`
        .dsg-cell-header {
          width: fit-content;
        }
        .dsg-cell-header-container {
          font-family: Roboto, Helvetica, Arial, sans-serif;
          width: fit-content;
        }
      `}
    </style>
    <Outlet />
  </Box>
)
