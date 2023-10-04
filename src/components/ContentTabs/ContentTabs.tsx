import Tabs from '@mui/joy/Tabs'
import Tab from '@mui/joy/Tab'
import Box from '@mui/joy/Box'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import 'react-datasheet-grid/dist/style.css'
import TabList from '@mui/joy/TabList'
import { InputSourcesProvider } from 'components/InputSourcesContext'
import { ValidationProvider } from 'components/ValidationContext'
import { useLocation } from 'react-router-dom'

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const pathnameToTabIndex = (pathname: string) => {
  switch (pathname) {
    case '/exports/sources':
      return 1
    case '/exports/events':
      return 2
    case '/exports/associations':
      return 3
    default:
      return 0
  }
}

export const ContentTabs = () => {
  const { pathname } = useLocation()

  return (
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
            <Tabs
              aria-label="basic tabs example"
              value={pathnameToTabIndex(pathname)}
              onChange={() => {}}
            >
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
                <Tab
                  component={RouterLink}
                  to="exports/events"
                  {...a11yProps(2)}
                >
                  Events output
                </Tab>
                <Tab
                  component={RouterLink}
                  to="exports/associations"
                  {...a11yProps(3)}
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
}
