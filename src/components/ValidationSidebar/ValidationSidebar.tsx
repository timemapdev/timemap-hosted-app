import Box from '@mui/joy/Box'
import { Drawer } from 'components/Drawer'
import { FC, RefObject, memo } from 'react'
import List from '@mui/joy/List'
import { ListItem, Typography } from '@mui/joy'
import { DataSheetGridRef } from 'react-datasheet-grid'
import { useValidation } from 'components/ValidationContext'

type ValidationSidebarProps = {
  open: boolean
  setValidationSidebarOpen: (open: boolean) => void
  gridRef: RefObject<DataSheetGridRef>
}

export const ValidationSidebar: FC<ValidationSidebarProps> = memo(
  ({ gridRef, open, setValidationSidebarOpen }) => {
    const { state } = useValidation()

    const validationMessages = state.validation
    return (
      <Drawer
        position="right"
        title="Validation"
        open={open}
        onClose={() => setValidationSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          <List>
            {Object.entries(validationMessages)
              .filter(([rowNum]) => state.skipRows[rowNum] !== true)
              .map(([rowNum, rowValidation]) => {
                return Object.entries(rowValidation)
                  .filter(
                    entry => Boolean(entry[0]) && Boolean(entry[1]?.length)
                  )
                  .map(([property, messages = []]) => (
                    <ListItem
                      key={`${rowNum}${property}`}
                      onClick={() => {
                        gridRef.current?.setActiveCell({
                          row: Number(rowNum),
                          col: property
                        })
                      }}
                      sx={{
                        cursor: 'pointer',
                        ':hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <Box display="flex" flexDirection="column">
                        <Typography component="pre" fontSize="14px">
                          {messages.join(', ')}
                        </Typography>
                        <Typography
                          component="span"
                          fontSize="12px"
                          sx={theme => ({
                            color: `${theme.vars.palette.neutral[400]}`
                          })}
                        >{`Row: ${rowNum}, Column: ${property}`}</Typography>
                      </Box>
                    </ListItem>
                  ))
              })}
          </List>
        </Box>
      </Drawer>
    )
  }
)
