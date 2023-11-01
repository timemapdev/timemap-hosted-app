import parse from 'date-fns/parse'

export const isEventStart = (item: unknown) => {
  if (
    item &&
    typeof item === 'object' &&
    'timestamp' in item &&
    (!item.timestamp ||
      typeof item.timestamp !== 'string' ||
      !isValidDate(parse(item.timestamp, 'dd/MM/yyyy HH:mm:ss', new Date())))
  ) {
    return true
  }
}

const isValidDate = (d: unknown) => {
  return d instanceof Date && !isNaN(d as unknown as number)
}
