import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';

import api from "../api/config";
import { testAdd } from "../state/employees/EmployeeSlice";
import { getThemeProps } from "@mui/system";

const EmployeeList = (props) => {
    const employeesList = props.employees
    console.log("EmployeeList props.employees:", employeesList)

    const [employees, setEmployees] = useState(employeesList)
    const [testUser, setTestUser] = useState();

    const dispatch = useDispatch();

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
            <div>
                <p>{employee.firstName} {employee.lastName}</p>
                <p>Email: {employee.email}</p>
                <br></br>
            </div>
        );
    })

    return (
        <Container maxWidth="sm">
            <div>
                <p>~Table to contain employee list~</p>
                <p>{renderEmployeeList}</p>
                <button onClick={() => {
                    dispatch(testAdd())
                }}>test button</button>
            </div>
        </Container>

    );
};

export default EmployeeList;