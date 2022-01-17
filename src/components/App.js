import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Switch, Route, useHistory, Link, BrowserRouter } from "react-router-dom";
import Container from '@mui/material/Container';

import api from "../api/config";
import EmployeeList from './EmployeeList';
import EmployeeAdd from "./EmployeeAdd";
import '../App.css';

function App() {
  console.log("App.js init...")

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
      console.log("retrieveEmployeesAPI-response:", resData)
    }
    if (JSON.parse(localStorage.getItem('employeeData')) === null) {
      localStorage.setItem('employeeData', JSON.stringify(resData))
    }
    return resData;
  }

  const onAddNewEmployee = (newEmployee) => {
    if (JSON.parse(localStorage.getItem('employeeData') === null)) {
      setEmployees([
        ...employees,
        employees.push(newEmployee)
      ]);
    }
    else {
      let localEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
      setEmployees([
        ...localEmployeeData,
        localEmployeeData.push(newEmployee)
      ])
      localStorage.setItem('employeeData', JSON.stringify(localEmployeeData))
    }
  }

  return (
    <div className="App">
      <Router>
        <Container maxWidth="sm">
          <h1 className="App-header2">Persistent Header</h1>

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
          </Switch>


        </Container>
      </Router>
    </div>
  );
}

export default App;
