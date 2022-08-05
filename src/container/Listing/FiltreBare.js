import * as React from 'react';


function City(props) {
  return (
    <>
    <div className="FiltreTool">
        <h4 className="nametool"> <span class="icon-ic24-slider"></span>Filters</h4>
        <select className="filtreItem">
            <option>Category</option>
            </select>
            <br/>
        <select className="filtreItem">
            <option>Price</option>
            </select>
    </div>
    </>
    
    );
}
export default City;