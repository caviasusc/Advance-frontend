import React from 'react';
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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

const currencies = [
    {
        value: 1,
        label: 'Hombre',
    },
    {
        value: 2,
        label: 'Mujer',
    },
    {
        value: 3,
        label: 'Otro',
    },

];

function NewEmployee() {
    const classes = useStyles();
    const sumbit = async ()=>{
        console.log('creado')
    }
    return (
        <div>
            <FormControl className={classes.formControl}>
                <h3>Ingrese los datos del empleado</h3>
                <TextField
                    label="Nombre"
                    placeholder="Nombre"
                    id="name-TF"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Apellido"
                    placeholder="Apellido"
                    id="lastname-TF"
                    variant="outlined"
                    required
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    helperText="por favor selecione su genero"
                    required
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Email"
                    placeholder="Email"
                    id="email-TF"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Dirección"
                    placeholder="Dirección"
                    id="name-TF"
                    variant="outlined"
                />
                <TextField
                    label="Teléfono"
                    placeholder="Teléfono"
                    id="lastname-TF"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Tipo de documento"
                    placeholder="Tipo de documento"
                    id="name-TF"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Documento"
                    placeholder="Documento"
                    id="lastname-TF"
                    variant="outlined"
                    required
                />
                <Button variant="outlined" color="primary" onClick={()=>sumbit()}>Crear</Button>
            </FormControl>
        </div>
    );
}
function UpdateEmployee() {
    return (
        <div>
            <form>
                <h2>Ingrese datos del usuario</h2>
                <h3>para editar</h3>
            </form>
        </div>
    );
}

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
