import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from "react-hook-form";
import { Avatar, Box, FormGroup, styled, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs from 'dayjs';



const CustomDatePicker = ({
  fieldName,
  control,
  fieldLabel,
  error,
  values,
  disabled,
  changeValue,
}) => {
  const tomorrow = dayjs().add(1, 'day');
  return (
    <>
      <FormGroup>

        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field: { value, onChange, onBlur } }) => (
            <LocalizationProvider dateAdapter={ AdapterMoment }>
              <DatePicker
                // disablePast
                label={ fieldLabel }
                slotProps={{
                  actionBar: {
                    actions: ['clear']
                  }
                }}
                format='DD/MM/YYYY'
                disabled={ disabled }
                sx={ {
                  "& .MuiInputBase-input": {
                    height: "13px",
                    borderRadius: '10px'
                    // Set your height here.
                  },
                  backgroundColor: "#fff",

                } }

                value={ values ? values : value }
                onChange={ changeValue ? (e) => changeValue(e) : onChange }
              />


            </LocalizationProvider>
          ) }
        />
        { error && (
          <p
            role="alert"
            style={ {
              color: "red",
              display: "flex",
              paddingLeft: "10px",
              fontSize: "12px",
            } }
          >
            { error?.message }
          </p>
        ) }
      </FormGroup>


    </>

  )
}

export default CustomDatePicker