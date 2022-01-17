import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const EmployeeAdd = (props) => {

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: ''
    });

    // textfields change handling
    const _handleFirstNameChange = (e) => {
        setValues({
            ...values,
            firstName: e.target.value });
    }
    const _handleLastNameChange = (e) => {
        setValues({
            ...values,
            lastName: e.target.value });
    }
    const _handleEmailChange = (e) => {
        setValues({
            ...values,
            email: e.target.value });
    }
    const _handlePhoneNumChange = (e) => {
        setValues({
            ...values,
            phoneNumber: e.target.value });
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div><h2>Adding an employee</h2></div>
            <div>
                <TextField
                    required
                    id="firstName"
                    label="First Name"
                    defaultValue="First Name"
                    onChange={_handleFirstNameChange}
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    defaultValue="Last Name"
                    onChange={_handleLastNameChange}
                    inputProps={{ maxLength: 10 }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="email"
                    label="Email Address"
                    defaultValue="Email"
                    onChange={_handleEmailChange}
                />
            </div>
            <div>
                <TextField
                    required
                    id="phoneNumber"
                    label="Phone Number"
                    defaultValue="Phone number"
                    onChange={_handlePhoneNumChange}
                />
            </div>

            <div>
                <br></br><br></br>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </div>

            <Grid container justifyContent="flex-end">
                <Button variant="outlined"
                    onClick={() => console.log("values:", values)}
                >Submit</Button>
            </Grid>

        </Box>

    );
};


export default EmployeeAdd;