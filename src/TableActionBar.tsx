// prettier-ignore
import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { InfoHelp } from './InfoHelp';
import { TableAction } from './TableAction';

interface Props {
  searchString: string;
  onSearch?: (searchString: string) => void;
  actions?: TableAction[];
  infoText?: string;
  loading?: boolean;
  dense?: boolean;
  searchPlaceholder?: string;
  searchLeft?: boolean;
  searchAutofocus?: boolean;
}

export function TableActionBar(props: Props) {
  const { onSearch, actions, infoText, dense, searchLeft } = props;
  const classes = useStyles(props);

  if ((!actions || actions.length < 1) && !onSearch && !infoText) {
    return <></>;
  }

  return (
    <Box
      height={dense ? 37 : 55}
      marginLeft={dense ? 0.2 : 1}
      marginRight={dense ? 0.2 : 1}
      marginBottom={dense ? 0.2 : 1}
      display="flex"
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Box>
        <InfoHelp text={infoText} />
        {searchLeft && <Search {...props} />}
      </Box>
      <div className={classes.container}>
        {!searchLeft && <Search {...props} />}
        <Actions {...props} />
      </div>
    </Box>
  );
}

function Search(props: Props) {
  const {
    onSearch,
    searchPlaceholder,
    searchString,
    dense,
    loading,
    searchAutofocus,
  } = props;
  const classes = useStyles(props);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      if (event.target.value) {
        onSearch(event.target.value);
      } else {
        onSearch('');
      }
    }
  };

  if (!onSearch) {
    return <></>;
  }

  return (
    <TextField
      variant="outlined"
      label={searchPlaceholder ?? 'Suchen'}
      className={classes.textField}
      classes={{ root: classes.textFieldRoot }}
      value={searchString}
      onChange={handleSearchChange}
      disabled={loading}
      size={dense ? 'small' : 'medium'}
      autoFocus={searchAutofocus}
    />
  );
}

function Actions(props: Props) {
  const { actions, loading, dense } = props;
  const classes = useStyles(props);

  const onActionButtonClick = (action: TableAction) => () => {
    action.onClick && action.onClick(undefined, action.key);
  };

  return (
    <Box display="flex" flexDirection="row-reverse">
      {actions &&
        actions.map((a, i) => (
          <Button
            key={a.key}
            variant={a.variant ?? (i === 0 ? 'contained' : 'outlined')}
            color={a.color ?? (i === 0 ? 'secondary' : 'primary')}
            className={classes.button}
            onClick={onActionButtonClick(a)}
            disabled={loading}
            size={dense ? 'small' : 'medium'}
          >
            {a.label}
          </Button>
        ))}
    </Box>
  );
}

const useStyles = makeStyles({
  button: (props: Props) => ({
    height: props.dense ? 32 : 50,
    marginLeft: props.dense ? 1 : 10,
  }),

  container: (props: Props) => ({
    justifyContent: 'flex-end',
    display: 'flex',
    height: props.dense ? 37 : 55,
  }),

  textField: (props: Props) => ({
    height: props.dense ? 32 : 50,
    width: '200px',
  }),

  textFieldRoot: {
    flexDirection: 'unset',
  },
});
