type ToSpreadColumnValues = {
  columnPrefix: string
  values: string[]
}

export const toSpreadColumnValues = <T extends Record<string, string>>({
  columnPrefix,
  values
}: ToSpreadColumnValues) => {
  return values.reduce<T>(
    (acc, value, index) => ({
      ...acc,
      [`${columnPrefix}${index + 1}`]: value
    }),
    {} as T
  )
}
