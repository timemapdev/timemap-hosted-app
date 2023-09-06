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
    const { state: validationMessages } = useValidation()
    return (
      <Drawer
        position="right"
        title="Validation"
        open={open}
        onClose={() => setValidationSidebarOpen(false)}
      >
        <Box display="flex" flexDirection="column">
          <List>
            {Object.entries(validationMessages).map(
              ([rowNum, rowValidation]) => {
                return Object.entries(rowValidation).map(
                  ([property, messages]) => (
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
                        <Typography
                          component="span"
                          fontSize="14px"
                        >{`${messages.reduce(
                          (acc, message) => `${acc}, ${message}`
                        )}`}</Typography>
                        <Typography
                          component="span"
                          fontSize="12px"
                          sx={theme => ({
                            color: `${theme.vars.palette.neutral[400]}`
                          })}
                        >{`Row: ${rowNum}, Column: ${property}`}</Typography>
                      </Box>
                    </ListItem>
                  )
                )
              }
            )}
          </List>
        </Box>
      </Drawer>
    )
  }
)
