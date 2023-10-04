import { FC, useMemo } from 'react'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import {
  getNumbers,
  includeInOutput,
  toSpreadColumnDefinitions
} from 'lib/munging'
import { textColumn, keyColumn, DataSheetGrid } from 'react-datasheet-grid'
import Box from '@mui/joy/Box'
import { useWindowSize } from '@uidotdev/usehooks'
import { Column } from 'react-datasheet-grid/dist/types'
import { SourceType, ValidationResults } from 'types'
import { EmptyTab } from 'components/EmptyTab'

type AssociationOutputRow = {
  id: string
  title: string
  desc: string
  mode: 'FILTER'
} & FiltersPaths

type FiltersPaths = {
  filter_path1: string
}

type AssociationsOutputProps = {
  tabIndex: number
}

type AssociationNode = {
  label: string
  children: Record<string, AssociationNode>
}

type PopulateNodeArgs = {
  node: AssociationNode
  numbers: string
  notNumbers: string
}

const getMaxNodeDepth = (node: AssociationNode, depth = 0): number => {
  if (Object.keys(node.children).length === 0) {
    return depth
  }

  return Math.max(
    ...Object.values(node.children).map(child =>
      getMaxNodeDepth(child, depth + 1)
    )
  )
}

const populateNode = ({ node, numbers, notNumbers }: PopulateNodeArgs) => {
  return numbers.split('.').reduce((acc, pathIndex, index, arr) => {
    if (!acc.children[pathIndex]) {
      acc.children[pathIndex] = { label: '', children: {} }
    }

    // last index numbers list
    if (index === arr.length - 1) {
      acc.children[pathIndex].label = `${numbers} ${notNumbers}`
      return acc
    } else {
      return acc.children[pathIndex]
    }
  }, node)
}

type GenerateAssociationTreesArgs = {
  inputSources: SourceType[]
  validation: ValidationResults<Record<string, unknown>>
  skipRows: Record<string, boolean>
}

const generateAssociationTrees = ({
  inputSources,
  validation,
  skipRows
}: GenerateAssociationTreesArgs) => {
  const meansOfAttackNode: AssociationNode = {
    label: 'Means of attack',
    children: {}
  }

  const typeOfIncidentNode: AssociationNode = {
    label: 'Type of incident',
    children: {}
  }

  inputSources.forEach((item, index) => {
    const { meansOfAttack, typeOfIncident } = item

    if (!includeInOutput({ skipRows, validation, index })) {
      return
    }

    meansOfAttack?.split(',').forEach(chunk => {
      const { numbers, notNumbers } = getNumbers(chunk.trim())
      populateNode({ node: meansOfAttackNode, numbers, notNumbers })
    })

    typeOfIncident?.split(',').forEach(chunk => {
      const { numbers, notNumbers } = getNumbers(chunk.trim())
      populateNode({ node: typeOfIncidentNode, numbers, notNumbers })
    })
  })

  return { meansOfAttackNode, typeOfIncidentNode }
}

type GenerateAssociationRowsArgs = {
  node: AssociationNode
  parentPaths: string[]
  outputs: AssociationOutputRow[]
}

const generateAssociationRows = ({
  node,
  parentPaths,
  outputs
}: GenerateAssociationRowsArgs): AssociationOutputRow[] => {
  const { label, children } = node

  const associationPaths = [...parentPaths, label].reduce<FiltersPaths>(
    (acc, path, index) => {
      return {
        ...acc,
        [`filter_path${index + 1}`]: path
      }
    },
    {} as FiltersPaths
  )

  if (parentPaths.length) {
    outputs.push({
      id: node.label,
      title: '',
      desc: node.label,
      mode: 'FILTER',
      ...associationPaths
    })
  }

  return Object.keys(children).reduce((acc, key) => {
    const childNode = children[key]

    return generateAssociationRows({
      node: childNode,
      parentPaths: [...parentPaths, label],
      outputs: acc
    })
  }, outputs)
}

export const AssociationsOutput: FC<AssociationsOutputProps> = ({
  tabIndex
}) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const { meansOfAttackNode, typeOfIncidentNode } = useMemo(
    () =>
      generateAssociationTrees({
        inputSources,
        validation,
        skipRows
      }),
    [inputSources, validation, skipRows]
  )

  const maxMeansOfAttackDepth = getMaxNodeDepth(meansOfAttackNode)
  const maxTypeOfIncidentDepth = getMaxNodeDepth(typeOfIncidentNode)
  const maxDepth = Math.max(maxMeansOfAttackDepth, maxTypeOfIncidentDepth) + 1

  const typeOfIncidentExports = generateAssociationRows({
    node: typeOfIncidentNode,
    parentPaths: [],
    outputs: []
  })

  const meansOfAttackExports = generateAssociationRows({
    node: meansOfAttackNode,
    parentPaths: [],
    outputs: []
  })

  const exportAssociations = [...typeOfIncidentExports, ...meansOfAttackExports]

  const columns = [
    {
      ...keyColumn('id', textColumn),
      title: 'id',
      minWidth: 200
    },
    {
      ...keyColumn('title', textColumn),
      title: 'title',
      minWidth: 200
    },
    {
      ...keyColumn('desc', textColumn),
      title: 'desc',
      minWidth: 200
    },
    {
      ...keyColumn('mode', textColumn),
      title: 'mode',
      minWidth: 200
    },
    ...toSpreadColumnDefinitions({ name: 'filter_path', size: maxDepth })
  ]

  const { height } = useWindowSize()

  if (!exportAssociations.length) {
    return <EmptyTab tabIndex={tabIndex} name="associations" />
  }

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <DataSheetGrid<AssociationOutputRow>
        value={exportAssociations}
        columns={columns as Partial<Column<AssociationOutputRow, any, any>>[]}
        height={(height ?? 1000) - 100}
      />
    </Box>
  )
}
