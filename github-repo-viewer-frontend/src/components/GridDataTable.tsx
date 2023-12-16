import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableHead } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import { getGitHubRepoDetails } from '../services/githubservices';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const GridDataTable=()=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [gitData, setGitData] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const handleSearchClickEvent = (event: React.MouseEvent<Element, MouseEvent>)=>{
    getGitHubRepoDetails(userName).then((data:any)=>{
        console.log("Response: ", data);
        data = data.map((f:any)=>{return {repo: f.name, forks_count:f.forks_count || 0, language:f.language || ""}});
        setGitData(data);
    }).catch((error:any)=>{
        console.log("Error: ", error);
    });
}
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gitData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <Stack sx={{marginBottom:1}} direction="row" spacing={2}>
      <Box
      sx={{
        width: 500,
        maxWidth: '100%'
      }}
    >
    <TextField required={true} fullWidth onBlur={(e)=>{setUserName(e.target.value)}} name="username" label="GitHub Username" id="fullWidth" />
    </Box>
    <Button onClick={handleSearchClickEvent} variant="outlined" endIcon={<Search />}>
      Search
    </Button>
  </Stack>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead className='bg-gray-200'>
          <TableRow>
            <TableCell>Repository name</TableCell>
            <TableCell>No. of forks</TableCell>
            <TableCell>Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? gitData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : gitData
          ).map((row:any) => (
            <TableRow key={row.repo}>
                <TableCell component="th" scope="row">
                {row.repo}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.forks_count}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.language}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          {gitData.length == 0 && (
          <TableRow style={{ height: 270 }}>
          <TableCell align='center' colSpan={6}>No Records. </TableCell>
        </TableRow>)}
        </TableBody>
        <TableFooter className='bg-gray-200'>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={gitData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}

export default GridDataTable;