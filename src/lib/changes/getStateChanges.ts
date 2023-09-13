import { ObjectChange, StateChanges } from 'types'

export const getStateChanges = <T extends Record<string, unknown>>(
  current: T[],
  previous?: T[]
) => {
  const initial: StateChanges<T> = {}

  const changes = current.reduce<StateChanges<T>>((acc, row, index) => {
    const objectChanges = compareObjects(row, previous?.[index])
    return objectChanges
      ? {
          ...acc,
          [index]: objectChanges
        }
      : acc
  }, initial)

  return changes === initial ? undefined : changes
}

const compareObjects = <T extends Record<string, unknown>>(
  current: T,
  previous?: T
) => {
  const initial: ObjectChange<T> = {}
  if (current === previous) {
    return undefined
  }

  const changes = Object.entries(current).reduce<ObjectChange<T>>(
    (acc, [key, prop]) => {
      if (!previous) {
        return {
          ...acc,
          [key]: {
            previous: undefined,
            current: prop
          }
        }
      }

      if (!Object.is(previous[key], prop)) {
        return {
          ...acc,
          [key]: {
            previous: previous[key],
            current: prop
          }
        }
      }

      return acc
    },
    initial
  )

  return changes === initial ? undefined : changes
}
