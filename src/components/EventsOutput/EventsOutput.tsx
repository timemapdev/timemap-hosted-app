import Box from '@mui/joy/Box'
import { FC } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Column } from 'react-datasheet-grid/dist/types'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { SourceType } from 'types'
import {
  includeInOutput,
  isEventStart,
  toSpreadColumnDefinitions
} from 'lib/munging'
import { useWindowSize } from '@uidotdev/usehooks'
import { EmptyTab } from 'components/EmptyTab'

type EventOutputRow = {
  id: string
  description: string
  date: string
  time: string
  location: string
  latitude: string
  longitude: string
  sources: SourceType[]
}

type EventExportRow = {
  id: string
  description: string
  date: string
  time: string
  location: string
  latitude: string
  longitude: string
} & AssociationObject &
  SourceObject

type EventsOutputProps = {
  tabIndex: number
}

export const EventsOutput: FC<EventsOutputProps> = ({ tabIndex }) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const events: EventOutputRow[] = inputSources.reduce<EventOutputRow[]>(
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

  const exportEvents: EventExportRow[] = events
    .filter(event => event.sources.length)
    .map(({ sources, ...rest }) => {
      const { associations, sourceUrls } = sources.reduce(
        (acc, { typeOfIncident, meansOfAttack, sourceUrl }) => {
          acc.sourceUrls.push(sourceUrl)
          ;[
            ...typeOfIncident.split(',').map(type => type.trim()),
            ...meansOfAttack.split(',').map(type => type.trim())
          ].forEach(association => {
            acc.associations.add(association)
          })

          return acc
        },
        {
          associations: new Set<string>(),
          sourceUrls: [] as string[]
        }
      )

      return {
        ...rest,
        ...Array.from(associations).reduce(
          (acc, association, index) => ({
            ...acc,
            [`association${index + 1}`]: association
          }),
          {} as AssociationObject
        ),
        ...sourceUrls.reduce(
          (acc, sourceUrl, index) => ({
            ...acc,
            [`source${index + 1}`]: sourceUrl
          }),
          {} as SourceObject
        )
      }
    })

  const maxAssociations = events.reduce((maxCount, event) => {
    const associations = event.sources.reduce((acc, source) => {
      ;[
        ...source.typeOfIncident.split(',').map(type => type.trim()),
        ...source.meansOfAttack.split(',').map(type => type.trim())
      ].forEach(association => {
        acc.add(association)
      })

      return acc
    }, new Set<string>())

    return Math.max(maxCount, associations.size)
  }, 0)

  const columns = [
    {
      ...keyColumn('id', textColumn),
      title: 'id',
      minWidth: 200
    },
    {
      ...keyColumn('description', textColumn),
      title: 'description',
      minWidth: 200
    },
    {
      ...keyColumn('date', textColumn),
      title: 'date',
      minWidth: 200
    },
    {
      ...keyColumn('time', textColumn),
      title: 'time',
      minWidth: 200
    },
    {
      ...keyColumn('location', textColumn),
      title: 'location',
      minWidth: 200
    },
    {
      ...keyColumn('latitude', textColumn),
      title: 'latitude',
      minWidth: 200
    },
    {
      ...keyColumn('longitude', textColumn),
      title: 'longitude',
      minWidth: 200
    },
    ...toSpreadColumnDefinitions({ name: 'association', size: maxAssociations })
  ]

  const { height } = useWindowSize()

  if (!exportEvents.length) {
    return <EmptyTab tabIndex={tabIndex} name="events" />
  }

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <DataSheetGrid<EventExportRow>
        value={exportEvents}
        columns={columns as Partial<Column<EventExportRow, any, any>>[]}
        height={(height ?? 1000) - 100}
      />
    </Box>
  )
}

type SourceObject = {
  source1: string
}

type AssociationObject = {
  association1: string
}
