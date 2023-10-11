export const isEventStart = (item: unknown) => {
  if (
    item &&
    typeof item === 'object' &&
    'timestamp' in item &&
    !item.timestamp
  ) {
    return true
  }
}
