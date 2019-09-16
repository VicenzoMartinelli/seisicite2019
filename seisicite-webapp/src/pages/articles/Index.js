import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'
import { CssBaseline, Container, Paper, Divider } from '@material-ui/core';
import clsx from 'clsx';
import withAuth from '../../components/withAuth';
import { primaryColor } from '../../styles/kit';
import Header from '../../components/Header';
import { findArticles, findAvaliadores, findModalidades, saveArticle, sortArticles } from '../../services/api';
import { useToasts } from 'react-toast-notifications';
import ListContent from './ListContent';
import ModalArticleEdit from './ModalArticleEdit';
import ListHeader from './ListHeader';
import ModalSortConfirm from './ModalSortConfirm';
import Loading from "../../components/Loading";

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
  boxTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divBtnSort: {
    display: 'flex',
    alignItems: 'center'
  },
  btnSort: {
    margin: theme.spacing(1)
  },
  marginTopElement: {
    marginTop: theme.spacing(1)
  },
  footerForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  animationSpin: {
    animation: 'spin 1s infinite linear'
  }
}));

function Articles({ event }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataAvaliadores, setDataAvaliadores] = useState([]);
  const [dataModalidades, setDataModalidades] = useState([]);
  const [submissaoAtual, setSubmissaoAtual] = useState({});

  const [opering, setOpering] = useState(true);
  const [open, setOpened] = useState(false);
  const [sortOpened, setSortOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const { addToast } = useToasts();

  function handleClickOpen(article) {
    setEditOpened(true);
    article.evaluatorId = article.evaluatorId === null ? '' : article.evaluatorId;
    article.evaluator2Id = article.evaluator2Id === null ? '' : article.evaluator2Id;
    article.startDate = new Date(article.startDate);
    article.type = article.type + "";

    setSubmissaoAtual(article);
  }
  function handleEditClose() {
    setEditOpened(false);
  }
  function handleSort() {
    setOpering(true);

    sortArticles(event)
      .then(res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          setOpering(false);
          return;
        }
        setData(res.data.items);
        setSortOpened(false);
        setOpering(false);
        addToast("Operação realizada com sucesso!", { appearance: 'success', autoDismiss: true });
      })
      .catch(err => {
        addToast(err, { appearance: 'error', autoDismiss: true });
        setOpering(false);
      });
  }
  function handleSortClick() {
    setSortOpened(true);
  }
  function handleSave(values, bag) {
    bag.setSubmitting(true);
    setOpering(true);

    saveArticle(values)
      .then(res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          setOpering(false);
          return;
        }
        setSubmissaoAtual(res.data.result);

        let newData = data.copyWithin();
        let index = newData.findIndex((x) => x.Id === res.data.result.Id);

        if (index !== -1) {
          newData[index] = res.data.result;
        }
        setOpering(false);
        setData(newData);
        addToast("Registro salvo com sucesso!", { appearance: 'success', autoDismiss: true });
      })
      .catch(err => {
        console.log(err)
        setOpering(false);
        addToast(err, { appearance: 'error', autoDismiss: true });
      });
  };

  useEffect(() => {
    async function loadData() {
      setOpering(true);

      findArticles(event, 0)
        .then(res => {
          setData(res.data.items);
          setOpering(false);
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
        <Suspense fallback={<Loading />}>
          <Container className={classes.main} maxWidth={false}>
            <Paper>
              <ListHeader classes={classes} handleSortClick={handleSortClick} />
              <Divider />
              {opering && <Loading w={'100%'} h='75vh' bgColor={'#FFF'} />}
              {!opering && <ListContent classes={classes} data={data} handleClickOpen={handleClickOpen} />}
            </Paper>
          </Container>

          <ModalArticleEdit
            dataAvaliadores={dataAvaliadores}
            dataModalidades={dataModalidades}
            submissaoAtual={submissaoAtual}
            editOpened={editOpened}
            handleClose={handleEditClose}
            handleSave={handleSave}
            classes={classes}
            savingOperation={opering}
          />
          <ModalSortConfirm
            sortOpened={sortOpened}
            setSortOpened={setSortOpened}
            handleSort={handleSort}
          />
        </Suspense>
      </main>
    </div >
  );
}

export default withAuth(Articles);