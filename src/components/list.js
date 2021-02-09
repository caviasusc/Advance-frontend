import React, { useEffect, useState } from "react";
import { TableContainer, Table, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './list.css';
import axios from "axios";

const useStyles = makeStyles({
  TableContainer: {
    width:700,
  },
  table: {
    width: 650,
  },
});

function List(props) {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        const requestat = 'https://my-test-cv.herokuapp.com/employee/all';
        const response = await (await fetch(requestat)).json()
        setEmployeeList(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEmployeeList();
  }, []);
  const delEmp = async(id)=>{
    var isDelete = window.confirm("¿Esta seguro(a) de eliminar a este usuario?");
    if (isDelete){
    console.log('eliminar empleados con id', id)
    try{
      axios.delete(`https://my-test-cv.herokuapp.com/employee/${id}`)
        .then((response) => {
          window.alert(JSON.stringify(response.data.message));
        })
        .catch((error) => {
          window.alert(error);
        });
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('ok')
    }
}  
  const classes = useStyles(); 

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table}>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
       <tbody className="prop-list">
         {employeeList.map(emp=>(
           <tr key={emp.employee_id}>
             <td>{emp.document_number}</td>
             <td>{emp.first_name}</td>
             <td>{emp.last_name}</td>
             <td>{emp.phone_number}</td>
             <td><Button variant="outlined" color="primary" onClick={()=>props.edit(emp)}>Editar</Button></td>
             <td><Button variant="outlined" color="primary" onClick={() => delEmp(emp.employee_id)}>x</Button></td>
           </tr>
         ))}
       </tbody>
      </Table>
    </TableContainer>
    );
}


export default List;