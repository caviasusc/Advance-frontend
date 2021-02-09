import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import '../App.css';
import axios from "axios"


function UpdateEmployee(props) {

    const id = props.id
    const { register, errors, handleSubmit, reset, getValues } = useForm();

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [docType, setDocType] = useState();
    const [document, setDocument] = useState();

    let values = getValues();

    const onSubmit = () => {
        try {
            const pre_info = {
                "first_name": first_name,
                "last_name": last_name,
                "gender": gender,
                "email": email,
                "phone_number": phone_number,
                "address": address,
                "document_type": docType,
                "document_number": document
            }
            var info ={};
            var x;
            for (x in pre_info) {
                if (pre_info[x]){
                    info[x] = pre_info[x]
                }
            }
            axios.put(`https://my-test-cv.herokuapp.com/employee/${id}`, info)
                .then((response) => {
                    window.alert(JSON.stringify(response.data.message));
                })
                .catch((error) => {
                    window.alert(error);
                });

        } catch (error) {
            console.log(error);
        }
        reset();
        for (const x in values){
            values[x]=null
        }
    }

    return (
        <div>
            <h2>Editar empleado</h2>
            <h4>Solo llene los campos necesarios</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Nombre"
                    id="first_name"
                    name="first_name"
                    onInput={event => { setFirstName(event.target.value) }}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
                        })
                    }
                />
                <br />
                <TextField
                    label="Apellido"
                    id="last_name"
                    name="last_name"
                    onChange={event => setLastName(event.target.value)}
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
                        onChange={event => setGender(event.target.value)}
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
                    id="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
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
                    name="address"
                    id="address"
                    onChange={event => setAddress(event.target.value)}
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
                    onChange={event => setPhoneNumber(event.target.value)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
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
                        onChange={event => setDocType(event.target.value)}
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
                    id="document_number"
                    name="document_number"
                    onChange={event => setDocument(event.target.value)}
                    inputRef={
                        register({
                            required: { value: false, message: 'Ingrese un nombre' },
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

export default UpdateEmployee