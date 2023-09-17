export const getGoogleDriveIds = (googleDriveLinks: string[]): string[] => {
  return googleDriveLinks
    .map(link => {
      const url = new URL(link)
      const params = new URLSearchParams(url.search)

      return params.get('id')
    })
    .filter((link: unknown): link is string => Boolean(link))
}
