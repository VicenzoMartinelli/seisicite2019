import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'
import {
  Slide, IconButton, AppBar, Toolbar, Select, FormControl, InputLabel, MenuItem, CssBaseline, Typography, Container, Paper, Grid, Divider, Button, Dialog, Input,
  FormLabel, RadioGroup, FormControlLabel, Radio, Fab
} from '@material-ui/core';
import clsx from 'clsx';
import withAuth from '../../components/withAuth';
import { primaryColor } from '../../styles/kit';
import Header from '../../components/Header';
import CardArticle from './card-article';
import { Save, Close as CloseIcon } from '@material-ui/icons';
import { findArticles, findAvaliadores, findModalidades, saveArticle } from '../../services/api';
import { toLocalDateShortString } from '../../services/date-utils';
import DateFnsUtils from '@date-io/date-fns';
import locale from 'date-fns/locale/pt-BR'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import * as Yup from 'yup';
import {
  Formik
} from 'formik';
import { useToasts } from 'react-toast-notifications';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { __values } from 'tslib';

const valSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Informe um email válido'),
  password: Yup
    .string()
    .required('Informe a senha')
    .min(6, "A senha deve possuir no mínimo 6 caracteres")
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  colorPrimary: {
    color: primaryColor
  },
  main: {
    marginTop: '10vh'
  },
  marginTopTitle: {
    marginTop: '5%'
  },
  titleArticles: {
    padding: '15px 5px',
    color: primaryColor
  },
  containerCards: {
    marginTop: '1rem'
  },
  appBar: {
    position: 'relative',
    background: 'primary',
    color: 'white'
  },
  closeButton: {
    color: 'white'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  label: {
    color: "#AAAAAA !important",
    fontSize: "14px"
  },
  formControlMargin: {
    marginTop: '10px'
  },
  typeGroup: {
    flexDirection: 'row',
    "&:first-child": {
      marginLeft: '0'
    }
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ArticlesSei() {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);
  const [data, setData] = useState([]);
  const [dataAvaliadores, setDataAvaliadores] = useState([]);
  const [dataModalidades, setDataModalidades] = useState([]);
  const [page, setPage] = useState(0);
  const [submissaoAtual, setSubmissaoAtual] = useState({});

  const [openModal, setOpenModal] = React.useState(false);
  const { addToast } = useToasts();

  const FullScreenModal = () => {

    return (
      <Dialog fullScreen open={openModal} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon className={classes.closeButton} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Subimissão: {submissaoAtual.submissionId}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ width: '80%', margin: '10px auto' }}>
          <Formik
            initialValues={submissaoAtual}
            onSubmit={onSubmit}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleSubmit,
                setFieldValue,
                submitForm
              } = props;

              const handleDataChange = (date) => {
                setFieldValue('startDate', date);
              }

              return (
                <form onSubmit={handleSubmit}>
                  <CustomInput
                    labelText="Título"
                    error={(errors.title && touched.title)}
                    labelError={(errors.title && touched.title) && errors.title}
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
                    error={(errors.building && touched.building)}
                    labelError={(errors.building && touched.building) && errors.building}
                    id="building"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: values.building,
                      onChange: handleChange,
                      placeholder: 'UTFPR',
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                    labelText="Sala"
                    error={(errors.room && touched.room)}
                    labelError={(errors.room && touched.room) && errors.room}
                    id="room"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: values.room,
                      onChange: handleChange,
                      placeholder: 'UTFPR',
                      autoComplete: "off"
                    }}
                  />
                  <CustomInput
                    labelText="Detalhes sobre o local"
                    error={(errors.localDetails && touched.localDetails)}
                    labelError={(errors.localDetails && touched.localDetails) && errors.localDetails}
                    id="localDetails"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      type: "text",
                      value: values.localDetails,
                      onChange: handleChange,
                      placeholder: 'UTFPR',
                      autoComplete: "off"
                    }}
                  />
                  <FormControl fullWidth={true}>
                    <InputLabel className={classes.label} htmlFor="evaluatorId">Avaliador</InputLabel>
                    <Select
                      value={values.evaluatorId}
                      onChange={handleChange}
                      input={<Input name="evaluatorId" id="evaluatorId" />}>
                      {dataAvaliadores.map((x) => (
                        <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth={true} className={classes.formControlMargin} >
                    <InputLabel className={classes.label} htmlFor="evaluator2Id">2º Avaliador</InputLabel>
                    <Select
                      value={values.evaluator2Id}
                      onChange={handleChange}
                      input={<Input name="evaluator2Id" id="evaluator2Id" />}>
                      {dataAvaliadores.map((x) => (
                        <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControlMargin} fullWidth={true}>
                    <InputLabel className={classes.label} htmlFor="modality">Modalidade</InputLabel>
                    <Select
                      value={values.modality}
                      onChange={handleChange}
                      input={<Input name="modality" id="modality" />}>
                      {dataModalidades.map((x) => (
                        <MenuItem key={x} value={x}>{x}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <CustomInput
                    labelText="Resumo"
                    error={(errors.resume && touched.resume)}
                    labelError={(errors.resume && touched.resume) && errors.resume}
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

                  <FormControl fullWidth={true} className={classes.formControlMargin}>
                    <FormLabel component="legend">Tipo da apresentação</FormLabel>
                    <RadioGroup
                      aria-label="type"
                      name="type"
                      className={classes.typeGroup}
                      value={values.type}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio name="type" color="primary" />}
                        label="Pôster"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio name="type" color="primary" />}
                        label="Oral"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl fullWidth={true} className={classes.formControlMargin}>
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
                            'aria-label': 'Alterar data',
                          }}
                        />
                        <KeyboardTimePicker
                          margin="normal"
                          id="hourArticle"
                          format="HH:mm"
                          label="Horário"
                          value={values.startDate}
                          onChange={handleDataChange}
                          KeyboardButtonProps={{
                            'aria-label': 'Alterar horário',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                  <Fab aria-label={'Salvar'} className={classes.fab} onClick={submitForm}>
                    <Save />
                  </Fab>
                </form>
              );
            }}
          </Formik>
        </div>
      </Dialog >);
  };

  function handleClickOpen(article) {
    setOpenModal(true);
    article.evaluatorId = article.evaluatorId === null ? '' : article.evaluatorId;
    article.evaluator2Id = article.evaluator2Id === null ? '' : article.evaluator2Id;
    article.startDate = new Date(article.startDate);

    setSubmissaoAtual(article);
  }
  function handleClose() {
    setOpenModal(false);
  }
  const onSubmit = (values, bag) => {
    bag.setSubmitting(true);

    saveArticle(values)
      .then(res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          return;
        }

        setSubmissaoAtual(res.data.result);
      })
      .catch(err => {
        console.log(err)
        addToast(err, { appearance: 'error', autoDismiss: true });
      });
  };

  useEffect(() => {
    async function loadData() {
      findArticles(1, page)
        .then(res => {
          setPage(res.data.page);

          setData(res.data.items);
        });
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadDataAvaliadores() {
      findAvaliadores(1)
        .then(res => {
          setDataAvaliadores(res.data);
        });
    }

    loadDataAvaliadores();
  }, []);

  useEffect(() => {
    async function loadDataModalidades() {
      findModalidades()
        .then(res => {
          setDataModalidades(res.data);
        });
    }

    loadDataModalidades();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpened} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Container className={classes.main} maxWidth={false}>
          <Paper>
            <Typography variant="h5" className={classes.titleArticles}>
              Artigos
            </Typography>
            <Divider />
            <Grid className={classes.containerCards} container spacing={3}>
              {data.map((x) => (
                <Grid item sm={12} md={6} lg={4} key={x.id}>
                  <CardArticle
                    title={x.title}
                    resume={x.resume}
                    primaryAuthor={x.primaryAuthor}
                    submissionId={x.submissionId}
                    modality={x.modality}
                    startDate={toLocalDateShortString(x.startDate)}
                    onEditClick={() => handleClickOpen(x)}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>

        <FullScreenModal />
      </main>
    </div >
  );
}

export default withAuth(ArticlesSei);