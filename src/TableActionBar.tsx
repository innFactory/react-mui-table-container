// prettier-ignore
import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { InfoHelp } from './InfoHelp';
import { TableAction } from './TableAction';

interface Props {
  searchString: string;
  onSearch: (searchString: string) => void;
  actions?: TableAction[];
  infoText?: string;
  loading?: boolean;
}

export function TableActionBar(props: Props) {
  const { searchString, onSearch, actions, infoText, loading } = props;
  const classes = useStyles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      onSearch(event.target.value);
    } else {
      onSearch('');
    }
  };

  const onActionButtonClick = (action: TableAction) => () => {
    action.onClick && action.onClick(undefined, action.key);
  };

  return (
    <Box
      height={55}
      marginLeft={1}
      marginRight={1}
      marginBottom={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <InfoHelp text={infoText} />
      </Box>
      <div className={classes.container}>
        <TextField
          variant="outlined"
          label="Suchen"
          className={classes.textField}
          classes={{ root: classes.textFieldRoot }}
          value={searchString}
          onChange={handleSearchChange}
          disabled={loading}
        />
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
  button: {
    height: 50,
    marginLeft: 10,
  },

  container: {
    justifyContent: 'flex-end',
    display: 'flex',
    height: 55,
  },

  textField: {
    height: '50px',
    width: '200px',
  },

  textFieldRoot: {
    flexDirection: 'unset',
  },
});
