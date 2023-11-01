import { getGoogleDriveIds, typeFromUrl } from 'lib/munging'
import { SourceOutput, SourceType, ValidationResults } from 'types'

type ToSourcesOutputArgs = {
  inputSources: SourceType[]
  skipRows: Record<string, boolean>
  validation: ValidationResults<Record<string, unknown>>
}

export const toSourcesOutput = ({
  inputSources,
  skipRows,
  validation
}: ToSourcesOutputArgs) => {
  const exportSources: SourceOutput[] = inputSources
    .filter((_, index) => {
      if (skipRows[index] !== false) {
        return false
      }

      const validationItem = validation[index]

      if (!validationItem) {
        return false
      }

      if (Object.values(validationItem).some(col => col !== undefined)) {
        return false
      }

      return true
    })
    .map(({ sourceUrl, comment, googleDriveLinks }) => {
      const sourceSite = typeFromUrl(sourceUrl)
      const gLinks = googleDriveLinks.split(', ').map(item => item.trim())
      return {
        id: sourceUrl,
        title: '',
        thumbnail: '',
        description: comment,
        type: sourceSite,
        paths: sourceSite === 'Manual' ? getGoogleDriveIds(gLinks) : [sourceUrl]
      }
    })

  return exportSources
}
