import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { TextField, FormControl } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import '../App.css';
import axios from "axios"


function UpdateEmployee(props) {

    const employee = props.employee
    const { register, errors, handleSubmit, reset, getValues } = useForm();

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [gender=employee.gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [docType=employee.document_type, setDocType] = useState();
    const [document, setDocument] = useState();

    let values = getValues();

    const onSubmit = () => {
        try {
            const pre_info = {
                "first_name": first_name,
                "last_name": last_name,
                "gender": gender==employee.gender ? null : gender,
                "email": email,
                "phone_number": phone_number,
                "address": address,
                "document_type": docType == employee.document_type ? null : docType,
                "document_number": document
            }
            var info ={};
            var x;
            for (x in pre_info) {
                if (pre_info[x]){
                    info[x] = pre_info[x]
                }
            }
            axios.put(`https://my-test-cv.herokuapp.com/employee/${employee.employee_id}`, info)
                .then((response) => {
                    window.alert(JSON.stringify(response.data.message));
                })
                .catch((error) => {
                    window.alert(error);
                });
            reset();
            for (const x in values) {
                values[x] = null
            }

        } catch (error) {
            console.log(error);
        }
       
    }

    return (
        <div>
            <h2>Editar empleado</h2>
            <h4>Solo llene los campos necesarios</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Nombre"
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.first_name}
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
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.last_name}
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
                        value={gender}
                        onClick={event => {setGender(event.target.value)}}
                    >
                        <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
                        <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
                        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                    </RadioGroup>
                </FormControl>
                <br />
                <TextField
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.email}
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
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.address}
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
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.phone_number.toString()}
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
                        value={docType}
                        onChange={event => setDocType(event.target.value)}
                    >
                        <FormControlLabel value="Cedula" control={<Radio />} label="Cedula" />
                        <FormControlLabel value="Cedula de etranjeria" control={<Radio />} label="Cedula de extranjeria" />
                        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                    </RadioGroup>
                </FormControl><br />
                <TextField
                    label="Documento"
                    InputLabelProps={{ shrink: true }}
                    placeholder={employee.document_number.toString()}
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