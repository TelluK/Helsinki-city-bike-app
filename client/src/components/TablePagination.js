import MUITablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

const TablePagination = (props) => {
  const {
    page,
    tableRowCount,
    handlePageChange,
    handleRowsPerPageChange,
    rowsPerPage,
  } = props;

  return (
    <Stack spacing={2}>
      <MUITablePagination
        component="div"
        rowsPerPageOptions={[15, 20, 25, 50, 100]}
        count={tableRowCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  );
};

export default TablePagination;
