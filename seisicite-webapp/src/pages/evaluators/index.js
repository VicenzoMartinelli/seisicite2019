import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, Paper, Divider, Tabs, Tab } from '@material-ui/core';
import clsx from 'clsx';
import withAuth from '../../components/withAuth';
import { primaryColor } from '../../styles/kit';
import Header from '../../components/Header';
import { } from '../../services/api';
import { useToasts } from 'react-toast-notifications';
import EvaluatorGrid from './EvaluatorGrid';
import TabPanel from './TabPanel';
import Loading from "../../components/Loading";
import { findEvaluatorsToApprove, findApprovedEvaluators } from '../../services/api';

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
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  label: {
    color: "#AAAAAA !important",
    fontSize: "14px"
  },
  animationSpin: {
    animation: 'spin 1s infinite linear'
  }
}));

function Evaluators() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [opering, setOpering] = useState(true);
  const [open, setOpened] = useState(true);
  const [tab, setTab] = React.useState(0);
  const [rowsApprove, setRowsApprove] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [refreshToApprove, setRefreshToApprove] = React.useState(false);
  const [refreshConfirmed, setRefreshConfirmed] = React.useState(false);

  const { addToast } = useToasts();

  function handleTabChange(event, newValue) {
    setTab(newValue);
  }

  function handleRefresh(toApprove) {
    if (toApprove) {
      setRefreshToApprove(!refreshToApprove);
    }
    else {
      setRefreshConfirmed(!refreshConfirmed);
    }
  }

  useEffect(() => {
    async function loadData() {
      setOpering(true);

      findEvaluatorsToApprove()
        .then(res => {
          setRowsApprove(res.data);
          setOpering(false);
        });
    }

    loadData();
  }, [refreshToApprove]);

  useEffect(() => {
    async function loadData() {
      setOpering(true);

      findApprovedEvaluators()
        .then(res => {
          setRows(res.data);
          setOpering(false);
        });
    }

    loadData();
  }, [refreshConfirmed]);

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
            {!opering && (
              <>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Pendentes Aprovação" />
                  <Tab label="Confirmados" />
                </Tabs>

                <TabPanel value={tab} index={0}>
                  <EvaluatorGrid
                    handleRefresh={handleRefresh}
                    addToast={addToast}
                    setOpering={setOpering}
                    setRows={setRowsApprove}
                    toApprove={true}
                    rows={rowsApprove} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <EvaluatorGrid
                    handleRefresh={handleRefresh}
                    toApprove={false}
                    rows={rows} />
                </TabPanel>
              </>
            )}
            {opering && <Loading w={'100%'} h='75vh' bgColor={'#FFF'} />}
          </Paper>
        </Container>
      </main>
    </div >
  );
}

export default withAuth(Evaluators);