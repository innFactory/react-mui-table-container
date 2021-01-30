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
}

export function TableActionBar(props: Props) {
  const { searchString, onSearch, actions, infoText, loading, dense } = props;
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

  const onActionButtonClick = (action: TableAction) => () => {
    action.onClick && action.onClick(undefined, action.key);
  };

  return (
    <Box
      height={dense ? 45 : 55}
      marginLeft={dense ? 0.2 : 1}
      marginRight={dense ? 0.2 : 1}
      marginBottom={dense ? 0.2 : 1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <InfoHelp text={infoText} />
      </Box>
      <div className={classes.container}>
        {onSearch && (
          <TextField
            variant="outlined"
            label="Suchen"
            className={classes.textField}
            classes={{ root: classes.textFieldRoot }}
            value={searchString}
            onChange={handleSearchChange}
            disabled={loading}
            size={dense ? 'small' : 'medium'}
          />
        )}
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
      </div>
    </Box>
  );
}

const useStyles = makeStyles({
  button: (props: Props) => ({
    height: props.dense ? 40 : 50,
    marginLeft: props.dense ? 1 : 10,
  }),

  container: (props: Props) => ({
    justifyContent: 'flex-end',
    display: 'flex',
    height: props.dense ? 45 : 55,
  }),

  textField: (props: Props) => ({
    height: props.dense ? 40 : 50,
    width: '200px',
  }),

  textFieldRoot: {
    flexDirection: 'unset',
  },
});
