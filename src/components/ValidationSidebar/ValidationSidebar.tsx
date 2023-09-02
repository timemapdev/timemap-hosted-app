import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { Drawer } from 'components/Drawer'
import { FC, RefObject } from 'react'
import { Database } from 'openapi/database.generated'
import List from '@mui/joy/List'
import { ListItem } from '@mui/joy'
import { DataSheetGridRef } from 'react-datasheet-grid'

type SourceTypeRaw = Database['public']['Tables']['source']['Row']

type ValidationMessages<T> = {
  [K in keyof T]?: string[]
}

type ValidationSidebarProps = {
  open: boolean
  onClose: () => void
  validationMessages: Record<string, ValidationMessages<SourceTypeRaw>>
  gridRef: RefObject<DataSheetGridRef>
}

export const ValidationSidebar: FC<ValidationSidebarProps> = ({
  validationMessages,
  gridRef,
  ...props
}) => (
  <Drawer position="right" title="Validation" {...props}>
    <Box display="flex" flexDirection="column">
      <List>
        {Object.entries(validationMessages).map(([rowNum, rowValidation]) => {
          return (
            <>
              <ListItem
                key={rowNum}
                sx={{
                  color: 'red',
                  cursor: 'pointer',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {`Row: ${rowNum}`}
                {Object.entries(rowValidation).map(([property, messages]) => (
                  <>
                    {property}
                    {/* onClick={() => {
                              gridRef.current?.setActiveCell({
                                row: Number(rowNum),
                                col: property
                              })
                            }} */}
                    {messages.reduce((acc, message) => {
                      return `${acc} ${message}`
                    })}
                  </>
                ))}
              </ListItem>
            </>
          )
        })}
      </List>
    </Box>
  </Drawer>
)
