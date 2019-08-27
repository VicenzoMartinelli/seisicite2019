import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withAuth from '../../components/withAuth';
import { primaryColor } from '../../styles/kit';
import Header from '../../components/Header';
import { Container, Paper, Grid, Divider } from '@material-ui/core';
import CardArticle from './card-article';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Save from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { findArticles, findAvaliadores } from '../../services/api';
import { toLocalDate } from '../../services/date-utils';
import * as Yup from 'yup';
import {
  Formik
} from 'formik';
import { useToasts } from 'react-toast-notifications';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import history from '../../history';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email, LockOutlined, FormatAlignJustify } from "@material-ui/icons";
import * as auth from '../../services/auth';

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
    background: primaryColor
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  const [page, setPage] = useState(0);
  const [submissaoAtual, setSubmissaoAtual] = useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const { addToast } = useToasts();

  const FullScreenModal = () => {
    return (<Dialog fullScreen open={openModal} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Subimissão: {submissaoAtual.submissionId}
          </Typography>
          <Button color="inherit" onClick={handleClose}><Save /> Salvar</Button>
        </Toolbar>
      </AppBar>
      <div style={{ width: '80%', margin: '10px auto' }}>
        <Formik
          initialValues={submissaoAtual}
          onSubmit={onSubmit}
          validationSchema={valSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              handleChange,
              handleSubmit,
            } = props;
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
                    placeHolder: 'UTFPR',
                    autoComplete: "off"
                  }}
                />
                <CustomInput
                  labelText="Detalhes sobre o local"
                  error={(errors.localDetails && touched.localDetails)}
                  labelError={(errors.localDetails && touched.localDetails) && errors.localDetails}
                  id="localDetails"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: values.localDetails,
                    onChange: handleChange,
                    placeHolder: 'UTFPR',
                    autoComplete: "off"
                  }}
                />
                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="appraiser">Avaliador</InputLabel>
                  <Select
                    value={values.appraiser}
                    onChange={handleChange}
                    input={<Input name="appraiser" id="appraiser" />}>
                    {dataAvaliadores.map((x) => (
                      <MenuItem value={x.id}>{x.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            );
          }}
        </Formik>
      </div>
    </Dialog>);
  };

  function handleClickOpen(article) {
    setOpenModal(true);
    setSubmissaoAtual(article);
  }
  function handleClose() {
    setOpenModal(false);
  }
  const onSubmit = (values, bag) => {
    bag.setSubmitting(true);

    auth
      .login(values.email, values.password)
      .then(res => {

        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          return;
        }

        history.push("/");
      })
      .catch(err => {
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
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpened} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Container className={classes.main} maxWidth="lg">
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
                    startDate={toLocalDate(x.startDate)}
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