import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import {
  Paper,
  Table,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Divider,
  Box,
  Link,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
// components
import Scrollbar from '../../Scrollbar';
//
import SortingHead from './SortingTableHead';
import { useDispatch } from '../../../redux/store';
import { deleteAProject, getAProject } from '../../../redux/slices/project';

const TABLE_HEAD = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'lastRunStatus',
    numeric: false,
    disablePadding: false,
    label: 'LastRunStatus'
  },
  {
    id: 'lastRun',
    numeric: false,
    disablePadding: false,
    label: 'LastRun'
  },
  {
    id: 'nextRun',
    numeric: false,
    disablePadding: false,
    label: 'NextRun'
  },
  {
    id: 'loaded',
    numeric: false,
    disablePadding: false,
    label: 'Loaded into Workspace'
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& th': {
    background: 'none',
    paddingTop: 10,
    paddingBottom: 10
  }
}));

const ProjectsView = ({ projects, search }) => {
  const navigate = useNavigate();
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredProjects.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickProject = (id) => {
    dispatch(getAProject(id));
    navigate('/dashboard/home');
  };

  const handleClickDelete = (id) => {
    dispatch(deleteAProject(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (!search || search === '') {
      setFilteredProjects(projects);
    } else {
      const newProjects = projects.filter(({ name }) => name.includes(search));
      setFilteredProjects(newProjects);
    }
  }, [projects, search]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProjects.length) : 0;

  return (
    <Paper elevation={3}>
      <Typography variant="h6" gutterBottom component="div" style={{ padding: '10px 0 0 10px' }}>
        Projects
      </Typography>
      <Divider />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="medium">
            <SortingHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={filteredProjects.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {stableSort(filteredProjects, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `projects-table-${index}`;
                  return (
                    <StyledRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Link
                          component="button"
                          variant="body2"
                          underline="none"
                          onClick={() => handleClickProject(row.id)}
                        >
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.lastRunStatus}</TableCell>
                      <TableCell align="right">{row.lastRun}</TableCell>
                      <TableCell align="right">{row.nextRun}</TableCell>
                      <TableCell align="right">{row.loadedIntoWorkspace}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleClickDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </StyledRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

ProjectsView.propTypes = {
  projects: PropTypes.array,
  search: PropTypes.string
};

export default ProjectsView;
