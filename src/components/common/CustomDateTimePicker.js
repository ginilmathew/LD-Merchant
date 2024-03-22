import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from "react-hook-form";
import { Avatar, Box, FormGroup, styled, Typography } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers';



const CustomDateTimePicker = ({
    fieldName,
    control,
    fieldLabel,
    error,
    values,
    disabled,
    changeValue,
    disablePast
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
                    name={fieldName}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                disabled={disabled}
                                // disablePast={'past'}
                                minDateTime={disablePast ? moment() : null}
                                maxDateTime={disablePast ? moment() :null}
                                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        height: "10px" // Set your height here.
                                    }
                                }}
                                value={values ? values : value}
                                onChange={changeValue ? (e) => changeValue(e) : onChange}
                                //onChange={(e: any) => console.log(e)}
                            />


                        </LocalizationProvider>
                    )}
                />
                {error && (
                    <p
                        role="alert"
                        style={{
                            color: "red",
                            display: "flex",
                            paddingLeft: "10px",
                            fontSize: "12px",
                        }}
                    >
                        {error?.message}
                    </p>
                )}
            </FormGroup>


        </>

    )
}

export default CustomDateTimePicker