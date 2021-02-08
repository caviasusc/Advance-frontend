import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import '../App.css';


function UpdateEmployee() {

    const { register, errors, handleSubmit, reset, setValue, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phone_number: '',
            doctype: '',
            doc: ''
        },
    });
    const [gender, setGender] = useState();
    const values = getValues();
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const onSubmit = async (data) => {

        console.log(values, gender)
        reset();
    };

    const create = async () => {

        console.log(values, gender)
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
                            required: { value: true, message: 'Ingrese un nombre' },
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
                    id="address-TF"
                    onChange={event => setValue('address', event.target.value, true)}
                /><br />
                <TextField
                    label="Teléfono"
                    placeholder="Teléfono"
                    id="phone-TF"
                    name="phone"
                    onChange={event => setValue('phone', event.target.value, true)}
                    inputRef={
                        register({
                            required: { value: true, message: 'Ingrese un nombre' },
                        })
                    } />
                <br />
                <TextField
                    label="Tipo de documento"
                    placeholder="Tipo de documento"
                    id="doctype-TF"
                    onChange={event => setValue('docType', event.target.value, true)}

                /><br />
                <TextField
                    label="Documento"
                    placeholder="Documento"
                    id="doc-TF"
                    onChange={event => setValue('doc', event.target.value, true)}

                />
                <br />
                <input className="subButton" type="submit" ></input>
            </form>
        </div >
    );

}

export default UpdateEmployee