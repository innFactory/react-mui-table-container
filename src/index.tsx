import { ICellPropsProducer } from 'mui-virtualized-table';

export * from './InfoHelp';
export * from './TableAction';
export * from './TableContainer';

export interface Column<T> {
  /**
   * Callback for rendering associated column cell data. Passes the row data for the associated cell.
   */
  cell?: (rowData: T) => React.ReactNode;

  /**
   * Name to display instead of `name`
   */
  header?: React.ReactNode;

  /**
   * Name of header
   */
  name?: string;

  /**
   * Callback when header is clicked on (has precedence over `onHeaderClick` on table)
   */
  onHeaderClick?: (column: Column<T>) => void;

  /**
   * Width of cell.
   *
   * Can be a `number`, straight pixel width, or percentage string like `40%`
   */
  width?: number | string;

  cellProps?: ICellPropsProducer<T>;

  classes?: {
    DragHandleActive?: string;
    DragHandleIcon?: string;
    cell?: string;
    cellContents?: string;
    cellHeader?: string;
    cellHovered?: string;
    cellInLastColumn?: string;
    cellInLastRow?: string;
    cellSelected?: string;
    dragHandle?: string;
    footer?: string;
    table?: string;
  };
}
