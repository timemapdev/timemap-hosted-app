import { textColumn, keyColumn } from 'react-datasheet-grid'

type ToSpreadColumnDefinitionsProps = {
  name: string
  size: number
}

export const toSpreadColumnDefinitions = ({
  name,
  size
}: ToSpreadColumnDefinitionsProps) => {
  return Array.from(new Array(size), (_, index) => ({
    ...keyColumn(`${name}${index + 1}`, textColumn),
    title: `${name}${index + 1}`,
    minWidth: 200
  }))
}
