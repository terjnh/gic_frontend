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
    return resData;
  }

  const onAddNewEmployee = (newEmployee) => {
    console.log("App.js:newEmployee=", newEmployee)
    setEmployees([
      ...employees,
      employees.push(newEmployee)
    ])
    console.log("updated employees = ", employees)
  }

  return (
    <div className="App">
      <Router>
        <Container maxWidth="sm">
          <h1>Test Headerr</h1>

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
