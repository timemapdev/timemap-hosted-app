import { FC } from 'react'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { SourceType } from 'types'

type AssociationOutputRow = {
  id: string
  description: string
  date: string
  time: string
  location: string
  latitude: string
  longitude: string
  sources: SourceType[]
}

type AssociationsOutputProps = {
  tabIndex: number
}

type AssociationNode = {
  label: string
  children: AssociationNode[]
}

const getNumbers = (str: string) => {
  const regex = /^[\d.]+/
  const matches = str.match(regex)

  const numbers = removeTrailingDot((matches?.length ? matches[0] : '').trim())
  const notNumbers = str.replace(numbers, '').trim()

  console.log({ str, numbers, notNumbers })

  return { numbers, notNumbers }
}

const removeTrailingDot = (str: string) => {
  if (str[str.length - 1] === '.') {
    return str.slice(0, -1)
  }
  return str
}

const populateNode = (
  nodes: AssociationNode[],
  numbers: string,
  notNumbers
) => {
  const nodePathIndices = numbers.split('.').map(number => {
    const index = Number(number) - 1
    return index
  })
  // TODO: continue here
}

export const AssociationsOutput: FC<AssociationsOutputProps> = ({
  tabIndex
}) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const meansOfAttackNodes: AssociationNode[] = []

  inputSources.forEach(item => {
    const { meansOfAttack, typeOfIncident } = item

    meansOfAttack?.split(',').map(chunk => {
      const { numbers, notNumbers } = getNumbers(chunk.trim())
    })
    typeOfIncident?.split(',').map(chunk => {
      const { numbers, notNumbers } = getNumbers(chunk.trim())
    })
  })

  return null
  // const columns = [
  //   {
  //     ...keyColumn('id', textColumn),
  //     title: 'id',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('description', textColumn),
  //     title: 'description',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('date', textColumn),
  //     title: 'date',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('time', textColumn),
  //     title: 'time',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('location', textColumn),
  //     title: 'location',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('latitude', textColumn),
  //     title: 'latitude',
  //     minWidth: 200
  //   },
  //   {
  //     ...keyColumn('longitude', textColumn),
  //     title: 'longitude',
  //     minWidth: 200
  //   },
  //   ...Array.from(new Array(maxAssociations), (_, index) => ({
  //     ...keyColumn(`association${index + 1}`, textColumn),
  //     title: `association${index + 1}`,
  //     minWidth: 200
  //   })),
  //   ...Array.from(new Array(maxSources), (_, index) => ({
  //     ...keyColumn(`source${index + 1}`, textColumn),
  //     title: `source${index + 1}`,
  //     minWidth: 200
  //   }))
  // ]

  // return (
  //   <Box
  //     role="tabpanel"
  //     id={`simple-tabpanel-${tabIndex}`}
  //     aria-labelledby={`simple-tab-${tabIndex}`}
  //     width="100%"
  //   >
  //     <Box>
  //       <Input tabIndex={-1} value="25.02" />
  //     </Box>
  //     <Box height="8px" />
  //     <DataSheetGrid<AssociationExportRow>
  //       value={exportAssociations}
  //       columns={columns as Partial<Column<AssociationExportRow, any, any>>[]}
  //       height={500}
  //     />
  //   </Box>
  // )
}
