import { Box, Container, Divider, Grid, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomModal from '../common/CustomModal'
import CustomTitle from '../common/CustomTitle'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomInput from '../common/CustomInput';
import CustomImageUploader from '../common/CustomImageUploder';
import CustomSelect from '../common/CustomSelect';
import CustomTextArea from '../common/CustomTextArea';
import CustomSwitch from '../common/CustomSwitch';
import CustomButton from '../common/CustomButton';
import CustomBackArrow from '../common/CustomBackArrow';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDateTimePicker from '../common/CustomDateTimePicker';
import moment from 'moment';
import { useSnackbar } from '../../hooks/SnackBarHook';
import { CreatePost, UpdatePost, getPayment, getPostShow } from '../../api/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IMG_URL } from '../../config';


export const PostEditView = () => {

    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const location = useLocation();
    const { state } = location;
    const { postId } = useParams();

    const [time, setTime] = useState(null);
    const [postPreview, setpostPreview] = useState(null);
    const [imagefilepost, setImagePost] = useState(null);
    const [coverPreview, setcoverPreview] = useState(null);
    const [imagefileCover, setImagefileCover] = useState(null);
    const [postSelect, setPostSelect] = useState(null)
    const [buttonselect, setButtonSelect] = useState(null)

    const schema = object().shape({
        deadline: yup.string().required('Required'),
        type: yup.string().required('Required'),
        button_type: yup.string().required('Required'),
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        post_image: yup
            .mixed()
            .required("Required"),
        price_image: yup
            .mixed()
            .required("Required")
    });

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),

    });

    const { data, } = useQuery(
        {
            queryKey: ['payment'],
            queryFn: getPayment
        });
    const { data: postShowData, isError, isLoading, isFetched, refetch } = useQuery(
        {
            queryKey: ['postShow'],
            queryFn: () => getPostShow(postId)
        });




    useEffect(() => {
        if ((postShowData?.data?.data && postId)) {
            let key = postShowData?.data?.data;
            setValue('deadline', moment(key?.deadline))
            setValue('type', key.type)
            setValue('button_type', key.button_type)
            setValue('description', key.description)
            setValue('title', key?.title)
            setValue('amount', key?.amount)
            setButtonSelect(key.button_type)
            setPostSelect(key.type)
            setValue('post_image', key?.post_image);
            setValue('price_image', key.price_image);
            setpostPreview(IMG_URL + key?.post_image);
            setcoverPreview(IMG_URL + key.price_image)
        }

    }, [postShowData?.data?.data,postId])

    const ImageUploderPost = (file) => {
        console.log({ file }, 'post')
        if (file.size <= 1000000) {
            setImagePost(file);
            setpostPreview(null);
            setValue('post_image', file);
            setError('post_image', { message: '' });

        } else {
            setpostPreview(null);
            setImagePost(null);
        }

    }


    const ImageUploderPrize = (file) => {

        console.log({ file }, 'cover')
        if (file.size <= 1000000) {
            setImagefileCover(file);
            setcoverPreview(null);
            setValue('price_image', file);
            setError('price_image', { message: '' });
        } else {
            setcoverPreview(null);
            setImagefileCover(null);
        }
    }



    const { mutate, isLoading: settingLoading, error } = useMutation({
        mutationFn: postId ? UpdatePost : CreatePost,
        onSuccess: async (data) => {
            reset()
            showSnackbar(postId ? 'Updated succesfully!' : 'Created succesfully!', 'success');
            navigate(-1)

        },
        onError: (error, variables, context) => {
            showSnackbar(error?.message, 'error');
        },
        // onSettled: async () => {
        //     console.log("I'm second!")
        // },
    })

    const OnChangeDate = (value) => {
        setValue('deadline', value)
        setTime(value)
        setError('deadline', { message: "" })
    }




    const onChangeButton = (e) => {
        const { value } = e.target;
        setValue('button_type', value)
        setButtonSelect(value)
    }

    const onChangePost = (e) => {
        const { value } = e.target;
        if (value === "premium") {
            setValue('amount', data?.data?.data?.withtax?.premium_post_price)
        } else {
            setValue('amount', data?.data?.data?.withtax?.normal_post_price)
        }
        setPostSelect(value)
        setValue('type', value)
    }

    const submitForm = (data) => {

        const formData = new FormData();
        if (imagefilepost) {
            formData.append('post_image', imagefilepost)
        }
        if (imagefileCover) {
            formData.append('price_image', imagefileCover)
        }
        if(postId){
            formData.append('id', postId)
        }
        formData.append('deadline', moment(data?.deadline).format('YYYY-MM-DD hh:mm:ss'))
        formData.append('type', data?.type)
        formData.append('title', data?.title)
        formData.append('amount', data?.amount)
        formData.append('description', data?.description)
        formData.append('button_type', data?.button_type)
        mutate(formData)
    }

    return (
        <Box px={2} py={2}>
            <CustomBackArrow label={`${state} Post`} />
            <Box px={5}>
                <Grid container spacing={4} my={2} >
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomDateTimePicker
                            values={time}
                            changeValue={(value) => OnChangeDate(value)}
                            fieldName='deadline'
                            control={control}
                            error={errors.deadline}
                            fieldLabel={'Dead Line'}
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomSelect
                         readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.type}
                            fieldName="type"
                            fieldLabel="Post Type"
                            size="16px"
                            value={postSelect}
                            onChangeValue={(e) => onChangePost(e)}
                        >
                            <MenuItem value="" disabled >
                                <em>Status</em>
                            </MenuItem>
                            {[{ id: 1, name: 'Premium', value: 'premium' }, { id: 2, name: 'Normal', value: 'normal' }].map((res, i) => (
                                <MenuItem value={res.value} >
                                    {res?.name}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}>
                        <CustomInput
                            readonly={true}
                            control={control}
                            error={errors.amount}
                            fieldName="amount"
                            fieldLabel="Amount"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={1} sm={4} xs={12}></Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.title}
                            fieldName="title"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Post Title"
                        />
                    </Grid>
                    <Grid item xl={10} lg={10} md={3} sm={4} xs={12}>
                        <CustomTextArea
                            readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.description}
                            fieldName="description"
                            multiline={true}
                            height={90}
                            row={10}
                            fieldLabel="Post Description"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomSelect
                            readOnly={state === 'View' ? true : false}
                            control={control}
                            error={errors.button_type}
                            fieldName="button_type"
                            fieldLabel="Post Button Type"
                            size="16px"
                            value={buttonselect}
                            onChangeValue={(e) => onChangeButton(e)}
                        >
                            <MenuItem value="" disabled >
                                <em>Status</em>
                            </MenuItem>
                            {[{ id: 1, name: 'Like', value: 'like' }, { id: 2, name: 'Share', value: 'share' }, { id: 3, name: 'Visit', value: 'visit' }].map((res, i) => (
                                <MenuItem value={res.value} >
                                    {res?.name}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={state === 'View' ? true : false}
                            viewImage={postPreview}
                            error={errors.post_image}
                            fieldName="post_image"
                            placeholder={``}
                            fieldLabel={"Post Image"}
                            control={control}
                            height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                            max={5}
                            onChangeValue={ImageUploderPost}
                            preview={imagefilepost}
                            previewEditimage={""}
                            type={"file"}
                            background="#e7f5f7"
                            myid="contained-button-file"
                            width={'100%'}
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <CustomImageUploader
                            ICON={""}
                            hide={state === 'View' ? true : false}
                            viewImage={coverPreview}
                            error={errors.price_image}
                            fieldName="price_image"
                            placeholder={``}
                            fieldLabel={"Prize Image"}
                            control={control}
                            height={{ xl: 160, lg: 150, md: 150, sm: 150, xs: 140 }}
                            max={5}
                            onChangeValue={ImageUploderPrize}
                            preview={imagefileCover}
                            previewEditimage={""}
                            type={"file"}
                            background="#e7f5f7"
                            myid="contained-button-file2"
                            width={'100%'}
                        />
                    </Grid>
                </Grid>


               {state !== 'View' && <Box display={'flex'} justifyContent={'center'} py={5}>
                    <CustomButton isIcon={false} label={state === 'Edit' ? 'Update' : 'Confirm'} onClick={handleSubmit(submitForm)} width={{ xl: '20%', lg: '20%', md: '25%', sm: '60%', xs: '100%' }} />
                </Box>}
            </Box>
        </Box>


    )
}
