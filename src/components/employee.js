import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NewEmployee from './newEmployee'
import UpdateEmployee from './updateEmployee'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    TextField: {
        margin: 5,
    }
}));

function Employee(props) {
    const show = props.show
    const id = props.id
    if (show) {
        if (show == 'create') {
            return (
                <NewEmployee />
            )
        } else if (show == 'update') {
            return (
                <UpdateEmployee />
            )
        }
    } else {
        return (
            null
        );
    }
}

export default Employee;
