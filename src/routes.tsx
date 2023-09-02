import { App } from 'components/App'
import { Associations } from 'components/Associations'
import { ContentTabs } from 'components/ContentTabs/ContentTabs'
import { Events } from 'components/Events'
import { Login } from 'components/Login'
import { PasteSources } from 'components/PasteSources'
import { createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'content',
        element: <ContentTabs />,
        children: [
          {
            path: 'sources',
            element: <PasteSources tabIndex={0} />
          },
          {
            path: 'events',
            element: <Events index={1} />
          },
          {
            path: 'associations',
            element: <Associations index={3} />
          }
        ]
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
