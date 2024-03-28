import React, { useEffect, useState } from 'react'
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateProfilePassword, getProfile, updateProfile } from '../../api/profile';
import { IMG_URL } from '../../config';
import { useSnackbar } from '../../hooks/SnackBarHook';
import CustomDatePicker from '../../components/common/CustomDateFilter';
import moment from 'moment';
import { userStore } from '../../store/user';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const ProfileScreen = () => {
    const updateUser = userStore((state) => state.updateuser)
    const showSnackbar = useSnackbar();
    const queryClient = useQueryClient();
    const [currentButton, setCurrentButton] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imagefile, setImagefile] = useState(null);
    const [companyLogoPreview, setcompanyLogoPreview] = useState(null);
    const [imagefileCmpny, setImagefileCmpny] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);
    const [dob, setDob] = useState(null)
    const [exstablished, setExtablished] = useState(null)


    const { data, isError, isLoading, isFetched, refetch } = useQuery(
        {
            queryKey: ['profile'],
            queryFn: getProfile
        });



    useEffect(() => {
        if (data?.data?.data) {
            let payload = data?.data?.data;
            const newObject = { ...payload["company"], ...payload };
            delete newObject["company"];
            setDob(newObject?.dob ? moment(newObject?.dob) : null)
            setValue('id',newObject?.id)
            setExtablished(newObject?.established_date ? moment(newObject?.established_date) : null)
            reset(newObject);
            setImagePreview(IMG_URL + newObject?.image);
            setcompanyLogoPreview(IMG_URL + newObject?.logo)
            setcoverPreview(IMG_URL + newObject?.cover_image)
        }
    }, [data?.data?.data])




    const commonSchema = object().shape({
        first_name: yup.string().required('required'),
        email: yup.string().required('Email is required').email('Invalid email address').required('required'),
        mobile: yup.string().nullable().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number'),
    });

    const passwordSchema = object().shape({
        old_password: yup.string().required('Current Password is required'),
        password: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
        password_confirmation: yup.string()
            .required('Confirm New Password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        reset,
        formState: { errors }
    } = useForm({
        resolver:currentButton === 'password' ? yupResolver(passwordSchema) : yupResolver(commonSchema),

    });


    
    const ImageUploderCompany = (file) => {
        if (file.size <= 1000000) {
            setImagefileCmpny(file);
            setcompanyLogoPreview(null);

        } else {
            setcompanyLogoPreview(null);
            setImagefileCmpny(null);
        }

    }
    const ImageUploderCover = (file) => {
        if (file.size <= 1000000) {
            setImagefileCover(file);
            setcoverPreview(null);
            // setValue('image', file);
            // setError('image', { message: '' });
        } else {
            setcoverPreview(null);
            setImagefileCover(null);
        }
    }


    const onChangeDob = (value) => {
        setDob(value)
        setValue('dob', value)
        setError('dob', { message: '' })
    }


    const onChangeExtablished = (value) => {
        setExtablished(value)
        setValue('established_date', value)
        setError('established_date', { message: '' })
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



    const { mutate: mutateProfile, isLoading: profileisLoading, error } = useMutation({
        mutationFn: updateProfile,
        onSuccess: async (data) => {
            updateUser(data?.data?.data)
            await queryClient.invalidateQueries({ queryKey: ['profile'] });
            showSnackbar('Update successfully', 'success');
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    });

    const { mutate: mutateProfilePassword, isLoading: passwordLoading, } = useMutation({
        mutationFn: UpdateProfilePassword,
        onSuccess: async (data) => {

            showSnackbar('Update successfully', 'success');
        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
    });


    const submitProfile = (data) => {
        const formData = new FormData();
        if (imagefile) {
            formData.append('image', imagefile);
        }
        if (imagefileCmpny) {
            formData.append('logo', imagefileCmpny);
        }
        if (imagefileCover) {
            formData.append('cover_image', imagefileCover);
        }
        formData.append('first_name', data?.first_name);
        formData.append('email', data?.email);
        formData.append('mobile', data?.mobile);
        formData.append('dob', data?.dob ? moment(data?.dob).format('YYYY-MM-DD') : null);
        formData.append('id', data?.id);
        formData.append('company_name', data?.name)
        formData.append('designation', data?.designation)
        formData.append('established_date', data?.established_date ? moment(data?.established_date).format('YYYY-MM-DD') : null)
        formData.append('representative_name', data?.representative_name)
        formData.append('facebook_link', data?.facebook_link ?data?.facebook_link : '')
        formData.append('tiktok_link', data?.tiktok_link ? data?.tiktok_link : '')
        formData.append('instagram_link', data?.instagram_link ? data?.instagram_link : '')
        formData.append('linkedin_link', data?.linkedin_link ? data?.linkedin_link : '');
        formData.append('x_link', data?.x_link ? data?.x_link : null)
        mutateProfile(formData);
    };

    const submitPassword = (data) => {
        mutateProfilePassword(data)
    };

    const handleProfileSubmit = (data) => {
        setCurrentButton('profile');
        handleSubmit(submitProfile)(data);
    };
    const handlePasswordSubmit = (data) => {
        setCurrentButton('password');
        handleSubmit(submitPassword)(data);
    };


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
                            error={errors.image}
                            fieldName="image"
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
                            myid="contained-button-filePrevireß"
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
                                error={errors.user_name}
                                fieldName="user_name"
                                fieldLabel="Username"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput
                                readonly={false}
                                control={control}
                                error={errors.email}
                                fieldName="email"
                                fieldLabel="Email Address"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.mobile}
                                fieldName="mobile"
                                fieldLabel="Mobile Number"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.first_name}
                                fieldName="first_name"
                                fieldLabel="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.last_name}
                                fieldName="last_name"
                                fieldLabel="Last Name"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomDatePicker
                                fieldName='dob'
                                control={control}
                                error={errors.dob}
                                past={true}
                                fieldLabel={'Dob'}
                                values={dob}
                                changeValue={(date) => onChangeDob(date)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} xl={4} md={6} sm={6}>
                            <CustomInput

                                readonly={false}
                                control={control}
                                error={errors.name}
                                fieldName="designation"
                                fieldLabel="designation"
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
                    <CustomDatePicker
                                fieldName='established_date'
                                control={control}
                                error={errors.established_date}
                                past={true}
                                fieldLabel={'Established Date'}
                                values={exstablished}
                                changeValue={(date) => onChangeExtablished(date)}
                            />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.representative_name}
                            fieldName="representative_name"
                            fieldLabel="Company Representative"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6} />

                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={companyLogoPreview}
                            error={errors.logo}
                            fieldName="logo"
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
                            myid="contained-button-fileLogo"
                            width={'100%'}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6} xl={6} md={6} sm={6}>
                        <CustomImageUploader
                            ICON={""}
                            hide={false}
                            viewImage={coverPreview}
                            error={errors.cover_image}
                            fieldName="cover_image"
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
                            myid="contained-button-fileCover"
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
                            error={errors.facebook_link}
                            fieldName="facebook_link"
                            fieldLabel="Facebook"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.tiktok_link}
                            fieldName="tiktok_link"
                            fieldLabel="Tiktok"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.instagram_link}
                            fieldName="instagram_link"
                            fieldLabel="Instagram"
                        />
                    </Grid>

                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.x_link}
                            fieldName="x_link"
                            fieldLabel="Twitter (X)"
                        />
                    </Grid>
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={3} sm={6} />
                    <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                        <CustomInput
                            readonly={false}
                            control={control}
                            error={errors.linkedin_link}
                            fieldName="linkedin_link"
                            fieldLabel="LinkedIN"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={'flex'} justifyContent={'center'} py={3}>
                            <CustomButton isIcon={false} onClick={handleProfileSubmit} label={'Update'} width={{ xl: '20%', lg: '20%', md: '25%', sm: '60%', xs: '100%' }} />
                        </Box>
                    </Grid>
                </Grid>

                {/* ************************************************************************************************* */}

                <Box sx={{ my: 3, borderBottom: '1px solid #707070', px: 2, width: '100%', opacity: 0.2 }}>
                </Box>
                <CustomTitle label={'Change Password'} />
                <Grid container spacing={4}>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInput
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.old_password}
                                fieldName="old_password"
                                fieldLabel="Current Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.password}
                                fieldName="password"
                                fieldLabel="New Password"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} xl={3} md={6} sm={6}>
                            <CustomInputPassword
                                type={'password'}
                                readonly={false}
                                control={control}
                                error={errors.password_confirmation}
                                fieldName="password_confirmation"
                                fieldLabel="Confirm New Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Box display={'flex'} justifyContent={'flex-start'} py={3}>
                            <CustomButton
                                isIcon={false}
                                label={'Update'}
                                onClick={handlePasswordSubmit}
                                width={{ xl: '25%', lg: '25%', md: '30%', sm: '60%', xs: '100%' }}
                            />
                            </Box>
                        </Grid>
                    </Grid>
                    
            </Box>
            <CustomBackDrop loading={(isLoading || profileisLoading || passwordLoading)}/>
        </Box>

    )
}

export default ProfileScreen