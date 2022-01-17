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
                    id="outlined-required"
                    label="First Name"
                    defaultValue="First Name"
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue="Last Name"
                    inputProps={{ maxLength: 10 }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Email Address"
                    defaultValue="Email"
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Phone Number"
                    defaultValue="Phone number"
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
                <Button variant="outlined">Submit</Button>
            </Grid>

        </Box>

    );
};


export default EmployeeAdd;