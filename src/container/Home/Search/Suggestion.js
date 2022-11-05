import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';


const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App = () => {
  const options = [
    {label: 'One', value: 'One'}, 
    {label: 'Two', value: 'Two'},
    {label: 'Three', value: 'Three'}, 
    {label: 'Four', value: 'Four'},
    {label: 'Five', value: 'Five'}
  ]

  const onSearch = (searchText) => {
    options(
      !searchText ? [] : [mockVal(searchText)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    </>
  );
};

export default App;