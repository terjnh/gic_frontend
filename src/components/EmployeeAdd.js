import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const EmployeeAdd = (props) => {
    let history = useHistory();

    const [newEmployee, setNewEmployee] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        gender: 'female'
    });

    // textfields change handling
    const _handleFirstNameChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            firstName: e.target.value
        });
    }
    const _handleLastNameChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            lastName: e.target.value
        });
    }
    const _handleEmailChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            email: e.target.value
        });
    }
    const _handlePhoneNumChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            number: e.target.value
        });
    }
    const _handleGenderChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            gender: e.target.value
        })
    }

    const addNewEmployee = (newEmployee) => {
        props.addNewEmployee(newEmployee);
    }

    const routeToMain = () => {
        let pathList = `/employee/list`
        history.push(pathList);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div><h3>Adding an employee</h3></div>
            <Grid container justifyContent="flex-start">
                <div>
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        defaultValue="First Name"
                        onChange={_handleFirstNameChange}
                        inputProps={{ maxLength: 10 }}
                    /></div>
            </Grid>
            <Grid container justifyContent="flex-start">
                <div>
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        defaultValue="Last Name"
                        onChange={_handleLastNameChange}
                        inputProps={{ maxLength: 10 }}
                    /></div>
            </Grid>
            <Grid container justifyContent="flex-start">
                <div>
                    <TextField
                        required
                        id="email"
                        label="Email Address"
                        defaultValue="Email"
                        onChange={_handleEmailChange}
                    /></div>
            </Grid>
            <Grid container justifyContent="flex-start">
                <div>
                    <TextField
                        required
                        id="phoneNumber"
                        label="Phone Number"
                        defaultValue="Phone number"
                        onChange={_handlePhoneNumChange}
                    /></div>
            </Grid>

            <div>
                <br></br><br></br>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row
                    aria-label="gender"
                    defaultValue="female"
                    name="row-radio-buttons-group"
                    onChange={_handleGenderChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </div>

            <Grid container justifyContent="flex-end">
                <Button variant="outlined"
                    onClick={() => {
                        // console.log("newEmployee:", newEmployee);
                        addNewEmployee(newEmployee);
                        routeToMain();
                        window.location.reload(false);
                    }}
                >Submit</Button>
            </Grid>

        </Box>

    );
};


export default EmployeeAdd;