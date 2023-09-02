import { z } from 'zod'

const dateOfPost = z
  .string()
  .trim()
  .regex(/^\d{1,2}.\d{1,2}$/)

const coordinates = z
  .string()
  .trim()
  .regex(
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    "Please use 'd.m' format such as 15."
  )

export const sourceModel = z.object({
  timestamp: z.string(),
  sourceUrl: z.string(),
  dateOfPost,
  yearOfPost: z.union([z.string(), z.null()]).default('2022'),
  oblast: z.string(),
  town: z.string(),
  manualLatLng: coordinates,
  googleDriveLinks: z.string(),
  fileNames: z.string(),
  archiveLink: z.string(),
  comment: z.string(),
  typeOfIncident: z.string(),
  meansOfAttack: z.string()
})

export const eventModel = z.object({
  timestamp: z.null(),
  sourceUrl: z.null(),
  dateOfPost,
  yearOfPost: z.string().default('2022'),
  oblast: z.string(),
  town: z.string(),
  manualLatLng: coordinates,
  googleDriveLinks: z.null(),
  fileNames: z.string(),
  archiveLink: z.null(),
  comment: z.string(),
  typeOfIncident: z.string(),
  meansOfAttack: z.string()
})

export type SourceModel = z.infer<typeof sourceModel>

export type EventModel = z.infer<typeof eventModel>
