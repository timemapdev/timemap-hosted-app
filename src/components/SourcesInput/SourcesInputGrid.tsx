import { useWindowSize } from '@uidotdev/usehooks'
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

export const SourcesInputGrid: FC<PasteSourceGridProps> = memo(
  ({ gridRef, sources, columns, onChange, setSelectedCell }) => {
    const { height } = useWindowSize()
    return (
      <DataSheetGrid<SourceType>
        ref={gridRef}
        value={sources}
        columns={columns}
        height={(height ?? 1000) - 156}
        onChange={onChange}
        onActiveCellChange={({ cell }) => {
          setSelectedCell(cell)
        }}
      />
    )
  }
)
