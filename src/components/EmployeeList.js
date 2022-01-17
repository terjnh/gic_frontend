import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import api from "../api/config";
import { getThemeProps } from "@mui/system";
// import {
//     testAdd,
//     selectEmployees
// } from "../state/employees/EmployeeSlice";


const EmployeeList = (props) => {

    const employeesList = props.employees

    const [employees, setEmployees] = useState(employeesList)
    const [testUser, setTestUser] = useState();

    console.log("EmployeeList employees:", employees)

    // REDUX
    // const employeesState = useSelector(selectEmployees);
    // const dispatch = useDispatch();


    useEffect(() => {
        const updateEmployeesList = async () => {
            const response = await retrieveEmployeesAPI();
            console.log("response:", response);
            console.log("localStorage:", localStorage.getItem('employeeData'))
            // if (response && localStorage.getItem('employeeData')===null) {
            //     // setEmployees(employees);
            // }
            if (localStorage.getItem('employeeData') !== null) {
                console.log("employeeData(localStorage):", JSON.parse(localStorage.getItem('employeeData')));
                setEmployees(JSON.parse(localStorage.getItem('employeeData')));
            }
        };
        updateEmployeesList();
    }, [])

    const retrieveEmployeesAPI = async () => {
        const response = await api.get("/employees");
        let resData;
        if (response.status !== 200) {
            console.log("Error in retrieving employees API data")
        } else {
            resData = response.data;
            console.log("retrieveEmployeesAPI-response:", resData)
            if (localStorage.getItem('employeeData') === null) {
                setEmployees(resData);
            }
        }
        // localStorage.setItem('employeeData', resData);
        return resData;
    }

    // TESTING PURPOSES
    // const renderEmployeeList = props.employees.map((employee) => {
    //     return (
    //         <div>
    //             <p>{employee.firstName} {employee.lastName}</p>
    //             <p>Email: {employee.email}</p>
    //             <br></br>
    //         </div>
    //     );
    // });


    const renderEmployeeListAggrid = () => {
        return (
            <div className="ag-theme-alpine" style={{ height: 700, width: 1000 }}>
                <AgGridReact rowData={employees}>
                    <AgGridColumn field="firstName" sortable={true}></AgGridColumn>
                    <AgGridColumn field="lastName" sortable={true}></AgGridColumn>
                    <AgGridColumn field="email" sortable={true}></AgGridColumn>
                    <AgGridColumn field="phoneNumber" sortable={true}></AgGridColumn>
                    <AgGridColumn field="gender" sortable={true}></AgGridColumn>
                </AgGridReact>
            </div>
        );
    };


    return (
        <Container maxWidth="sm">
            <div>
                <h3>List of Employees</h3>
                <Grid>
                    <Grid container justifyContent="flex-end">
                        <Link to={{
                            pathname: `/employee/add`
                        }}>
                            <Button variant="outlined">Add new employee</Button>
                        </Link>
                    </Grid>

                    <Grid container justifyContent="center">
                        <div>{renderEmployeeListAggrid()}</div>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
};

export default EmployeeList;