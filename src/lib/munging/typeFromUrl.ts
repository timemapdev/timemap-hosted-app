import { SourceSite } from 'types'

export const typeFromUrl = (url: string): SourceSite => {
  if (url.startsWith('https://t.me/')) {
    return 'Telegram'
  }

  if (url.startsWith('https://twitter.com/')) {
    return 'Tweet'
  }

  if (
    url.startsWith('https://youtu.be/') ||
    url.startsWith('https://www.youtube.com/watch?')
  ) {
    return 'YouTube'
  }

  return 'Manual'
}
