import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { messagesObject } from '../Utils/Messages';
import { RegularExpressions } from '../Utils/Regex';
import SetRequiredLable from './SetRequiredLable';


interface IInput {
    type: "email" | "number" | "password" | "tel" | "text",
    error: boolean,
    required?: boolean,
    attrName: string,
    label: string,
    errorMessage: string | undefined,
    register: any
}


const InputField = (props: IInput) => {
    const { type, error, required, attrName, label, errorMessage, register } = props;

    const validators: any = {
        name: {
            value: RegularExpressions.AlphabetsOnly,
            message: messagesObject.alphabetsOnly,
        },
        email: {
            value: RegularExpressions.Email,
            message: messagesObject.email,
        },
        password: {
            value: RegularExpressions.Password,
            message: messagesObject.password,
        },
        tel:{
            value: RegularExpressions.MobileNumber,
            message: messagesObject.inValidphoneNumber,
        }
    };

    return <TextField
        {...register(attrName, {
            required: required ? messagesObject.requiredMsg : "",
            pattern: validators[attrName],
        })}
        type={type}
        error={error}
        id={attrName}
        name={attrName}
        fullWidth
        variant="standard"
        helperText={errorMessage}
        label={required ? SetRequiredLable(label) : label}
    />
}
export default InputField;