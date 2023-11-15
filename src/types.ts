import { Database } from 'openapi/database.generated'

export type NonNullable<T> = T extends null ? never : T

export type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type SourceTypeRaw = Omit<
  Database['public']['Tables']['source']['Row'],
  | 'oblastKey'
  | 'townKey'
  | 'id'
  | 'eventKey'
  | 'createdAt'
  | 'googleDriveLinks'
  | 'typeOfIncident'
  | 'meansOfAttack'
> & {
  yearOfPost: string
  oblast: string
  town: string
  fileNames: string
  googleDriveLinks: string
  typeOfIncident: string
  meansOfAttack: string
}

export type SourceType = Denull<SourceTypeRaw>

export type ValidationMessages<T> = {
  [K in keyof T]?: string[]
}

export type SourceValidationResultLocation = {
  row: number
  column: keyof SourceTypeRaw
}

export type PropChange = {
  previous: unknown
  current: unknown
}

export type ObjectChange<T> = Partial<Record<keyof T, PropChange>>

export type StateChanges<T> = Record<string, ObjectChange<T>>

export type ValidationRules<T> = {
  [key in keyof T]: (value: unknown) => string[] | undefined
}

export type ValidationResults<T> = Record<string, ObjectValidationResult<T>>

export type ObjectValidationResult<T> = Partial<Record<keyof T, string[]>>

export type SourceSite = 'Telegram' | 'Tweet' | 'YouTube' | 'Manual'

export type SourceOutputBase = {
  id: string
  title: string
  thumbnail: string
  description: string
  type: string
}

export type SourceOutput = SourceOutputBase & {
  paths: string[]
}

export type SourceOutputRow = SourceOutputBase & PathsObject

type PathsObject = {
  path1: string
}

export type AssociationNode = {
  label: string
  children: Record<string, AssociationNode>
}

export type AssociationOutputBase = {
  id: string
  title: string
  desc: string
  mode: 'FILTER'
}

export type AssociationOutput = AssociationOutputBase & {
  filter_paths: string[]
}

export type AssociationOutputRow = AssociationOutputBase & FiltersPathsObject

export type FiltersPathsObject = {
  filter_path1: string
}

export type EventOutputBase = {
  id: number
  description: string
  date: string
  time: string
  location: string
  latitude: string
  longitude: string
}

export type EventOutput = EventOutputBase & {
  sources: string[]
  associations: AssociationOutput[]
}

export type EventOutputRow = EventOutputBase & AssociationObject & SourceObject

export type SourceObject = {
  source1: string
}

export type AssociationObject = {
  association1: string
}

export type LiveData = {
  events: EventOutput[]
  associations: AssociationOutput[]
  sources: Record<string, SourceOutput>
  sites: unknown[]
  regions: unknown[]
  shapes: unknown[]
  notifications: unknown[]
}

export type Bounds = {
  north: number
  east: number
  south: number
  west: number
}
