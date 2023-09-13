import { useEffect, useRef } from 'react'

type PropChange = {
  previous: unknown
  current: unknown
}

export const usePropChanges = <T extends Record<string, unknown>>(props: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = props
  })

  return Object.entries(props).reduce<Record<string, PropChange> | undefined>(
    (acc = {}, [key, prop]) => {
      if (!ref.current) {
        return {
          ...acc,
          [key]: {
            previous: undefined,
            current: prop
          }
        }
      }

      if (!Object.is(ref.current[key], prop)) {
        return {
          ...acc,
          [key]: {
            previous: ref.current[key],
            current: prop
          }
        }
      }

      return acc
    },
    undefined
  )
}
