import { ReactNode, createContext, useContext, useReducer } from 'react'
import {
  SourceValidationMessages,
  SourceValidationResult,
  SourceValidationResultLocation
} from 'types'

type SetValidationResult = {
  type: 'setValidationResult'
  payload: SourceValidationResult
}

type ClearValidationResult = {
  type: 'clearValidationResult'
  payload: SourceValidationResultLocation
}

type Action = SetValidationResult | ClearValidationResult

type Dispatch = (action: Action) => void
type State = Record<string, SourceValidationMessages>
type ValidationProviderProps = { children: ReactNode }

const ValidationStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function validationReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setValidationResult': {
      const { row, column, messages } = action.payload

      return {
        ...state,
        [row]: {
          ...state[row],
          [column]: messages
        }
      }
    }

    case 'clearValidationResult': {
      const { row, column } = action.payload

      const invalidColumns = Object.keys(state[row] ?? {})

      if (!invalidColumns.length) {
        state
      }

      if (invalidColumns.length === 1 && invalidColumns[0] === column) {
        const { [row]: _, ...newState } = state
        return newState
      } else {
        return {
          ...state,
          [row]: {
            ...state[row],
            [column]: undefined
          }
        }
      }
    }
  }
}

export function ValidationProvider({ children }: ValidationProviderProps) {
  const [state, dispatch] = useReducer(validationReducer, {})
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <ValidationStateContext.Provider value={value}>
      {children}
    </ValidationStateContext.Provider>
  )
}

export function useValidation() {
  const context = useContext(ValidationStateContext)

  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider')
  }

  return context
}
