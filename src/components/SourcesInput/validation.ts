import { oblastValues, typeOfIncidentValues, meansOfAttackValues } from 'values'

const URL_REGEX =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g

const dateOfPost = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter date']
  }

  if (!/^\d{1,2}.\d{1,2}$/.test(value)) {
    return ['Please enter date in format DD.MM']
  }
}

const sourceUrl = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter a source URL']
  }

  const chunks = value.split(',').map(str => str.trim())

  if (chunks.length > 1) {
    return [
      'Multiple comma separated items found. Please place each URL on a separate row'
    ]
  }

  if (!URL_REGEX.test(chunks[0])) {
    return ['Please enter a valid URL']
  }
}

const yearOfPost = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter year']
  }

  if (!/^\d{4}$/.test(value)) {
    return ['Please enter year in format YYYY']
  }

  const year = Number(value)

  if (year < 2022) {
    return ['Please enter year 2022 or later']
  }
}

const oblast = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter oblast']
  }

  if (!oblastValues.includes(value)) {
    return [
      `"${value}" is not of the available values: ${oblastValues.join(', \n')}`
    ]
  }
}

const town = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter town name']
  }
}

const coordinates = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter coordinates']
  }

  const chunks = value
    .split(',')
    .map(str => str.trim())
    .map(str => Number(str))

  if (chunks.length !== 2) {
    return [
      'Please enter coordinates in format LAT, LNG, for example 49.8397, 24.0297'
    ]
  }

  if (chunks[0] < 44 || chunks[0] > 53) {
    return ['Please enter latitude between 44 and 53']
  }

  if (chunks[1] < 22 || chunks[1] > 41) {
    return ['Please enter longitude between 22 and 41']
  }
}

const googleDriveLinks = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter Google Drive links']
  }

  const chunks = value.split(',').map(str => str.trim())

  if (chunks.length < 1) {
    return ['Please enter at least one Google Drive link']
  }

  const containsInvalidLink = chunks.some(
    link => !link.startsWith('https://drive.google.com/open?id=')
  )

  if (containsInvalidLink) {
    return ['Each link should start with https://drive.google.com/open?id=']
  }
}

const archiveLink = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter archive link']
  }

  const linksMatched = value.match(URL_REGEX)?.length

  console.log({ value, linksMatched })

  if (!linksMatched) {
    return ['Please enter a valid URL']
  }

  if (linksMatched > 1) {
    return ['Please enter only one archive link per row']
  }
}

const comment = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter a comment']
  }
}

const typeOfIncident = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter type of incident']
  }

  return value
    .split(',')
    .map(str => str.trim())
    .filter(str => !typeOfIncidentValues.includes(str))
    .map(
      str =>
        `"${str}" is not of the available values: ${typeOfIncidentValues.join(
          ', \n'
        )}`
    )
}

const meansOfAttack = (value: unknown) => {
  if (typeof value !== 'string') {
    return ['Please enter type of incident']
  }

  return value
    .split(',')
    .map(str => str.trim())
    .filter(str => !meansOfAttackValues.includes(str))
    .map(
      str =>
        `"${str}" is not of the available values: ${meansOfAttackValues.join(
          ', \n'
        )}`
    )
}

export const sourceValidationRules = {
  sourceUrl,
  dateOfPost,
  yearOfPost,
  oblast,
  town,
  coordinates,
  googleDriveLinks,
  archiveLink,
  comment,
  typeOfIncident,
  meansOfAttack
}
