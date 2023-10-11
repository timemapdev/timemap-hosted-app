import { includeInOutput, isEventStart } from 'lib/munging'
import {
  AssociationOutput,
  EventOutput,
  SourceType,
  ValidationResults
} from 'types'

type EventWithSources = {
  id: string
  description: string
  date: string
  time: string
  location: string
  latitude: string
  longitude: string
  sources: SourceType[]
}

type ToEventsOutputArgs = {
  inputSources: SourceType[]
  skipRows: Record<string, boolean>
  validation: ValidationResults<Record<string, unknown>>
  associations: AssociationOutput[]
}

export const toEventsOutput = ({
  inputSources,
  skipRows,
  validation,
  associations
}: ToEventsOutputArgs) => {
  const events: EventWithSources[] = inputSources.reduce<EventWithSources[]>(
    (acc, item, index) => {
      if (isEventStart(item)) {
        const { comment, dateOfPost, town, oblast, manualLatLng } = item

        if (!manualLatLng) {
          return acc
        }

        const [latitude, longitude] = manualLatLng
          .split(',')
          .map(coord => coord.trim())

        acc.push({
          id: `${index + 1}`,
          description: comment,
          date: dateOfPost,
          time: '',
          location: `${town}, ${oblast}`,
          latitude,
          longitude,
          sources: []
        })
      } else {
        if (includeInOutput({ skipRows, validation, index })) {
          const lastEvent = acc[acc.length - 1]
          lastEvent.sources.push(item)
        }
      }
      return acc
    },
    []
  )

  const eventOutputs: EventOutput[] = events
    .filter(event => event.sources.length)
    .map(({ sources, ...rest }, index) => {
      const { associationIds, sourceUrls } = sources.reduce(
        (acc, { typeOfIncident, meansOfAttack, sourceUrl }) => {
          acc.sourceUrls.push(sourceUrl)
          ;[
            ...typeOfIncident.split(',').map(type => type.trim()),
            ...meansOfAttack.split(',').map(type => type.trim())
          ].forEach(associationId => {
            acc.associationIds.add(associationId)
          })

          return acc
        },
        {
          associationIds: new Set<string>(),
          sourceUrls: [] as string[]
        }
      )

      return {
        ...rest,
        id: index,
        sources: sourceUrls,
        associations: [...associationIds.values()]
          .map(associationId => {
            return associations.find(
              association => association.id === associationId
            )
          })
          .filter((item): item is AssociationOutput => Boolean(item))
      }
    })

  const maxAssociations = events.reduce((maxCount, event) => {
    const associationIds = event.sources.reduce((acc, source) => {
      ;[
        ...source.typeOfIncident.split(',').map(type => type.trim()),
        ...source.meansOfAttack.split(',').map(type => type.trim())
      ].forEach(associationId => {
        acc.add(associationId)
      })

      return acc
    }, new Set<string>())

    return Math.max(maxCount, associationIds.size)
  }, 0)

  return { eventOutputs, maxAssociations }
}
