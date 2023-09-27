import { FC } from 'react'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { SourceType } from 'types'
import { getNumbers, includeInOutput } from 'lib/munging'

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
  children: Record<string, AssociationNode>
}

type PopulateNodeArgs = {
  node: AssociationNode
  numbers: string
  notNumbers: string
}

export const example: AssociationNode = {
  label: 'Means of attack',
  children: {
    '1': {
      label: 'Undefined',
      children: {}
    },
    '2': {
      label: 'Bomb',
      children: {
        '1': {
          label: 'Car bomb',
          children: {}
        },
        '2': {
          label: 'Other bomb',
          children: {}
        }
      }
    }
  }
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

export const AssociationsOutput: FC<AssociationsOutputProps> = ({
  tabIndex
}) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

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

  console.log({ meansOfAttackNode, typeOfIncidentNode })

  return null
}
