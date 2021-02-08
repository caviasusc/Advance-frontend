import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import '../App.css';


function UpdateEmployee(props) {

    const id = props.id
    const { register, errors, handleSubmit, reset, setValue, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phone_number: '',
            doc: ''
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

        // console.log(values, gender, docType)

        var info;
        for (const pr in values){
            if (values[pr]=='') info[pr]=values.pr
        }
        var requestOptions = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: info,
            redirect: 'follow'
        };

        await fetch(`https://my-test-cv.herokuapp.com/employee/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        reset();
    };

    return (
        <div>
            <h2>Editar empleado</h2>
            <h4>Solo llene los campos necesarios</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Nombre"
                    id="firstname"
                    name="firstname"
                    value={values.firstname}
                    onChange={event => setValue('firstname', event.target.value, true)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
                        })
                    }
                />
                <br />
                <TextField
                    label="Apellido"
                    id="lastname"
                    name="lastname"
                    onChange={event => setValue('lastname', event.target.value, true)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
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
                        inputRef={
                            register({
                                required: { value: false, message: 'Ingrese un nombre' },
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
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
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
                    id="address"
                    name="address"
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
                    id="phone_number"
                    name="phone_number"
                    onChange={event => setValue('phone_number', event.target.value, true)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
                        })
                    } />
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
                                required: { value: false, message: 'Ingrese un nombre' },
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
                    id="document"
                    name="document"
                    onChange={event => setValue('doc', event.target.value, true)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
                            pattern: {
                                value: /^[0-9]/,
                                message: "Ingrese un número"
                            }
                        })
                    }
                />
                <br />
                <input className="subButton" type="submit" ></input>
            </form>
        </div >
    );

}

export default UpdateEmployee