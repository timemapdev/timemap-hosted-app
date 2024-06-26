import Autocomplete from '@mui/joy/Autocomplete'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import { FieldMeta, UserInputProps } from '@tanstack/react-form'
import { oblasts } from 'lib/oblasts'
import { FC } from 'react'

type OblastSelectProps = UserInputProps & {
  meta: FieldMeta
}

export const OblastSelect: FC<OblastSelectProps> = ({
  onChange,
  meta,
  ...props
}) => (
  <FormControl>
    <FormLabel>Label</FormLabel>
    <Autocomplete
      autoSelect
      size="sm"
      id="combo-box-demo"
      options={oblasts.map(oblast => oblast.value)}
      getOptionLabel={oblastValue =>
        oblasts.find(oblast => oblast.value === oblastValue)?.label ?? ''
      }
      sx={{ width: '100%' }}
      // renderInput={params => (
      //   <TextField
      //     {...params}
      //     error={Boolean(meta.error)}
      //     helperText={meta.error}
      //     label="Oblast"
      //   />
      // )}
      onChange={(_, value) => {
        onChange?.(value)
      }}
      {...props}
    />
  </FormControl>
)
