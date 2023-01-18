import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { purple } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const Search = ({ handleSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Search by name"
          variant="outlined"
          placeholder="Enter name"
          value={input}
          onChange={handleChange}
        />
        <IconButton type="submit" size="large">
          <SearchIcon style={{ fill: purple['500'] }} />
        </IconButton>
      </form>
    </Box>
  );
};

export default Search;
