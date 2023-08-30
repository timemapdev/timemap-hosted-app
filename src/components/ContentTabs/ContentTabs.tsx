import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { SyntheticEvent, useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import 'react-datasheet-grid/dist/style.css'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export const ContentTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  console.log('TAB VALUE', value)

  return (
    <Box width="100%" height="100vh" display="flex" flexDirection="column">
      <Box display="flex" flex={1}>
        <Outlet />
      </Box>
      <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Sources"
            component={RouterLink}
            to="sources"
            {...a11yProps(0)}
          />
          <Tab
            label="Events"
            component={RouterLink}
            to="events"
            {...a11yProps(1)}
          />
          <Tab
            label="Sites"
            component={RouterLink}
            to="sites"
            {...a11yProps(2)}
          />
          <Tab
            component={RouterLink}
            to="associations"
            label="Associations"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </Box>
  )
}
