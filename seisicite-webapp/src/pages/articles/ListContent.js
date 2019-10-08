import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import CardArticle from './CardArticle';
import { toLocalDateShortString } from '../../services/date-utils';
import EmptyImage from '../../imgs/empty.svg';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

export default function ListContent({
  classes,
  data,
  handleClickOpen: handleEdit
}) {
  const [filterText, setFilterText] = useState('');

  function filterList(article) {
    if (filterText === '' || filterText === null) {
      return true;
    }
    const f = filterText.toLocaleLowerCase();

    debugger;

    return article.submissionId.toLocaleLowerCase().includes(f) ||
      article.title.toLocaleLowerCase().includes(f) ||
      article.modality.toLocaleLowerCase().includes(f);
  }

  return (
    <>
      {data.length === 0 && <div style={{ width: '35vh', margin: '5% auto' }}>
        <img src={EmptyImage} style={{ width: '100%' }} />
        <p style={{ textAlign: 'center', color: '#ff928b' }}>Nenhum artigo encontrado</p>
      </div>}
      {data.length > 0 &&
        <div style={{ padding: '0 30%' }}>
          <CustomInput

            labelText="Filtrar artigos"
            id="filter"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              value: filterText,
              onChange: (e) => setFilterText(e.target.value),
              placeholder: 'Pesquise por id da submissão, título ou modalidade'
            }}
          />
        </div>
      }

      <Grid className={classes.containerCards} container spacing={3} >
        {
          data.filter((x) => filterList(x)).map((x) => (
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
