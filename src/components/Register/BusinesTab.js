import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomInput from '../common/CustomInput';
import { Grid } from '@mui/material';
import CustomImageUploader from '../common/CustomImageUploder';
const BusinesTab = () => {

    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);

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

    const ImageUploderCompany = () => {

    }
    const ImageUploderCover = () => {

    }

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
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Business Name"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Established Date"
                />
            </Grid>
            <Grid item xl={4} sm={6} xs={12}>
                <CustomInput

                    readonly={false}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    fieldLabel="Company Representative"
                />
            </Grid>
            <Grid item xl={4} xs={12}>
                <CustomImageUploader
                    ICON={""}
                    hide={false}
                    viewImage={companyLogoPreview}
                    error={errors.photo}
                    fieldName="photo"
                    placeholder={``}
                    fieldLabel={"Company Logo"}
                    control={control}
                    height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                    max={5}
                    onChangeValue={ImageUploderCompany}
                    preview={imagefileCmpny}
                    previewEditimage={""}
                    type={"file"}
                    background="#e7f5f7"
                    myid="contained-button-file"
                    width={'100%'}
                />
            </Grid>
            <Grid item xl={8} xs={12}>
                <CustomImageUploader
                    ICON={""}
                    hide={false}
                    viewImage={coverPreview}
                    error={errors.photo}
                    fieldName="photo"
                    placeholder={``}
                    fieldLabel={"Cover Picture"}
                    control={control}
                    height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                    max={5}
                    onChangeValue={ImageUploderCover}
                    preview={imagefileCover}
                    previewEditimage={""}
                    type={"file"}
                    background="#e7f5f7"
                    myid="contained-button-file"
                    width={'100%'}
                />
            </Grid>
        </>
    )
}

export default BusinesTab