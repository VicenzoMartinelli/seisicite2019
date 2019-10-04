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
  { id: 'submissionId', disablePadding: true, label: 'Id Submissão', small: true },
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'commissionNote', numeric: false, disablePadding: true, label: 'Nota Comissão', small: true },
  { id: 'evaluator1Name', numeric: false, disablePadding: true, label: '1º Avaliador' },
  { id: 'evaluator1Average', numeric: false, disablePadding: true, label: 'Nota', small: true },
  { id: 'evaluator2Name', numeric: false, disablePadding: true, label: '2º Avaliador' },
  { id: 'evaluator2Average', numeric: false, disablePadding: true, label: 'Nota', small: true },
  { id: 'finalAverage', numeric: false, disablePadding: true, label: 'Nota Final', small: true }
];

function GridHeader(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            size={headCell.small ? 'small' : 'medium'}
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
  const { numSelected } = props;

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
            <Typography color={'primary'} variant="h6" id="tableTitle">
              Relatório de avaliações
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
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

export default function ReportGrid({ rows }) {
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

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <GridHeaderToolbar selectedItems={selected} numSelected={selected.length} />
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
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row" padding="default">
                      {row.submissionId}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.title}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.commissionNote}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.evaluator1Name}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.evaluator1Average}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.evaluator2Name}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.evaluator2Average}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="default">
                      {row.finalAverage}
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