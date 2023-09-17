import {
  ObjectChange,
  ObjectValidationResult,
  StateChanges,
  ValidationResults,
  ValidationRules
} from 'types'

export const getSkipRows = <T extends Record<string, unknown>>(
  changes: StateChanges<T>
) => {
  return Object.entries(changes).reduce((acc, [rowNum, objectChanges]) => {
    if (typeof objectChanges.timestamp === 'undefined') {
      return acc
    }

    return {
      ...acc,
      [rowNum]: !objectChanges.timestamp.current
    }
  }, {})
}

export const validateState =
  <T extends Record<string, unknown>>(rules: ValidationRules<T>) =>
  (data: StateChanges<T>) => {
    const initial: ValidationResults<T> = {}

    const results = Object.entries(data).reduce<ValidationResults<T>>(
      (acc, [rowNum, objectChanges]) => {
        const rowResults = validateObject(rules)(objectChanges)

        if (!rowResults) {
          return acc
        }

        return {
          ...acc,
          [rowNum]: rowResults
        }
      },
      initial
    )

    return results === initial ? undefined : results
  }

const validateObject =
  <T extends Record<string, unknown>>(rules: ValidationRules<T>) =>
  (rowChange: ObjectChange<T>) => {
    const initial: ObjectValidationResult<T> = {}
    const results = Object.entries(rowChange).reduce<ObjectValidationResult<T>>(
      (acc, [columnName, value]) => {
        if (!rules[columnName]) {
          return acc
        }

        const result = rules[columnName](value?.current)

        return {
          ...acc,
          [columnName]: result
        }
      },
      initial
    )

    return results === initial ? undefined : results
  }
