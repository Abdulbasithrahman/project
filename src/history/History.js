import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './History.css'
import TableSortLabel from '@mui/material/TableSortLabel';

function TablePaginationActions(props) {

  //initialization
  
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, mb: 1.5 }}>
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function History(props) {

  //states

  const data=props.data;
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.secondary.main
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.secondary.main
    },
  }));


  const sx = () => {
    return window.innerWidth < 480 ? { maxWidth: 460, maxHeight: 100 } : { maxWidth: 1100}
  }


  return (
    <div >
      <h2 className='History'>Transaction Details</h2>
      <TableContainer component={Paper}>
        <Table sx={sx} bordered hover aria-label="customized table">
          <thead>
            <TableRow>
              <StyledTableCell>TXN</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Transaction Mode</StyledTableCell>
              <StyledTableCell>Payments Mode</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Debit</StyledTableCell>
              <StyledTableCell>Credit</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
            </TableRow>
          </thead>
          <TableBody>
            {(data.length > 0 ? data.slice(page * 10, page * 10 + 10)
              : data).map((dat , i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{dat.id}</StyledTableCell>
                  <StyledTableCell>{dat.description}</StyledTableCell>
                  <StyledTableCell>{dat.transaction}</StyledTableCell>
                  <StyledTableCell>{dat.payout}</StyledTableCell>
                  <StyledTableCell>Rs.{dat.amount}</StyledTableCell>
                  <StyledTableCell>Rs.{dat.transaction == "Debited" ? dat.amount : '--'}</StyledTableCell>
                  <StyledTableCell>Rs.{dat.transaction == "Credited" ? dat.amount : '--'}</StyledTableCell>
                  <StyledTableCell>Rs.{dat.balance}</StyledTableCell>
                </StyledTableRow>
              ))

            }

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={10}
                count={data.length}
                rowsPerPage={10}
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
    </div>
  );
}

export default History;