import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { approve, cancelEvaluators } from '../../services/api';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
  { id: 'instituion', numeric: false, disablePadding: true, label: 'Instituição' },
  { id: 'attendedModalities', numeric: false, disablePadding: true, label: 'Modalidades atendidas' },
  { id: 'isSei', numeric: false, disablePadding: false, label: 'Sei' },
  { id: 'isSicite', numeric: false, disablePadding: false, label: 'Sicite' },
];

function GridHeader(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, toApprove } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {toApprove && <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            color="primary"
            inputProps={{ 'aria-label': 'Selecionar todos os avaliadores' }}
          />
        </TableCell>}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'ordem decrescente' : 'ordem ascendente'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

GridHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  spacer: {
    flex: '1 1 60%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  containerActions: {
    display: 'inline'
  },
  title: {
    flex: '0 0 auto',
  },
}));

const GridHeaderToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, handleApprove, handleCancel, toApprove } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selecionados
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {toApprove ? "Avaliadores pendentes" : "Avaliadores confirmados"}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {(numSelected > 0 && toApprove) && (
          <Box className={classes.containerActions}>
            <Tooltip title="Cancelar">
              <IconButton onClick={handleCancel} aria-label="delete">
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aprovar">
              <IconButton onClick={handleApprove} aria-label="approve">
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </ Box>
        )}
      </div>
    </Toolbar>
  );
};

GridHeaderToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  noPadding: {
    padding: '0 !important'
  }
}));

export default function EvaluatorGrid({ toApprove, rows, setRows, addToast, setOpering, handleRefresh }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleApprove() {
    setOpering(true);

    approve(selected)
      .then(async res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          setOpering(false);
          return;
        }
        setRows(res.data);
        setSelected([]);
        handleRefresh(false)
        setOpering(false);

        addToast("Operação realizada com sucesso!", { appearance: 'success', autoDismiss: true });
      })
      .catch(err => {
        console.log(err)
        setOpering(false);
        addToast(err, { appearance: 'error', autoDismiss: true });
      });
  }

  function handleCancel() {
    setOpering(true);

    cancelEvaluators(selected)
      .then(async res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          setOpering(false);
          return;
        }
        setRows(res.data);
        setSelected([]);
        handleRefresh(false)
        setOpering(false);

        addToast("Operação realizada com sucesso!", { appearance: 'success', autoDismiss: true });
      })
      .catch(err => {
        console.log(err)
        setOpering(false);
        addToast(err, { appearance: 'error', autoDismiss: true });
      });
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <GridHeaderToolbar toApprove={toApprove} selectedItems={selected} handleApprove={handleApprove} handleCancel={handleCancel} numSelected={selected.length} />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <GridHeader
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            toApprove={toApprove}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `grid-approve-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {toApprove && <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>}
                    <TableCell component="th" id={labelId} scope="row" padding="default">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.institution}</TableCell>
                    <TableCell align="left">{row.attendedModalities.join(', ')}</TableCell>
                    <TableCell align="left">
                      <Checkbox
                        checked={row.isSei}
                        disabled
                        color="primary"
                        className={classes.noPadding}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Checkbox
                        checked={row.isSicite}
                        disabled
                        color="primary"
                        className={classes.noPadding}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        labelRowsPerPage="Itens por página"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'anterior',
        }}
        nextIconButtonProps={{
          'aria-label': 'próxima',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}