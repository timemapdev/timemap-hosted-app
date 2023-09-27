export const scrubAssociation = (association: string) => {
  const { numbers, notNumbers } = getNumbers(association)

  return `${numbers} ${notNumbers}`
}

export const getNumbers = (str: string) => {
  const regex = /^[\d.]+/
  const matches = str.match(regex)

  const numbers = removeTrailingDot((matches?.length ? matches[0] : '').trim())
  const notNumbers = removeLeadinggDot(str.replace(numbers, '')).trim()

  return { numbers, notNumbers }
}

export const removeTrailingDot = (str: string) => {
  return str[str.length - 1] === '.' ? str.slice(0, -1) : str
}

export const removeLeadinggDot = (str: string) => {
  return str[0] === '.' ? str.slice(1) : str
}
