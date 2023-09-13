import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const App: FC = () => (
  <CssVarsProvider>
    <CssBaseline />

    <Box display="flex">
      <style>
        {`
        body {
          margin: 0;
        }
        .dsg-cell-header {
          border-top: none;
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
  </CssVarsProvider>
)
