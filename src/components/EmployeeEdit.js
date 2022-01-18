import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import EditBtnEmployeeList from "./EditBtnEmployeeList";

const EmployeeEdit = (props) => {
    let history = useHistory();

    const rowSelected = props.location.state.rowSelected

    const { firstName,
        lastName,
        email,
        number,
        gender } = props.employees[rowSelected];

    const [employee, setEmployee] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        gender: ''
    })

    const populateEmployeeDetails = () => {
        setEmployee(JSON.parse(localStorage.getItem('employeeData'))[rowSelected]);
    };

    useEffect(() => {
        populateEmployeeDetails();
    }, [props.employees[rowSelected]]) // only re-run on employee change


    // textfields change handling
    const _handleFirstNameChange = (e) => {
        setEmployee({
            ...employee,
            firstName: e.target.value
        });
        console.log("employeeeee:", employee)
    }
    const _handleLastNameChange = (e) => {
        setEmployee({
            ...employee,
            lastName: e.target.value
        });
    }
    const _handleEmailChange = (e) => {
        setEmployee({
            ...employee,
            email: e.target.value
        });
    }
    const _handlePhoneNumChange = (e) => {
        setEmployee({
            ...employee,
            number: e.target.value
        });
    }
    const _handleGenderChange = (e) => {
        setEmployee({
            ...employee,
            gender: e.target.value
        })
    }

    const editEmployee = (rowSelected, employee) => {
        props.editEmployee(rowSelected, employee);
    }

    const routeToMain = () => {
        let pathList = `/employee/list`
        history.push(pathList);
    }

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <div><h3>Editing an employee</h3></div>
                <Grid container justifyContent="flex-start">
                    <div>
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            defaultValue={firstName}
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
                            defaultValue={lastName}
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
                            defaultValue={email}
                            onChange={_handleEmailChange}
                        /></div>
                </Grid>
                <Grid container justifyContent="flex-start">
                <div>
                    <TextField
                        required
                        id="number"
                        label="Phone Number"
                        defaultValue={number}
                        onChange={_handlePhoneNumChange}
                    /></div>
            </Grid>

            <div>
                <br></br><br></br>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row
                    aria-label="gender"
                    defaultValue={gender}
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
                        console.log("editedEmployee:", employee);
                        editEmployee(rowSelected, employee);
                        routeToMain();
                        window.location.reload(false);
                    }}
                >Confirm Edit</Button>
            </Grid>

            </Box>
        </div>
    );
};

export default EmployeeEdit;