import {
  Context,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'
import { Session } from '@supabase/supabase-js'

type SetSession = {
  type: 'setSession'
  payload: Session | null
}

type AuthAction = SetSession

type Dispatch = (action: AuthAction) => void
type AuthState = {
  session: Session | null
}

type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
}

type AuthContextData = {
  state: AuthState
  dispatch: Dispatch
}

const AuthStateContext = createContext<AuthContextData | undefined>(undefined)

const validationReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'setSession': {
      return {
        ...state,
        session: action.payload
      }
    }
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(validationReducer, {
    session: null
  })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(
    AuthStateContext as unknown as Context<AuthContextData>
  )

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
