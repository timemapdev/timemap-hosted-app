import { ReactNode, createContext, useContext, useReducer } from 'react'
import { SourceValidationMessages, ValidationResults } from 'types'

type SetValidationChanges<T> = {
  type: 'setValidationChanges'
  payload: ValidationResults<T>
}

type SetSkipRowChanges = {
  type: 'setSkipRowChanges'
  payload: Record<string, boolean>
}

type Action<T> = SetValidationChanges<T> | SetSkipRowChanges

type Dispatch = <T extends Record<string, unknown>>(action: Action<T>) => void
type State = {
  validation: Record<string, SourceValidationMessages>
  skipRows: Record<string, boolean>
}

type ValidationProviderProps = { children: ReactNode }

const ValidationStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const validationReducer = <T extends Record<string, unknown>>(
  state: State,
  action: Action<T>
) => {
  switch (action.type) {
    case 'setValidationChanges': {
      const validationChanges = action.payload

      const updatedValidation = Object.entries(validationChanges).reduce(
        (acc, [rowNum, columnResults]) => {
          return Object.entries(columnResults).reduce(
            (innerState, [columnName, messages]) => ({
              ...innerState,
              [rowNum]: {
                ...innerState[rowNum],
                [columnName]: messages?.length ? messages : undefined
              }
            }),
            acc
          )
        },
        state.validation
      )

      return {
        ...state,
        validation: updatedValidation
      }
    }

    case 'setSkipRowChanges': {
      const skipChanges = action.payload

      const updatedSkipRows = Object.entries(skipChanges).reduce(
        (acc, [rowNum, skip]) => {
          return {
            ...acc,
            [rowNum]: skip
          }
        },
        state.skipRows
      )

      return {
        ...state,
        skipRows: updatedSkipRows
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
