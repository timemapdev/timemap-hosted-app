import Box from '@mui/material/Box'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const App: FC = () => (
  <Box display="flex">
    <style>
      {`
        .dsg-container {
          height: 100% !important;
          display: flex;
        }
        .dsg-input {
          font-size: 14px;
          line-height: 16px;
        }
        .dsg-cell-header {
          width: fit-content;
        }
        .dsg-cell-header-container {
          font-family: Roboto, Helvetica, Arial, sans-serif;
          width: fit-content;
          font-size: 14px;
          line-height: 16px;
        }
      `}
    </style>
    <Outlet />
  </Box>
)
