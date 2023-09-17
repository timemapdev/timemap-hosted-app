import { Database } from 'openapi/database.generated'

export type NonNullable<T> = T extends null ? never : T

export type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type SourceTypeRaw = Omit<
  Database['public']['Tables']['source']['Row'],
  'oblastKey' | 'townKey' | 'id' | 'eventKey' | 'createdAt' | 'googleDriveLinks'
> & {
  yearOfPost: string
  oblast: string
  town: string
  fileNames: string
  googleDriveLinks: string
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
