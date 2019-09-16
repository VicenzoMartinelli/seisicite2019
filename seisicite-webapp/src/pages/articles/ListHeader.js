import React from 'react'
import { HowToReg as HowToRegIcon } from '@material-ui/icons';
import { Box, Typography, Button } from '@material-ui/core';

export default function ListHeader({ classes, handleSortClick }) {
  return (
    <Box className={classes.boxTitle}>
      <Typography variant="h5" className={classes.titleArticles}>
        Artigos
    </Typography>
      <div className={classes.divBtnSort}>
        <Button variant="outlined" color="primary" className={classes.btnSort} onClick={handleSortClick}>
          <HowToRegIcon /> Sortear Avaliadores
      </Button>
      </div>
    </Box>
  )
}
