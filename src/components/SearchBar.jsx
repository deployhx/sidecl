import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      id='search-bar'
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: "0.5px solid #444444",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
        backgroundColor: "#111111",
      }}
    >
      <input className="search-bar" placeholder="Search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value);}} />
      <IconButton type="submit" sx={{ p: "10px", color: "#FFFFFF" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
