import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withAuth from '../../components/withAuth';
import { primaryColor } from '../../styles/kit';
import Header from '../../components/Header';
import { Container } from '@material-ui/core';
import HomeImage from '../../imgs/home.svg';

const drawerWidth = 240;

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
    marginLeft: -drawerWidth,
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
  }
}));

function Home() {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpened} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >

        <Container className={classes.main} fixed >
          <Typography className={clsx(classes.colorPrimary, classes.marginTopTitle)} align={"center"} variant="h5">
            Sistema de gerenciamento SeiSicite
          </Typography>
          <div style={{ width: '50%', margin: '5% auto' }}>
            <img src={HomeImage} style={{ width: '100%' }} />
          </div>

        </Container>

      </main>
    </div >
  );
}

export default withAuth(Home);