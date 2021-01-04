// prettier-ignore
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import * as React from 'react';

interface Props {
  text?: string;
}

export function InfoHelp(props: Props) {
  const { text } = props;
  const classes = useStyles();
  const [showDialog, setShowDialog] = React.useState(false);

  if (!text) {
    return <></>;
  }

  return (
    <>
      <Tooltip title={text}>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.root}
          onClick={() => setShowDialog(true)}
        >
          <Box marginRight={0.5}>
            <HelpOutlineIcon />
          </Box>
          <Typography className={classes.iconText}>Info</Typography>
        </Box>
      </Tooltip>
      {showDialog && (
        <InfoDialog text={text} onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}

function InfoDialog(props: { text: string; onClose: () => void }) {
  const { text, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog onClose={onClose} open>
      <DialogTitle disableTypography className={classes.dialogRoot}>
        <Typography variant="h6">Info</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },

  iconText: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  dialogRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));
