import React from 'react';
import NewEmployee from './newEmployee'
import UpdateEmployee from './updateEmployee'

function Employee(props) {
    const show = props.show
    const emp = props.employee
    if (show) {
        if (show == 'create') {
            return (
                <NewEmployee />
            )
        } else if (show == 'update') {
            return (
                <UpdateEmployee employee={emp}/>
            )
        }
    } else {
        return (
            null
        );
    }
}

export default Employee;
