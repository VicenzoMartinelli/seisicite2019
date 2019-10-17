import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem
} from "@material-ui/core";
import clsx from "clsx";
import withAuth from "../../components/withAuth";
import { primaryColor } from "../../styles/kit";
import Header from "../../components/Header";
import { findModalidades, findReportArticles } from "../../services/api";
import { useToasts } from "react-toast-notifications";
import ReportGrid from "./ReportGrid";
import Loading from "../../components/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -240
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  colorPrimary: {
    color: primaryColor
  },
  main: {
    marginTop: "10vh"
  },
  marginTopTitle: {
    marginTop: "5%"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  label: {
    color: "#AAAAAA !important",
    fontSize: "14px"
  },
  animationSpin: {
    animation: "spin 1s infinite linear"
  }
}));

function Report() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [opering, setOpering] = useState(true);
  const [open, setOpened] = useState(true);
  const [modalidade, setModalidade] = useState(null);
  const [apresentationType, setApresentationType] = useState(null);
  const [modalidades, setModalidades] = useState([]);
  const [event, setEvent] = useState(1);

  const eventos = [{ id: 1, name: "Sei" }, { id: 2, name: "Sicite" }];
  const apresentationTypes = [
    { id: null, name: "Todos" },
    { id: 1, name: "Poster" },
    { id: 2, name: "Oral" }
  ];
  const { addToast } = useToasts();

  useEffect(() => {
    async function loadData() {
      setOpering(true);

      findModalidades(event, modalidade).then(res => {
        setModalidades(res.data);
        setOpering(false);
      });
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      setOpering(true);

      findReportArticles(event, modalidade, apresentationType).then(res => {
        setData(res.data);
        setOpering(false);
      });
    }

    if (modalidade && modalidade.length > 0) {
      loadData();
    }
  }, [modalidade, event, apresentationType]);
  
  function handleChangeApresentationType(event) {
    setApresentationType(event.target.value);
  }
  function handleChangeModalidade(event) {
    setModalidade(event.target.value);
  }
  function handleChangeEvent(event) {
    setEvent(event.target.value);
  }

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
            <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              <FormControl
                style={{ width: "30%", marginLeft: "10%", marginRight: "10%" }}
              >
                <InputLabel className={classes.label} htmlFor="event">
                  Evento
                </InputLabel>
                <Select
                  value={event}
                  onChange={handleChangeEvent}
                  input={<Input name="event" id="event" />}
                >
                  {eventos.map(x => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                style={{ width: "30%", marginLeft: "10%", marginRight: "10%" }}
              >
                <InputLabel className={classes.label} htmlFor="modality">
                  Modalidade
                </InputLabel>
                <Select
                  value={modalidade}
                  onChange={handleChangeModalidade}
                  input={<Input name="modality" id="modality" />}
                >
                  {modalidades.map(x => (
                    <MenuItem key={x} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                style={{ width: "30%", marginLeft: "10%", marginRight: "10%" }}
              >
                <InputLabel
                  className={classes.label}
                  htmlFor="apresentationType"
                >
                  Tipo da apresentação
                </InputLabel>
                <Select
                  value={apresentationType}
                  onChange={handleChangeApresentationType}
                  input={
                    <Input name="apresentationType" id="apresentationType" />
                  }
                >
                  {apresentationTypes.map(x => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Divider />
            {!opering && (
              <ReportGrid
                addToast={addToast}
                setOpering={setOpering}
                rows={data}
              />
            )}
            {opering && <Loading w={"100%"} h="75vh" bgColor={"#FFF"} />}
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default withAuth(Report);
