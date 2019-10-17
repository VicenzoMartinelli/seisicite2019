import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CardArticle from "./CardArticle";
import { toLocalDateShortString } from "../../services/date-utils";
import EmptyImage from "../../imgs/empty.svg";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import TrackVisibility from "react-on-screen";

export default function ListContent({
  classes,
  data,
  handleClickOpen: handleEdit
}) {
  const [filterText, setFilterText] = useState("");
  const [onlyToEvaluate, setOnlyToEvaluate] = useState(false);

  function filterList(article) {
    if (filterText === "" || filterText === null) {
      return true;
    }
    const f = filterText.toLocaleLowerCase();

    return (
      article.submissionId.toLocaleLowerCase().includes(f) ||
      article.title.toLocaleLowerCase().includes(f) ||
      article.modality.toLocaleLowerCase().includes(f)
    );
  }
  function filterOnlyToEvaluate(article) {
    if (!onlyToEvaluate) {
      return true;
    }

    const evaluated =
      (article.evaluatorId || "").length > 0 &&
      (article.evaluator2Id || "").length > 0;

    return !evaluated;
  }

  return (
    <>
      {data.length === 0 && (
        <div style={{ width: "35vh", margin: "5% auto" }}>
          <img src={EmptyImage} style={{ width: "100%" }} />
          <p style={{ textAlign: "center", color: "#ff928b" }}>
            Nenhum artigo encontrado
          </p>
        </div>
      )}

      {data.length > 0 && (
        <div style={{ padding: "30px 5%" }}>
          <CustomInput
            labelText="Filtrar artigos"
            id="filter"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              value: filterText,
              onChange: e => setFilterText(e.target.value || ""),
              placeholder:
                "Pesquise por id da submissão, título, modalidade ou nome do avaliador"
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyToEvaluate}
                onChange={e => setOnlyToEvaluate(e.target.checked)}
                value={onlyToEvaluate}
                color="primary"
              />
            }
            label="Buscar apenas não avaliados"
          />
        </div>
      )}

      <Grid className={classes.containerCards} container spacing={3}>
        {data
          .filter(filterList)
          .filter(filterOnlyToEvaluate)
          .map(x => (
            <Grid
              item
              key={x.id}
              sm={12}
              md={6}
              lg={4}
            >
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
          ))}
      </Grid>
    </>
  );
}
