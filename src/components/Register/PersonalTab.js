import { Grid } from '@mui/material'
import React from 'react'
import CustomInput from '../common/CustomInput'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomLoginInput from '../common/CustomLoginInput';
import CustomInputPassword from '../common/CustomInputPassword';

const PersonalTab = () => {

    const schema = object().shape({


    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });
    return (
        <>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Username"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Email Address"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Mobile Number"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="First Name"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Last Name"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="DOB"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Designation"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInputPassword
                    type={'password'}
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Password"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInputPassword
                    type={'password'}
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Confirm Password"
                />
            </Grid>

        </>

    )
}

export default PersonalTab