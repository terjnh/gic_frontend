import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "../App.css"

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const editButtonClicked = () => {
    alert(`${cellValue} medals won!`);
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button className="Button-table-edit"
        variant="outlined"
        size="small"
        onClick={() => editButtonClicked()}>
        Edit</button>
      <button className="Button-table-delete"
        variant="outlined"
        size="small"
        onClick={() => { console.log("Delete Clicked") }}
      >Delete
      </button>
    </span>
  );
};