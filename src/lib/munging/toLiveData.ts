import { toAssociationsOutput } from 'models/toAssociationsOutput'
import { toEventsOutput } from 'models/toEventsOutput'
import { toSourcesOutput } from 'models/toSourcesOutput'
import { LiveData, SourceOutput, SourceType, ValidationResults } from 'types'

type ToLiveDataArgs = {
  inputSources: SourceType[]
  validation: ValidationResults<Record<string, unknown>>
  skipRows: Record<string, boolean>
}

export const toLiveData = ({
  inputSources,
  validation,
  skipRows
}: ToLiveDataArgs) => {
  const sourcesOutput = toSourcesOutput({
    inputSources,
    validation,
    skipRows
  })

  const { associationsOutput } = toAssociationsOutput({
    inputSources,
    validation,
    skipRows
  })

  const { eventOutputs } = toEventsOutput({
    inputSources,
    validation,
    skipRows,
    associations: associationsOutput
  })

  const sourceMap = sourcesOutput.reduce<Record<string, SourceOutput>>(
    (acc, source) => {
      acc[source.id] = source
      return acc
    },
    {}
  )

  const liveData: LiveData = {
    events: eventOutputs,
    associations: associationsOutput,
    sources: sourceMap,
    sites: [],
    regions: [],
    shapes: [],
    notifications: []
  }

  return liveData
}
