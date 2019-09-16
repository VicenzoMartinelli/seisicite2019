import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalSortConfirm({ sortOpened, setSortOpened, handleSort }) {
  function handleClose() {
    setSortOpened(false);
  }

  return (
    <Dialog
      open={sortOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Sorteio avaliação</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realizar o sorteio dos artigos entre os avaliadores cadastrados?
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
      </Button>
        <Button onClick={handleSort} color="primary" autoFocus>
          Efetuar
      </Button>
      </DialogActions>
    </Dialog>
  )
}
