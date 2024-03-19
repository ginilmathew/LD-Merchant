import React, { useState } from 'react'
import CustomBackArrow from '../../components/common/CustomBackArrow'
import { Box, Grid, Typography } from '@mui/material'
import CustomInput from '../../components/common/CustomInput'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomImageUploader from '../../components/common/CustomImageUploder';
import CustomProfileImageUploader from '../../components/common/CustomProfileImage';
import CustomButton from '../../components/common/CustomButton';
import CustomInputPassword from '../../components/common/CustomInputPassword';
import CustomTitle from '../../components/common/CustomTitle';

const ProfileScreen = () => {

    const [imagePreview, setImagePreview] = useState(null);
    const [imagefile, setImagefile] = useState(null);
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


    const imageUploder = (file) => {
        if (file.size <= 1000000) {
            setImagefile(file)
            setImagePreview(null)
            setValue('image', file)
            setError('image', { message: '' })

        } else {
            setImagePreview(null)
            setImagefile(null)
            // toast.warning('Image should be less than or equal 1MB')
        }
    }
    return (
        <Box px={5} py={2}>
            <CustomBackArrow back={true} label={'Profile'} />

            <Grid container spacing={2} px={10}>
                <Grid item md={3} sm={12} xs={12} xl={3} lg={3}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} flexDirection={'column'}>
                        <CustomProfileImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={imagePreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={""}
                            control={control}
                            height={{ xl: 300, lg: 280, md: 250, sm: 200, xs: 160 }}
                            max={5}
                            onChangeValue={imageUploder}
                            preview={imagefile}
                            previewEditimage={""}
                            type={"file"}
                            background="#e7f5f7"
                            myid="contained-button-file"
                            width={{ xl: 300, lg: 280, md: 250, sm: 200, xs: 160 }}
                        />

                    </Box>
                </Grid>

                <Grid item xs={12} xl={9} lg={9} md={9} sm={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Username"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Email Address"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Mobile Number"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Last Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="DOB"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="name"
                                fieldLabel="Designation"
                            />
                        </Grid>

                    </Grid>


                </Grid>
            </Grid>

            {/* ***************************************************************************** */}
            <Box mt={10} px={10}>
                <Box sx={{ my: 3, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}>
                </Box>
                <CustomTitle label={'Business Details'} />
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Business Name"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Established Date"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Company Representative"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6} />

                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={companyLogoPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Post Image"}
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
                    <Grid item xs={12} lg={6} xl={6} md={6} sm={6}>
                        <CustomImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={coverPreview}
                            error={errors.photo}
                            fieldName="photo"
                            placeholder={``}
                            fieldLabel={"Prize Image"}
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
                </Grid>


                {/* *********************************************************/}
                <Box sx={{ my: 3, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}>
                </Box>
                <CustomTitle label={'Social Media Links'} />
                <Grid container spacing={4}>


                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Facebook"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Tiktok"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Instagram"
                        />
                    </Grid>

                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Twitter (X)"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="LinkedIN"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={'flex'} justifyContent={'center'} py={3}>
                            <CustomButton isIcon={false} label={'Update'} width={{ xl: '20%', lg: '20%', md: '25%', sm: '60%', xs: '100%' }} />
                        </Box>
                    </Grid>
                </Grid>

                {/* ************************************************************************************************* */}

                <Box sx={{ my: 3, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}>
                </Box>
                <CustomTitle label={'Change Password'} />
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6}>
                        <CustomInputPassword
                            type={'password'}
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Confirm Password"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6}>
                        <CustomInputPassword
                            type={'password'}
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Confirm Password"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInputPassword
                            type={'password'}
                            readonly={false}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            fieldLabel="Confirm Password"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box display={'flex'} py={3}>
                            <CustomButton isIcon={false} label={'Update'} width={{ xl: '20%', lg: '20%', md: '25%', sm: '60%', xs: '100%' }} />

                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Box>

    )
}

export default ProfileScreen