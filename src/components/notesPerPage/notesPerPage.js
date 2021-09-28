'use strict';
// import {FormControl,InputLabel,Select} from '@mui/material/Button';
// import Select from '@mui/material/Select';
// or
// import FormControl from '@mui/material/FormControl';
// import FormControl from '@mui/material/FormControl';
// or
import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/setting/context';

import { FormControl,InputLabel,Select,MenuItem } from '@mui/material';
const store = require('store')

const NotesPerPage = (props) => {
    const settings = useContext(SettingsContext);
    const handleChange=(e)=>{
       let number=e.target.value
        console.log(number);
        settings.setItemNumber(number)
        store.set('number',number)
        props.setEndPage(number)
    
}
    return (
        <FormControl fullWidth style={{marginTop: "50px"}} >
            <InputLabel id="demo-simple-select-label">Number of List</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={settings.itemNumber}
                label="content"
                onChange={handleChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
        </FormControl>
    )
}
export default NotesPerPage