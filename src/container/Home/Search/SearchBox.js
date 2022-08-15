import React, { Component, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Project from './project';
import Autocomplete from "./AutoComplete";
import { useNavigate } from "react-router-dom";
import Data from "./Produit.json"
import Ville from "./ville.json"


class Header extends Component {
  
  render() {

    return (
        <div className="Searchbox"> 
        <Autocomplete
        suggestions={Data} />
        <Box sx={{ minWidth: 130 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="City"
                  label="City">  
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                      <MenuItem value="">Alhoceima</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <Project />
         <button className="send"><span class="icon-ic24-search"></span></button>
        </div>
    );
  }
}

export default Header;