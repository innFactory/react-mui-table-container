// prettier-ignore
import { Box, Divider, IconButton, LinearProgress, makeStyles, Theme, Tooltip } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Fuse from 'fuse.js';
import MuiVirtualizedTable, {
  IMuiVirtualizedTableColumn,
} from 'mui-virtualized-table';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { Column } from '.';
import { TableAction } from './TableAction';
import { TableActionBar } from './TableActionBar';

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  mapTableData: (data: T[]) => (T & any)[];
  searchKeys: string[];
  actions?: TableAction[];
  onClick?: (data: T) => void;
  selectedData?: any;
  disableHover?: boolean;
  infoText?: string;
  loading?: boolean;
  noHeaders?: boolean;
  dense?: boolean;
}

export function TableContainer<T>(props: Props<T>) {
  const {
    data,
    searchKeys,
    mapTableData,
    actions,
    onClick,
    selectedData,
    infoText,
    loading,
    noHeaders,
    dense,
  } = props;
  const classes = useStyles();

  const [searchString, setSearchString] = React.useState('');
  const [tData, setTableData] = React.useState<any[]>(mapTableData(data));
  const [columns, setColumns] = React.useState<Column<T>[]>(props.columns);

  React.useEffect(() => {
    setTableData(mapTableData(data));
  }, [data]);

  React.useEffect(() => {
    if (actions) {
      const rowActions = actions.filter((a) => a.place === 'row');

      const actionColumn: Column<T> = {
        cell: (rowData) => (
          <>
            {rowActions.map((a) => (
              <Tooltip title={a.label ?? ''} key={a.key}>
                <IconButton
                  onClick={() => a.onClick && a.onClick(rowData, a.key)}
                  size={dense ? 'small' : 'medium'}
                >
                  {a.icon ?? <CreateIcon />}
                </IconButton>
              </Tooltip>
            ))}
          </>
        ),
        cellProps: { style: { padding: 0 } },

        width: 68 * rowActions.length,
      };

      setColumns([...props.columns, actionColumn]);
    } else {
      setColumns(columns);
    }
  }, [actions]);

  const onSearch = (searchString: string) => {
    setSearchString(searchString);

    const searchOptions = {
      isCaseSensitive: false,
      findAllMatches: false,
      includeMatches: false,
      includeScore: false,
      useExtendedSearch: false,
      minMatchCharLength: 1,
      shouldSort: true,
      threshold: 0.3,
      ignoreLocation: true,
      keys: searchKeys,
    };

    const fuse = new Fuse(tData, searchOptions);
    var searchResult = fuse.search(searchString);
    var newTableData: any[] = mapTableData(
      (searchResult as any[]).map((h: any) => h.item)
    );

    if (searchString) {
      setTableData(newTableData);
    } else {
      const tData: any[] = mapTableData(data);
      setTableData(tData);
    }
  };

  return (
    <div className={classes.root} key={'tableWithColumns_' + columns.join('-')}>
      <AutoSizer>
        {({ height, width }) => (
          <div
            style={{
              width: width,
              overflowX: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {loading && (
              <Box height={0} marginBottom={dense ? 0.2 : 1}>
                <LinearProgress />
              </Box>
            )}
            {!loading && <Box height={4} marginTop={dense ? 0.2 : 1} />}

            <TableActionBar
              searchString={searchString}
              onSearch={onSearch}
              actions={actions?.filter((a) => !a.place || a.place === 'top')}
              infoText={infoText}
              loading={loading}
              dense={dense}
            />
            {noHeaders && <Divider />}
            <MuiVirtualizedTable
              data={tData}
              columns={columns as any}
              width={width}
              includeHeaders={!noHeaders}
              resizable={!noHeaders}
              fixedRowCount={noHeaders ? 0 : 1}
              rowHeight={dense ? 34 : 48}
              isCellHovered={(
                column,
                rowData,
                hoveredColumn,
                hoveredRowData
              ) => {
                if (selectedData || !onClick) {
                  return false;
                }
                return rowData === hoveredRowData;
              }}
              onCellClick={
                onClick ? (event, tableData) => onClick(tableData) : undefined
              }
              isCellSelected={(column, rowData) => {
                if (selectedData) {
                  return selectedData.id === rowData.id;
                }
                return false;
              }}
              columnWidth={(c) => {
                if (c.columns[c.index].width) {
                  return Number(c.columns[c.index].width);
                } else {
                  const colWithoutWidthCount = c.columns.filter(
                    (c) => c.width === undefined
                  ).length;
                  const widthFromAllColsWithWidth = c.columns
                    .map((c) => c.width)
                    .reduce(
                      (w1, w2) => (w1 ? Number(w1) : 0) + (w2 ? Number(w2) : 0)
                    );

                  return (
                    (c.width - Number(widthFromAllColsWithWidth)) /
                    colWithoutWidthCount
                  );
                }
              }}
            />
          </div>
        )}
      </AutoSizer>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100%',
  },
}));
