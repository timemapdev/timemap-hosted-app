import Box from '@mui/joy/Box'
import { FC } from 'react'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import { Column } from 'react-datasheet-grid/dist/types'
import { useInputSources } from 'components/InputSourcesContext'
import { useValidation } from 'components/ValidationContext'
import { toSpreadColumnDefinitions, toSpreadColumnValues } from 'lib/munging'
import { useWindowSize } from '@uidotdev/usehooks'
import { EmptyTab } from 'components/EmptyTab'
import { toEventsOutput } from 'models/toEventsOutput'
import { toAssociationsOutput } from 'models/toAssociationsOutput'
import {
  AssociationObject,
  EventOutput,
  EventOutputRow,
  SourceObject
} from 'types'

type EventsOutputProps = {
  tabIndex: number
}

export const EventsOutput: FC<EventsOutputProps> = ({ tabIndex }) => {
  const { state: inputsState } = useInputSources()
  const { inputSources } = inputsState

  const { state: validationState } = useValidation()
  const { validation, skipRows } = validationState

  const { associationsOutput } = toAssociationsOutput({
    inputSources,
    validation,
    skipRows
  })

  const { eventOutputs, maxAssociations } = toEventsOutput({
    inputSources,
    validation,
    skipRows,
    associations: associationsOutput
  })

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

  if (!eventOutputs.length) {
    return <EmptyTab tabIndex={tabIndex} name="events" />
  }

  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      width="100%"
    >
      <DataSheetGrid<EventOutputRow>
        value={flattenEvents(eventOutputs)}
        columns={columns as Partial<Column<EventOutputRow, any, any>>[]}
        height={(height ?? 1000) - 100}
      />
    </Box>
  )
}

const flattenEvents = (events: EventOutput[]): EventOutputRow[] => {
  return events.map(({ associations, sources, ...event }) => ({
    ...event,
    ...toSpreadColumnValues<AssociationObject>({
      columnPrefix: 'association',
      values: associations.map(({ id }) => id)
    }),
    ...toSpreadColumnValues<SourceObject>({
      columnPrefix: 'source',
      values: sources
    })
  }))
}
