import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomInput from '../common/CustomInput';
import { Grid } from '@mui/material';

const SocialMediaTab = () => {

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
    useEffect(() => {
        const disableBack = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Optionally, you can display a message or perform any other action
        };

        // Disable back navigation events
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', disableBack);

        const disableReload = (e) => {
            e.preventDefault();
            e.returnValue = ''; // For older browsers
            // Optionally, you can display a message or perform any other action
        };

        // Disable page reload
        window.addEventListener('beforeunload', disableReload);

        return () => {
            // Remove event listeners when component unmounts
            window.removeEventListener('popstate', disableBack);
            window.removeEventListener('beforeunload', disableReload);
        };
    }, []);
    return (
        <>
            <Grid item xl={6} sm={6} xs={12}>
                <CustomInput
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Facebook"
                />
            </Grid>
            <Grid item xl={6} sm={6} xs={12}>
                <CustomInput
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Tiktok"
                />
            </Grid>
            <Grid item xl={6} sm={6} xs={12}>
                <CustomInput
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Instagram"
                />
            </Grid>
            <Grid item xl={6} sm={6} xs={12}>
                <CustomInput
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Twitter (X)"
                />
            </Grid>
            <Grid item xl={6} sm={6} xs={12}>
                <CustomInput
                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="LinkedIN"
                />
            </Grid>
        </>
    )
}

export default SocialMediaTab