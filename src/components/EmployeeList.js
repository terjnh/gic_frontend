import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Container from '@mui/material/Container';

import api from "../api/config";
import { getThemeProps } from "@mui/system";
// import {
//     testAdd,
//     selectEmployees
// } from "../state/employees/EmployeeSlice";


const EmployeeList = (props) => {
    const employeesList = props.employees
    console.log("EmployeeList props.employees:", employeesList)

    const [employees, setEmployees] = useState(employeesList)
    const [testUser, setTestUser] = useState();

    // REDUX
    // const employeesState = useSelector(selectEmployees);
    // const dispatch = useDispatch();


    useEffect(() => {
        const updateEmployeesList = async () => {
            const response = await retrieveEmployeesAPI();
            if (response) {
                setEmployees(response);
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
        }
        return resData;
    }

    const renderEmployeeList = props.employees.map((employee) => {
        return (
            // <div className="ag-theme-alpine" style={{ height: 800, width: 600 }}>
            //     <AgGridReact
            //         rowData={props.employees}>
            //         <AgGridColumn field="firstName"></AgGridColumn>
            //         <AgGridColumn field="lastName"></AgGridColumn>
            //         <AgGridColumn field="email"></AgGridColumn>
            //     </AgGridReact>
            // </div>
            <div>
                <p>{employee.firstName} {employee.lastName}</p>
                <p>Email: {employee.email}</p>
                <br></br>
            </div>
        );
    });

    const renderEmployeeListAggrid = () => {
        return (
            <div className="ag-theme-alpine" style={{ height: 700, width: 600 }}>
                <AgGridReact rowData={props.employees}>
                    <AgGridColumn field="firstName" sortable={true}></AgGridColumn>
                    <AgGridColumn field="lastName" sortable={true}></AgGridColumn>
                    <AgGridColumn field="email" sortable={true}></AgGridColumn>
                </AgGridReact>
            </div>

        );
    };


    return (
        <Container maxWidth="sm">
            <div>
                <p>~Table to contain employee list~</p>
                <div>
                    <Link to={{
                        pathname: `/employee/add`
                    }}>
                        <button>Add</button>
                    </Link>
                </div>
                <div>{renderEmployeeListAggrid()}</div>

                <br></br><br></br>
                <button onClick={() => {
                    console.log("props.employees:", props.employees)
                }}>test button</button>
            </div>
        </Container>
    );
};

export default EmployeeList;