import { Database } from 'openapi/database.generated'

export type NonNullable<T> = T extends null ? never : T

export type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type SourceTypeRaw = Omit<
  Database['public']['Tables']['source']['Row'] & {
    yearOfPost: string
    oblast: string
    town: string
  },
  'oblastKey' | 'townKey'
>

export type SourceType = Denull<SourceTypeRaw>

export type ValidationMessages<T> = {
  [K in keyof T]?: string[]
}

export type SourceValidationMessages = ValidationMessages<SourceTypeRaw>

export type SourceValidationResultLocation = {
  row: number
  column: keyof SourceTypeRaw
}

export type SourceValidationResult = SourceValidationResultLocation & {
  messages: string[]
}
