import Tabs from '@mui/joy/Tabs'
import Tab from '@mui/joy/Tab'
import Box from '@mui/joy/Box'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import 'react-datasheet-grid/dist/style.css'
import TabList from '@mui/joy/TabList'
import { InputSourcesProvider } from 'components/InputSourcesContext'
import { ValidationProvider } from 'components/ValidationContext'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export const ContentTabs = () => (
  <InputSourcesProvider>
    <ValidationProvider>
      <Box width="100%" height="100vh" display="flex" flexDirection="column">
        <Box display="flex" flex={1} width="100vw" minWidth="0">
          <Outlet />
        </Box>
        <Box
          display="flex"
          flex={0}
          sx={{ borderTop: 1, borderColor: 'divider' }}
        >
          <Tabs aria-label="basic tabs example">
            <TabList>
              <Tab component={RouterLink} to="inputs" {...a11yProps(0)}>
                Sources input
              </Tab>
              <Tab
                component={RouterLink}
                to="exports/sources"
                {...a11yProps(1)}
              >
                Sources output
              </Tab>
              <Tab component={RouterLink} to="exports/events" {...a11yProps(2)}>
                Events output
              </Tab>
              <Tab component={RouterLink} to="exports/sites" {...a11yProps(3)}>
                Sites output
              </Tab>
              <Tab
                component={RouterLink}
                to="exports/associations"
                {...a11yProps(4)}
              >
                Associations output
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>
    </ValidationProvider>
  </InputSourcesProvider>
)
