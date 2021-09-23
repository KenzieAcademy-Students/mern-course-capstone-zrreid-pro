import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './CustomDatePicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker() {
    const [ date, setDate ] = useState(new Date());
    return (
        <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)} 
            isClearable
        />
    );
    
}