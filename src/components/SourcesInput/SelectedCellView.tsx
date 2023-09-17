import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import { useInputSources } from 'components/InputSourcesContext'
import { SourceType } from 'types'

export const SelectedCellView = () => {
  const { state } = useInputSources()
  const { selectedCell, inputSources } = state

  return (
    <Box flex={1}>
      <Input
        disabled={true}
        // onFocus={() => {
        //   if (selectedCell && ref.current) {
        //     ref.current?.setSelection({
        //       min: selectedCell,
        //       max: selectedCell
        //     })
        //   }
        // }}
        value={
          selectedCell && selectedCell.colId
            ? inputSources[selectedCell?.row]?.[
                selectedCell.colId as keyof SourceType
              ] ?? ''
            : ''
        }
      />
    </Box>
  )
}
