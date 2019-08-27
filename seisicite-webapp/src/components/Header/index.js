import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import { primaryColor } from '../../styles/kit';
import { getConfirm } from '../../services/auth';
import { Box, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReceiptOutlined, AssignmentOutlined, AssignmentSharp } from '@material-ui/icons';
import * as auth from '../../services/auth';
import history from '../../history';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#fff',
    boxShadow: '-3px -3px 40px -19px rgba(0,0,0,0.75)'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  margLeftSmall: {
    marginLeft: theme.spacing(2)
  },
  boxMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  boxLeftMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: primaryColor
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
}));

export default function Header({ open, setOpen, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const confirm = getConfirm();
  const setOpened = setOpen;
  const [openDrop, setOpenDrop] = React.useState(false);

  function handleDrawerOpen() {
    setOpened(true);
  }

  function handleDrawerClose() {
    setOpened(false);
  }
  function handleClickAway() {
    setOpenDrop(false);
  };
  function handleClickDropdown() {
    setOpenDrop(true);
  };

  function handleExit() {
    auth.logout();
    history.replace('/login');
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box className={classes.boxMenu}>
            <Box className={classes.boxLeftMenu}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={clsx(classes.colorPrimary, classes.margLeftSmall)} noWrap>Sei Sicite 2019</Typography>
            </Box>
            <Box className={classes.boxLeftMenu}>
              <Typography variant="h6" className={classes.colorPrimary} noWrap>
                {confirm.Email}
              </Typography>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <IconButton onClick={handleClickDropdown}>
                    <AccountCircleOutlined htmlColor={primaryColor} className={classes.margLeftSmall} />
                  </IconButton>
                  {openDrop ? (
                    <Paper className={classes.paper}>
                      <IconButton
                        onClick={handleExit}>
                        <ExitToApp />
                      </IconButton>
                    </Paper>
                  ) : null}
                </div>
              </ClickAwayListener>
            </Box>

          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon htmlColor={primaryColor} /> : <ChevronRightIcon htmlColor={primaryColor} />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button component={Link} to={'/login'} >
          <ListItemIcon><HomeOutlined htmlColor={primaryColor} /></ListItemIcon>
          <ListItemText className={classes.colorPrimary} primary={'Home'} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={'/articles/sei'} >
          <ListItemIcon><AssignmentOutlined htmlColor={primaryColor} /></ListItemIcon>
          <ListItemText className={classes.colorPrimary} primary={'Artigos Sei'} />
        </ListItem>

        <ListItem button component={Link} to={'/login'} >
          <ListItemIcon><AssignmentSharp htmlColor={primaryColor} /></ListItemIcon>
          <ListItemText className={classes.colorPrimary} primary={'Artigos Sicite'} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={'/login'} >
          <ListItemIcon><ReceiptOutlined htmlColor={primaryColor} /></ListItemIcon>
          <ListItemText className={classes.colorPrimary} primary={'Relatório'} />
        </ListItem>
      </Drawer>
    </>
  );
}