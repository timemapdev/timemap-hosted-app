import { FC, RefObject, SetStateAction, memo } from 'react'
import { Column, DataSheetGrid, DataSheetGridRef } from 'react-datasheet-grid'
import { Database } from 'openapi/database.generated'
import { CellWithId, Operation } from 'react-datasheet-grid/dist/types'

type Denull<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

type SourceTypeRaw = Database['public']['Tables']['source']['Row']

type SourceType = Denull<SourceTypeRaw>

type PasteSourceGridProps = {
  gridRef: RefObject<DataSheetGridRef>
  sources: SourceType[]
  columns: Partial<Column<SourceType, any, any>>[]
  onChange: (sources: SourceType[], operations: Operation[]) => void
  setSelectedCell: (value: SetStateAction<CellWithId | null>) => void
}

export const PasteSourcesGrid: FC<PasteSourceGridProps> = memo(
  ({ gridRef, sources, columns, onChange, setSelectedCell }) => {
    console.log('Inner Grid')
    return (
      <DataSheetGrid<SourceType>
        ref={gridRef}
        value={sources}
        columns={columns}
        height={500}
        onChange={onChange}
        onActiveCellChange={({ cell }) => {
          setSelectedCell(cell)
        }}
      />
    )
  }
)
