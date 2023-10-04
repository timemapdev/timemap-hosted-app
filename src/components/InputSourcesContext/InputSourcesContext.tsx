import { getStateChanges } from 'lib/changes'
import {
  Context,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'
import { CellWithId } from 'react-datasheet-grid/dist/types'
import { SourceType, StateChanges } from 'types'

type SetInputSources = {
  type: 'setInputSources'
  payload: SourceType[]
}

type SetSelectedCell = {
  type: 'setSelectedCell'
  payload: CellWithId | null
}

type Action = SetInputSources | SetSelectedCell

type Dispatch = (action: Action) => void
type State = {
  inputSources: SourceType[]
  previousInputSources?: SourceType[]
  inputChanges?: StateChanges<SourceType>
  selectedCell: CellWithId | null
}

type InputSourcesProviderProps = {
  children: ReactNode
  initialState?: State
}

type InputSourcesContextData = {
  state: State
  dispatch: Dispatch
}

const InputSourcesStateContext = createContext<
  InputSourcesContextData | undefined
>(undefined)

const emptySourceInput: SourceType = {
  timestamp: '',
  sourceUrl: '',
  dateOfPost: '',
  yearOfPost: '',
  oblast: '',
  town: '',
  manualLatLng: '',
  googleDriveLinks: '',
  fileNames: '',
  archiveLink: '',
  comment: '',
  typeOfIncident: '',
  meansOfAttack: ''
}

const inputSourcesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setInputSources': {
      const inputSources = action.payload
      const previousInputSources = state.inputSources
      const inputChanges = getStateChanges(inputSources, previousInputSources)

      return {
        ...state,
        inputSources,
        previousInputSources,
        inputChanges
      }
    }

    case 'setSelectedCell': {
      return {
        ...state,
        selectedCell: action.payload
      }
    }
  }
}

export const InputSourcesProvider = ({
  children
}: InputSourcesProviderProps) => {
  const [state, dispatch] = useReducer(inputSourcesReducer, {
    inputSources: [emptySourceInput],
    selectedCell: null
  })

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <InputSourcesStateContext.Provider value={value}>
      {children}
    </InputSourcesStateContext.Provider>
  )
}

export const useInputSources = () => {
  const context = useContext(
    InputSourcesStateContext as unknown as Context<InputSourcesContextData>
  )

  if (context === undefined) {
    throw new Error(
      'useInputSources must be used within a InputSourcesProvider'
    )
  }

  return context
}
