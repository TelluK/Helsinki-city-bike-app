import MUITablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

const TablePagination = (props) => {
  const { page, tableRowCount, handlePageChange } = props;

  return (
    <Stack spacing={2}>
      <MUITablePagination
        component="div"
        rowsPerPageOptions={[15]}
        count={tableRowCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={15}
      />
    </Stack>
  );
};

export default TablePagination;
