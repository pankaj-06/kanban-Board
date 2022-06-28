import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SetRequiredLable from './SetRequiredLable';

interface IProps {
    label: string;
    required: boolean;
    value: string;
    name: string;
    options: { lable: string, value: string }[];
    onChange: (event: SelectChangeEvent) => any;
    variant?: "standard" | "filled" | "outlined";
    readonly?: boolean;
    error?: boolean;
}

export default function BasicSelect(props: IProps) {
    const {
        required,
        label,
        value,
        options,
        onChange,
        variant,
        name,
        readonly,
        error } = props;

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl error={error} fullWidth>
                <InputLabel error={error} id={`demo-simple-select-label-${label}`}>{required ? SetRequiredLable(label) : label}</InputLabel>
                <Select
                    labelId={`demo-simple-select-label-${label}`}
                    id={label}
                    value={value}
                    label={required ? SetRequiredLable(label) : label}
                    onChange={onChange}
                    name={name}
                    variant={variant || "standard"}
                    readOnly={readonly}
                >
                    {options.map((optionObj, idx) => {
                        return <MenuItem key={idx} value={optionObj.value}>{optionObj.lable}</MenuItem>;
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
