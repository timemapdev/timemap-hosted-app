/* eslint-disable react/no-children-prop */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from '@tanstack/react-form'
import { OblastSelect } from 'components/OblastSelect'
import { FC, useMemo } from 'react'

type SiteSidebarFormProps = {
  oblast: string
  town: string
  latLng?: string
}

export const SiteSidebarForm: FC<SiteSidebarFormProps> = ({
  oblast,
  town,
  latLng = ''
}) => {
  const { Provider, Field, Subscribe, getFormProps } = useForm({
    // Memoize your default values to prevent re-renders
    defaultValues: useMemo(
      () => ({
        oblast,
        town,
        latLng
      }),
      []
    ),

    onSubmit: values => {
      // Do something with form data
      console.log(values)
    }
  })

  return (
    <Provider>
      <Box
        component="form"
        {...getFormProps()}
        display="flex"
        flexDirection="column"
        gap="24px"
      >
        <Typography variant="h6" component="h2">
          Add new site
        </Typography>
        <Box>
          {/* A type-safe and pre-bound field component*/}
          <Field
            name="oblast"
            onChange={value => {
              return value === null ? 'Please select an oblast' : undefined
            }}
          >
            {field => (
              <OblastSelect
                meta={field.getMeta()}
                {...field.getChangeProps()}
              />
            )}
          </Field>
        </Box>
        <Box>
          <Field
            name="town"
            onChange={value => {
              return !value ? 'Please enter town name' : undefined
            }}
          >
            {field => {
              const { error } = field.getMeta()
              return (
                <TextField
                  {...field.getInputProps()}
                  size="small"
                  error={Boolean(error)}
                  helperText={error}
                  label="Town"
                  sx={{ width: '100%' }}
                />
              )
            }}
          </Field>
        </Box>
        <Box>
          <Field
            name="latLng"
            onChange={value => {
              return !value
                ? 'Please default coordinates for this location'
                : undefined
            }}
          >
            {field => {
              const { error } = field.getMeta()
              return (
                <TextField
                  {...field.getInputProps()}
                  size="small"
                  error={Boolean(error)}
                  helperText={error}
                  label="Coordinates"
                  sx={{ width: '100%' }}
                />
              )
            }}
          </Field>
        </Box>
        <Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} variant="contained">
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </Box>
    </Provider>
  )
}

{
  /* <>
<label htmlFor={field.name}>First Name:</label>
<input name={field.name}  />
<FieldInfo field={field} />
</> */
}
