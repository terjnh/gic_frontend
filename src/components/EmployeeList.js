import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import * as agGrid from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import api from "../api/config";
import { getThemeProps } from "@mui/system";
import EditBtn from "./EditBtnEmployeeList";


const EmployeeList = (props) => {

    const employeesList = props.employees

    const [employees, setEmployees] = useState(employeesList)
    const [testUser, setTestUser] = useState();

    const [rowSelected, setRowSelected] = useState();


    // useEffect(() => {
    //     if (props.location.state !== undefined) {
    //         setRowSelected(props.location.state.rowSelected);
    //         console.log("row selected....", rowSelected)

    //         // if(rowSelected!==undefined) {
    //         //     let employeeData = JSON.parse(localStorage.getItem('employeeData'));
    //         //     employeeData.splice(rowSelected, 1);
    //         //     localStorage.setItem('employeeData', JSON.stringify(employeeData));
    //         // }
    //     }
    // }, [rowSelected])

    useEffect(() => {
        const updateEmployeesList = async () => {
            const response = await retrieveEmployeesAPI();
            if (response && localStorage.getItem('employeeData') === null) {
                // setEmployees(employees);
            }
            if (localStorage.getItem('employeeData') !== null) {
                let employeeData = JSON.parse(localStorage.getItem('employeeData'));
                setEmployees(employeeData);
            }
        };
        updateEmployeesList();
    }, [employees])

    const retrieveEmployeesAPI = async () => {
        const response = await api.get("/employees");
        let resData;
        if (response.status !== 200) {
            console.log("Error in retrieving employees API data")
        } else {
            resData = response.data;
            // console.log("retrieveEmployeesAPI-response:", resData)
            if (localStorage.getItem('employeeData') === null) {
                setEmployees(resData);
            }
        }
        return resData;
    }

    // For testing purposes
    // const renderEmployeeListAggrid = () => {
    //     return (
    //         <div className="ag-theme-alpine" style={{ height: 700, width: 1000 }}>
    //             <AgGridReact rowData={employees}>
    //                 <AgGridColumn field="firstName" sortable={true}></AgGridColumn>
    //                 <AgGridColumn field="lastName" sortable={true}></AgGridColumn>
    //                 <AgGridColumn field="email" sortable={true}></AgGridColumn>
    //                 <AgGridColumn field="number" sortable={true}></AgGridColumn>
    //                 <AgGridColumn field="gender" sortable={true}></AgGridColumn>
    //             </AgGridReact>
    //         </div>
    //     );
    // };




    const RenderEmployeeListAggrid = () => {
        const [gridApi, setGridApi] = useState(null);
        const [gridColumnApi, setGridColumnApi] = useState(null);
        const [rowData, setRowData] = useState(null);

        // setRowData(employees);

        const onGridReady = (params) => {
            console.log("params:", params)
            setGridApi(params.api);
            setGridColumnApi(params.columnApi);

            const updateData = (employees) => {
                setRowData(employees);
                console.log("data:", employees)
            };
        };
        return (
            <div style={{ width: 1000, height: 700 }}>
                <div
                    id="myGrid"
                    style={{ width: 1000, height: 700, }}
                    className="ag-theme-alpine">
                    <AgGridReact
                        frameworkComponents={{
                            editBtn: EditBtn,
                        }}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: 100,
                            filter: true,
                            resizable: true,
                        }}
                        // onGridReady={onGridReady}
                        rowData={employees}
                    >
                        <AgGridColumn field="firstName" maxWidth={150} />
                        <AgGridColumn field="lastName" maxWidth={150} />
                        <AgGridColumn field="email" />
                        <AgGridColumn field="number" maxWidth={150} />
                        <AgGridColumn field="gender" maxWidth={120} />
                        <AgGridColumn
                            field="actions"
                            editable="false"
                            maxWidth={180}
                            cellRenderer="editBtn"
                        />
                    </AgGridReact>
                </div>
            </div>
        );
    };



    return (
        // <Container maxWidth="sm">
        <div>
            <h3>List of Employees</h3>
            <Link to={{
                pathname: `/employee/add`
            }}>
                <button className="Add-emp-button">Add new employee</button>
            </Link>

            <Grid container justifyContent="center">
                <div>{RenderEmployeeListAggrid()}</div>
            </Grid>

        </div>
        // </Container >
    );
};

export default EmployeeList;