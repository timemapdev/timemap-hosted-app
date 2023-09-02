/* eslint-disable react/no-children-prop */
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import { useForm } from '@tanstack/react-form'
import { OblastSelect } from 'components/OblastSelect'
import { FC, useMemo } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Input from '@mui/joy/Input'

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
            {field => (
              <FormControl required size="sm" color="primary">
                <FormLabel>Town</FormLabel>
                <Input
                  fullWidth
                  variant="outlined"
                  {...field.getInputProps()}
                />
                {<FormHelperText>{field.getMeta().error}</FormHelperText>}
              </FormControl>
            )}
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
            {field => (
              <FormControl required size="sm" color="primary">
                <FormLabel>Coordinates</FormLabel>
                <Input
                  fullWidth
                  variant="outlined"
                  {...field.getInputProps()}
                />
                {<FormHelperText>{field.getMeta().error}</FormHelperText>}
              </FormControl>
            )}
          </Field>
        </Box>
        <Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
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
