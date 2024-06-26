import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import { FC } from 'react'
import 'react-datasheet-grid/dist/style.css'

import { ContentTabs } from 'components/ContentTabs/ContentTabs'
import { AuthProvider } from 'components/AuthContext/AuthContext'

export const App: FC = () => (
  <CssVarsProvider>
    <AuthProvider>
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
        .event-row > .dsg-cell {
          background-color: #f5f5f5;
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
        <ContentTabs />
      </Box>
    </AuthProvider>
  </CssVarsProvider>
)
