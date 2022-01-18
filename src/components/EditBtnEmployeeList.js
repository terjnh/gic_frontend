import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "../App.css"

export default (props) => {
  let history = useHistory();
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const editButtonClicked = () => {
    console.log("EditBtn--rowindex:", props.rowIndex)
    let editPath = `/employee/edit`;
    history.push({
      pathname: editPath,
      state: { rowSelected: props.rowIndex }
    });
  };

  const deleteButtonClicked = () => {
    alert(`Delete clicked!`);

  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;

      <button className="Button-table-edit"
        variant="outlined"
        size="small"
        onClick={() => editButtonClicked()}>
        Edit
      </button>


      <button className="Button-table-delete"
        variant="outlined"
        size="small"
        onClick={() => deleteButtonClicked()}
      >Delete
      </button>
    </span>
  );
};