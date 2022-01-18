import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Routes, Switch, Route, BrowserRouter } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import api from "../api/config";
import EmployeeList from './EmployeeList';
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import '../App.css';

function App() {
  const [employees, setEmployees] = useState([]);

  // Upon page refresh, we will retrieve all employees from the mock API
  useEffect(() => {
    const getAllEmployees = async () => {
      const allEmployees = await retrieveEmployeesAPI();
      if (allEmployees) {
        setEmployees(allEmployees);
      }
      if (localStorage.getItem('employeeData') !== null) {
        setEmployees(JSON.parse(localStorage.getItem('employeeData')));
      }
    };
    getAllEmployees();
  }, []);

  const retrieveEmployeesAPI = async () => {
    const response = await api.get("/employees");
    let resData;
    if (response.status !== 200) {
      console.log("Error in retrieving employees API data")
    } else {
      resData = response.data;
      // console.log("retrieveEmployeesAPI-response:", resData)
    }
    if (JSON.parse(localStorage.getItem('employeeData')) === null) {
      localStorage.setItem('employeeData', JSON.stringify(resData))
    }
    return resData;
  }

  // 'employees' state for display is handled in EmployeeList.js
  const onAddNewEmployee = (newEmployee) => {
      let localEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
      localEmployeeData.push(newEmployee);

      // Update local storage
      localStorage.setItem('employeeData', JSON.stringify(localEmployeeData))
  }




  // FOR EDIT
  // setEmployees(employees => {
  //   employees.map((item, j) => {
  //     console.log("item: ", item, "|| j:", j)
  //   });
  // })
  const onEditEmployee = (rowSelected, employee) => {
    // Update employees state & overwrite array index in localStorage
    let localEmployeeData = JSON.parse(localStorage.getItem('employeeData'));

    console.log("Edit this (prev):", localEmployeeData[rowSelected])
    console.log("Replace with (new):", employee)

    localEmployeeData[rowSelected] = employee;
    localStorage.setItem('employeeData', JSON.stringify(localEmployeeData));
    console.log("localEmployeeData(updated):", localEmployeeData)
  }


  return (
    <div className="App">
      <Router>
        <Container maxWidth="sm">
          <h1 className="App-header2">Persistent Header</h1>

          <Grid container justifyContent="center">
            <Link to={{
              pathname: `/employee/list`
            }}>
              <Button variant="contained">View list of employees</Button>
            </Link>
          </Grid>

          <Switch>
            <Route
              path="/employee/list"
              exact
              render={(props) => (
                <EmployeeList
                  {...props}
                  employees={employees}
                />
              )}
            />
            <Route
              path="/employee/add"
              exact
              render={(props) => (
                <EmployeeAdd
                  {...props}
                  addNewEmployee={onAddNewEmployee}
                />
              )}
            />
            <Route
              path="/employee/edit"
              exact
              render={(props) => (
                <EmployeeEdit
                  {...props}
                  employees={employees}
                  editEmployee={onEditEmployee}
                />
              )}
            />

          </Switch>


        </Container>
      </Router>
    </div>
  );
}

export default App;
