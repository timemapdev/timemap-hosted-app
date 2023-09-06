import Box from '@mui/joy/Box'
import { Drawer } from 'components/Drawer'
import { FC, Profiler, RefObject, memo } from 'react'
import { Database } from 'openapi/database.generated'
import List from '@mui/joy/List'
import { ListItem, Typography } from '@mui/joy'
import { DataSheetGridRef } from 'react-datasheet-grid'

type SourceTypeRaw = Database['public']['Tables']['source']['Row']

type ValidationMessages<T> = {
  [K in keyof T]?: string[]
}

type ValidationSidebarProps = {
  open: boolean
  setValidationSidebarOpen: (open: boolean) => void
  validationMessages: Record<string, ValidationMessages<SourceTypeRaw>>
  gridRef: RefObject<DataSheetGridRef>
}

export const ValidationSidebar: FC<ValidationSidebarProps> = memo(
  ({ validationMessages, gridRef, open, setValidationSidebarOpen }) => {
    return (
      <Profiler
        id="Drawer"
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime
        ) => {
          console.log({
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime
          })
        }}
      >
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
      </Profiler>
    )
  }
)
