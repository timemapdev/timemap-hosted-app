import { App } from 'components/App'
import { SourcesInput } from 'components/SourcesInput'
import { SourcesOutput } from 'components/SourcesOutput'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to="/inputs" /> },
      {
        path: 'inputs',
        element: <SourcesInput tabIndex={0} />
      },
      {
        path: 'exports/sources',
        element: <SourcesOutput tabIndex={1} />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
