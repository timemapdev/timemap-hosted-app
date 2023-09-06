import { FC, RefObject, SetStateAction, memo } from 'react'
import { Column, DataSheetGrid, DataSheetGridRef } from 'react-datasheet-grid'
import { CellWithId, Operation } from 'react-datasheet-grid/dist/types'
import { SourceType } from 'types'

type PasteSourceGridProps = {
  gridRef: RefObject<DataSheetGridRef>
  sources: SourceType[]
  columns: Partial<Column<SourceType, any, any>>[]
  onChange: (sources: SourceType[], operations: Operation[]) => void
  setSelectedCell: (value: SetStateAction<CellWithId | null>) => void
}

export const PasteSourcesGrid: FC<PasteSourceGridProps> = memo(
  ({ gridRef, sources, columns, onChange, setSelectedCell }) => (
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
)
