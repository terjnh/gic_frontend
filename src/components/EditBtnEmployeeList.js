import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import BasicModal from "../modal/basicModal";
import "../App.css"

const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default (props) => {
  let history = useHistory();
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;


  // Modal - Delete
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { firstName, lastName } = props.data

  const editButtonClicked = () => {
    console.log("EditBtn--rowindex:", props.rowIndex)
    let editPath = `/employee/edit`;
    history.push({
      pathname: editPath,
      state: { rowSelected: props.rowIndex }
    });
  };

  const deleteButtonClicked = () => {
    // alert(`Delete clicked!`);
    console.log("DelBtn, rowIndex:", props.rowIndex)
    let listPath = `/employee/list`;
    history.push({
      pathname: listPath,
      state: { rowSelected: props.rowIndex }
    })
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
        onClick={() => {
          deleteButtonClicked()
          handleOpen();
        }}
      >Delete
      </button>


      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Employee
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure that you would like to delete employee
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {firstName} {lastName}?
            </Typography>
            <br></br>
            <Button variant="contained"
            onClick={() => {
              handleClose();
              window.location.reload(false);
            }}>
              Confirm Delete
            </Button>
          </Box>

        </Modal>
      </div>
    </span>
  );
};