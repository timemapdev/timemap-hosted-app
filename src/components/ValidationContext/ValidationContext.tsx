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

type SetSkipRow = {
  type: 'setSkipRow'
  payload: { row: number; skip: boolean }
}

type Action = SetValidationResult | ClearValidationResult | SetSkipRow

type Dispatch = (action: Action) => void
type State = {
  validation: Record<string, SourceValidationMessages>
  skipRows: Record<string, boolean>
}

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
        validation: {
          ...state.validation,
          [row]: {
            ...state.validation[row],
            [column]: messages
          }
        }
      }
    }

    case 'clearValidationResult': {
      const { row, column } = action.payload

      const invalidColumns = Object.keys(state.validation[row] ?? {})

      if (!invalidColumns.length) {
        state
      }

      if (invalidColumns.length === 1 && invalidColumns[0] === column) {
        const { [row]: _, ...newState } = state.validation
        return {
          ...state,
          validation: {
            ...newState
          }
        }
      } else {
        return {
          ...state,
          validation: {
            ...state.validation,
            [row]: {
              ...state.validation[row],
              [column]: undefined
            }
          }
        }
      }
    }

    case 'setSkipRow': {
      const { row, skip } = action.payload

      return {
        ...state,
        skipRows: {
          ...state.skipRows,
          [row]: skip
        }
      }
    }
  }
}

export function ValidationProvider({ children }: ValidationProviderProps) {
  const [state, dispatch] = useReducer(validationReducer, {
    validation: {},
    skipRows: {}
  })
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
