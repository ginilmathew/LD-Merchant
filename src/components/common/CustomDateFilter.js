import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from "react-hook-form";
import { Avatar, Box, FormGroup, styled, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs from 'dayjs';
import { COLOURS } from '../../assets/COLORS';



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
      <Typography letterSpacing={.5} px={'3px'} mb={'1px'}
                    sx={{
                        fontSize: {
                            lg: 16,
                            md: 14,
                            sm: 12,
                            xs: 11,
                        },
                        fontFamily:'Outfit-Medium' ,
                    }}
                >{fieldLabel}
                </Typography>
        <Controller
          name={ fieldName }
          control={ control }
          render={ ({ field: { value, onChange, onBlur } }) => (
            <LocalizationProvider dateAdapter={ AdapterMoment }>
              <DatePicker
                // disablePast
                // label={ fieldLabel }
                slotProps={{
                
                  actionBar: {
                    actions: ['clear']
                  }
                }}
                format='DD/MM/YYYY'
                disabled={ disabled }
                sx={ {
            
                  "& .MuiInputBase-input": {
                    height: "10px",
                    background: COLOURS.table,
                    border:'none',
                    borderRadius: '10px'
                    // Set your height here.
                  },
              

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