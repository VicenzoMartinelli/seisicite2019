import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import locale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  FormHelperText,
  Divider
} from "@material-ui/core";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Check, Close as CloseIcon, RefreshOutlined } from "@material-ui/icons";
import Button from "../../components/CustomButtons/Button.jsx";

const schema = yup.object().shape({
  title: yup.string().required("Informe um título válido"),
  resume: yup.string().required("Informe um resumo válido"),
  building: yup.string().required("Informe um local válido"),
  room: yup.string().required("Informe uma sala válida"),
  evaluatorId: yup.string().required("Informe ao menos um avaliador"),
  evaluator2Id: yup
    .string()
    .notOneOf([yup.ref("evaluatorId")], "Selecione outro avaliador")
    .nullable(),
  modality: yup.string().required("Informe a modalidade")
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalArticleEdit({
  dataAvaliadores,
  dataModalidades,
  submissaoAtual,
  editOpened,
  handleClose,
  handleSave,
  classes,
  savingOperation
}) {
  return (
    <Dialog
      fullScreen
      open={editOpened}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon className={classes.closeButton} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Subimissão: {submissaoAtual.submissionId}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ width: "80%", margin: "10px auto" }}>
        <Formik
          initialValues={submissaoAtual}
          onSubmit={handleSave}
          validationSchema={schema}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue,
              submitForm
            } = props;

            const handleDataChange = date => {
              setFieldValue("startDate", date);
            };

            return (
              <form onSubmit={handleSubmit}>
                <CustomInput
                  labelText="Título"
                  error={errors.title && touched.title}
                  labelError={errors.title && touched.title && errors.title}
                  id="title"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: values.title,
                    onChange: handleChange
                  }}
                />
                <CustomInput
                  labelText="Local"
                  error={errors.building && touched.building}
                  labelError={
                    errors.building && touched.building && errors.building
                  }
                  id="building"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: values.building,
                    onChange: handleChange,
                    placeholder: "Local da apresentação (Ex: UTFPR)",
                    autoComplete: "off"
                  }}
                />
                <CustomInput
                  labelText="Sala"
                  error={errors.room && touched.room}
                  labelError={errors.room && touched.room && errors.room}
                  id="room"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: values.room,
                    onChange: handleChange,
                    placeholder: "Sala da apresentação (Ex: 108)",
                    autoComplete: "off"
                  }}
                />
                <CustomInput
                  labelText="Detalhes sobre o local"
                  error={errors.localDetails && touched.localDetails}
                  labelError={
                    errors.localDetails &&
                    touched.localDetails &&
                    errors.localDetails
                  }
                  id="localDetails"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    type: "text",
                    value: values.localDetails,
                    onChange: handleChange,
                    autoComplete: "off"
                  }}
                />
                <FormControl fullWidth={true}>
                  <InputLabel className={classes.label} htmlFor="evaluatorId">
                    Avaliador
                  </InputLabel>
                  <Select
                    value={values.evaluatorId}
                    onChange={handleChange}
                    input={<Input name="evaluatorId" id="evaluatorId" />}
                  >
                    {dataAvaliadores.map(x => (
                      <MenuItem key={x.id} value={x.id}>
                        {x.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={errors.evaluatorId && touched.evaluatorId}
                  >
                    {errors.evaluatorId &&
                      touched.evaluatorId &&
                      errors.evaluatorId}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth={true}
                  className={classes.formControlMargin}
                >
                  <InputLabel className={classes.label} htmlFor="evaluator2Id">
                    2º Avaliador
                  </InputLabel>
                  <Select
                    value={values.evaluator2Id}
                    onChange={handleChange}
                    displayEmpty={true}
                    input={<Input name="evaluator2Id" id="evaluator2Id" />}
                  >
                    {[{ id: null, name: null }]
                      .concat(dataAvaliadores)
                      .map(x => (
                        <MenuItem key={x.id} value={x.id}>
                          {x.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText
                    error={errors.evaluator2Id && touched.evaluator2Id}
                  >
                    {errors.evaluator2Id &&
                      touched.evaluator2Id &&
                      errors.evaluator2Id}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  className={classes.formControlMargin}
                  fullWidth={true}
                >
                  <InputLabel className={classes.label} htmlFor="modality">
                    Modalidade
                  </InputLabel>
                  <Select
                    value={values.modality}
                    onChange={handleChange}
                    input={<Input name="modality" id="modality" />}
                  >
                    {dataModalidades.map(x => (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={errors.modality && touched.modality}>
                    {errors.modality && touched.modality && errors.modality}
                  </FormHelperText>
                </FormControl>

                <CustomInput
                  labelText="Resumo"
                  error={errors.resume && touched.resume}
                  labelError={errors.resume && touched.resume && errors.resume}
                  id="resume"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    type: "text",
                    value: values.resume,
                    onChange: handleChange,
                    autoComplete: "off",
                    multiline: true
                  }}
                />

                <FormControl
                  fullWidth={true}
                  className={classes.formControlMargin}
                >
                  <FormLabel component="legend">Tipo da apresentação</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    className={classes.typeGroup}
                    value={values.type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={"1"}
                      control={<Radio color="primary" />}
                      label="Pôster"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value={"2"}
                      control={<Radio color="primary" />}
                      label="Oral"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl
                  fullWidth={true}
                  className={classes.formControlMargin}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="dateArticle"
                        label="Data da apresentação"
                        format="dd/MM/yyyy"
                        value={values.startDate}
                        onChange={handleDataChange}
                        KeyboardButtonProps={{
                          "aria-label": "Alterar data"
                        }}
                        invalidDateMessage={"Data em formato inválido"}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="hourArticle"
                        format="HH:mm"
                        label="Horário"
                        value={values.startDate}
                        onChange={handleDataChange}
                        KeyboardButtonProps={{
                          "aria-label": "Alterar horário"
                        }}
                        invalidDateMessage={"Hora em formato inválido"}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </FormControl>

                <Divider className={classes.marginTopElement} />

                <Box className={classes.footerForm}>
                  <Button
                    disabled={savingOperation}
                    color="primary"
                    className={classes.marginTopElement}
                    round
                    onClick={submitForm}
                  >
                    {!savingOperation && (
                      <>
                        <Check /> Salvar
                      </>
                    )}
                    {savingOperation && (
                      <>
                        <RefreshOutlined className={classes.animationSpin} />{" "}
                        Salvar
                      </>
                    )}
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </div>
    </Dialog>
  );
}
