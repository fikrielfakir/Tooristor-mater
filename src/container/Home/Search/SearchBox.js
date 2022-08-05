import React, { Component } from 'react';
import City from './City';
import Project from './project';
import Autocomplete from "./AutoComplete";
import { useRedirect } from "react-router-dom";
import Data from "./Produit.json"


class Header extends Component {
  render() {
    return (
        <div className="Searchbox"> 
        <Autocomplete
        suggestions={Data} />
          <City />
          <Project />
         <button className="send"><span class="icon-ic24-search"></span></button>
        </div>
    );
  }
}

export default Header;