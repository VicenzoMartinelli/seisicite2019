import React from 'react';
import { Grid } from '@material-ui/core';
import CardArticle from './CardArticle';
import { toLocalDateShortString } from '../../services/date-utils';
import EmptyImage from '../../imgs/empty.svg';

export default function ListContent({
  classes,
  data,
  handleClickOpen: handleEdit
}) {
  return (
    <>
      {data.length === 0 && <div style={{ width: '35vh', margin: '5% auto' }}>
        <img src={EmptyImage} style={{ width: '100%' }} />
        <p style={{ textAlign: 'center', color: '#ff928b' }}>Nenhum artigo encontrado</p>
      </div>}

      <Grid className={classes.containerCards} container spacing={3} >
        {
          data.map((x) => (
            <Grid item sm={12} md={6} lg={4} key={x.id}>
              <CardArticle
                title={x.title}
                resume={x.resume}
                primaryAuthor={x.primaryAuthor}
                submissionId={x.submissionId}
                modality={x.modality}
                startDate={toLocalDateShortString(x.startDate)}
                onEditClick={() => handleEdit(x)}
              />
            </Grid>
          ))
        }
      </Grid >
    </>
  )
}
