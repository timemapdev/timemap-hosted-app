import { getNumbers, includeInOutput } from 'lib/munging'
import {
  AssociationNode,
  AssociationOutput,
  SourceType,
  ValidationResults
} from 'types'

type ToAssociationsOutputArgs = {
  inputSources: SourceType[]
  skipRows: Record<string, boolean>
  validation: ValidationResults<Record<string, unknown>>
}

export const toAssociationsOutput = ({
  inputSources,
  validation,
  skipRows
}: ToAssociationsOutputArgs) => {
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

  const associationsOutput = [...typeOfIncidentExports, ...meansOfAttackExports]

  return { associationsOutput, maxDepth }
}

type PopulateNodeArgs = {
  node: AssociationNode
  numbers: string
  notNumbers: string
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

type GenerateAssociationRowsArgs = {
  node: AssociationNode
  parentPaths: string[]
  outputs: AssociationOutput[]
}

const generateAssociationRows = ({
  node,
  parentPaths,
  outputs
}: GenerateAssociationRowsArgs): AssociationOutput[] => {
  const { label, children } = node

  // const associationPaths = [...parentPaths, label].reduce<FiltersPathsObject>(
  //   (acc, path, index) => {
  //     return {
  //       ...acc,
  //       [`filter_path${index + 1}`]: path
  //     }
  //   },
  //   {} as FiltersPathsObject
  // )

  if (parentPaths.length) {
    outputs.push({
      id: node.label,
      title: '',
      desc: node.label,
      mode: 'FILTER',
      filter_paths: [...parentPaths, label]
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
