import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import './employeeForm.css';


function NewEmployee() {

    const { register, errors, handleSubmit, reset, setValue, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            phone_number: '',
            document_number: ''
        },
    });
    const [gender, setGender] = useState();
    const [docType, setDocType] = useState();
    const values = getValues();
    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const handleChangeDoc = (event) => {
        setDocType(event.target.value);
    };

    const onSubmit = async (data) => {

        let info = {
            "first_name": values.first_name,
            "last_name": values.last_name,
            "gender": gender,
            "email": values.email,
            "phone_number": values.phone_number,
            "address": values.address,
            "document_type": docType,
            "document_number": values.document_number
        }

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: info,
            redirect: 'follow'
    };
        console.log(info)
    await fetch("http://localhost:8000/employee/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    reset();
};

return (
    <div>
        <h2>Nuevo empleado</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Nombre"
                id="firstname"
                name="firstname"
                value={values.firstname}
                onChange={event => setValue('firstname', event.target.value, true)}
                required
                inputRef={
                    register({
                        required: { value: true, message: 'Ingrese un nombre' },
                    })
                }
            />
            <br />
            <TextField
                label="Apellido"
                id="lastname"
                name="lastname"
                required
                onChange={event => setValue('lastname', event.target.value, true)}
                inputRef={
                    register({
                        required: { value: true, message: 'Ingrese un nombre' },
                    })
                }
            />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Género</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    required
                    inputRef={
                        register({
                            required: { value: true, message: 'Ingrese un nombre' },
                        })
                    }
                >
                    <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
                    <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
                    <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                </RadioGroup>
            </FormControl>
            <br />
            <TextField
                label="Email"
                placeholder="Email"
                id="email-TF"
                name="email"
                onChange={event => setValue('email', event.target.value, true)}
                required
                inputRef={
                    register({
                        required: { value: true, message: 'Ingrese un nombre' },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo invalido!"
                        }
                    })
                }
            /> <br /><span className="error">{errors?.email?.message}</span>
            <br />
            <TextField
                label="Dirección"
                placeholder="Dirección"
                name="address"
                id="address"
                onChange={event => setValue('address', event.target.value, true)}
                inputRef={
                    register({
                        required: { value: false, message: 'Ingrese un nombre' },
                    })
                }
            /><br />
            <TextField
                label="Teléfono"
                placeholder="Teléfono"
                id="phone-TF"
                name="phone_number"
                required
                onChange={event => setValue('phone_number', event.target.value, true)}
                inputRef={
                    register({
                        required: { value: true, message: 'Ingrese un nombre' },
                        pattern: {
                            value: /^[0-9]/,
                            message: "Ingrese un número"
                        }
                    })
                }
            /> <br /><span className="error">{errors?.phone_number?.message}</span>
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de documento</FormLabel>
                <RadioGroup
                    aria-label="docType"
                    name="docType"
                    value={values.docType}
                    onChange={handleChangeDoc}
                    required
                    inputRef={
                        register({
                            required: { value: true, message: 'Ingrese un nombre' },
                        })
                    }
                >
                    <FormControlLabel value="Cedula" control={<Radio />} label="Cedula" />
                    <FormControlLabel value="Cedula de etranjeria" control={<Radio />} label="Cedula de etranjeria" />
                    <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                </RadioGroup>
            </FormControl><br />
            <TextField
                label="Documento"
                placeholder="Documento"
                id="document_number"
                name="document_number"
                required
                onChange={event => setValue('document_number', event.target.value, true)}
                inputRef={
                    register({
                        required: { value: true, message: 'Ingrese un nombre' },
                        pattern: {
                            value: /^[0-9]/,
                            message: "Ingrese un número"
                        }
                    })
                }
            /> <br /><span className="error">{errors?.document_number?.message}</span>
            <br />
            <input className="subButton" type="submit"></input>
        </form>
    </div >
);

}

export default NewEmployee