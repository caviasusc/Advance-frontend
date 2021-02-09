import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { TextField, FormControl } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import './employeeForm.css';
import axios from "axios";


function NewEmployee() {

    const { register, errors, handleSubmit, reset} = useForm();

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [docType, setDocType] = useState();
    const [document, setDocument] = useState();

    const onSubmit = () => {

        try {
        const info = {
            "first_name": first_name,
            "last_name": last_name,
            "gender": gender,
            "email": email,
            "phone_number": phone_number,
            "address": address,
            "document_type": docType,
            "document_number": document
        }

        console.log(info)
            axios.post('https://my-test-cv.herokuapp.com/employee/', info)
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
    }


    return (
        <div>
            <h2>Nuevo empleado</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Nombre"
                    id="first_name"
                    name="first_name"
                    onInput={event=>{setFirstName(event.target.value)}}
                    required
                    margin= "dense"
                    inputRef={
                        register({
                            required: { value: true, message: 'Ingrese un nombre' },
                        })
                    }
                />
                <br />
                <TextField
                    label="Apellido"
                    id="last_name"
                    name="last_name"
                    required
                    onChange={event => setLastName(event.target.value)}
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
                        onChange={event => setGender(event.target.value)}
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
                    id="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
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
                    id="phone_number"
                    name="phone_number"
                    required
                    onChange={event => setPhoneNumber(event.target.value)}
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
                        onChange={event => setDocType(event.target.value)}
                        required
                        inputRef={
                            register({
                                required: { value: true, message: 'Ingrese un nombre' },
                            })
                        }
                    >
                        <FormControlLabel value="Cedula" control={<Radio />} label="Cedula" />
                        <FormControlLabel value="Cedula de etranjeria" control={<Radio />} label="Cedula de extranjeria" />
                        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                    </RadioGroup>
                </FormControl><br />
                <TextField
                    label="Documento"
                    placeholder="Documento"
                    id="document_number"
                    name="document_number"
                    required
                    onChange={event => setDocument(event.target.value)}
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