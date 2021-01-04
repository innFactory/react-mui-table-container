// prettier-ignore
import { Box, IconButton, LinearProgress, makeStyles, Theme, Tooltip } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Fuse from 'fuse.js';
import MuiVirtualizedTable from 'mui-virtualized-table';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { TableAction } from './TableAction';
import { TableActionBar } from './TableActionBar';

interface Props<T> {
  data: T[];
  columns: any[];
  mapTableData: (data: T[]) => (T & any)[];
  searchKeys: string[];
  actions?: TableAction[];
  onClick?: (data: T) => void;
  selectedData?: any;
  disableHover?: boolean;
  infoText?: string;
  loading?: boolean;
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
  } = props;
  const classes = useStyles();

  const [searchString, setSearchString] = React.useState('');
  const [tData, setTableData] = React.useState<any[]>(mapTableData(data));
  const [columns, setColumns] = React.useState<any[]>(props.columns);

  React.useEffect(() => {
    setTableData(mapTableData(data));
  }, [data]);

  React.useEffect(() => {
    if (actions) {
      const rowActions = actions.filter(a => a.place === 'row');

      const actionColumn = {
        cell: (rowData: any) => (
          <>
            {rowActions.map(a => (
              <Tooltip title={a.label ?? ''} key={a.key}>
                <IconButton
                  onClick={() => a.onClick && a.onClick(rowData, a.key)}
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
      setColumns(props.columns);
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
              <Box height={0} marginBottom={1}>
                <LinearProgress />
              </Box>
            )}
            {!loading && <Box height={4} marginTop={1} />}

            <TableActionBar
              searchString={searchString}
              onSearch={onSearch}
              actions={actions?.filter(a => !a.place || a.place === 'top')}
              infoText={infoText}
              loading={loading}
            />
            <MuiVirtualizedTable
              data={tData}
              columns={columns}
              width={width}
              includeHeaders={true}
              resizable={true}
              fixedRowCount={1}
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
              columnWidth={c => {
                if (c.columns[c.index].width) {
                  return Number(c.columns[c.index].width);
                } else {
                  const colWithoutWidthCount = c.columns.filter(
                    c => c.width === undefined
                  ).length;
                  const widthFromAllColsWithWidth = c.columns
                    .map(c => c.width)
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
    height: '100%',
    width: '100%',
  },
}));
