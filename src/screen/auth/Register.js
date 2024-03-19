import React, { useCallback, useEffect, useState } from 'react'

import backgroundImage from '../../assets/image/background.jpg'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import { COLOURS } from '../../assets/COLORS';
import { personalDetailsStore, tabStore } from '../../store/register';
import PersonalTab from '../../components/Register/PersonalTab';
import LoginLogo from '../../components/login/LoginLogo';
import { ICONS } from '../../assets/ICONS';
import CustomButton from '../../components/common/CustomButton';
import BusinesTab from '../../components/Register/BusinesTab';
import SocialMediaTab from '../../components/Register/SocialMediaTab';
import VerificationTab from '../../components/Register/VerificationTab';
import OTP from '../../components/Register/OTPTab';
import CustomModal from '../../components/common/CustomModal';
import OTPDEMO from '../../components/Register/OTPDemo';
import AnimationSucces from '../../assets/image/success.gif'


const Register = () => {

    const { user_name } = personalDetailsStore((state) => state);
    const [open, setOpen] = useState(false)

    const { count, updateCountIcrease, title, updateCountDecrease, updateTitle } = tabStore((state) => state)


    console.log({ count })
    const containerStyle = {
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    // const handleUserChange = (mode, event) => {
    //     personalDetailsStore.getState().updateUserDetails(mode, event);
    // };




    const CloseModal = () => {
        setOpen(false)
    }
    const openModal = () => {
        setOpen(true)
    }


    const NextPage = () => {
        updateCountIcrease();
        updateTitle()
    }

    const PreviosPage = () => {
        updateCountDecrease();
        updateTitle()
    }




    return (
        <div style={containerStyle}>
            <Container sx={{ background: COLOURS.primary, height: '100vh' }}>
                <Grid container py={3} alignItems={'center'}>
                    <Grid item xs={12} lg={4} display={'flex'} justifyContent={{ xs: 'center', xl: 'flex-start' }}>
                        <LoginLogo width={100} height={100} />
                    </Grid>
                    <Grid item xs={12} lg={4} display={'flex'} justifyContent={'center'}>
                        <Typography sx={{ color: COLOURS.title, fontSize: 30, fontFamily: 'Outfit-Bold', letterSpacing: 0.72 }} >
                            New Registration
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}></Grid>
                </Grid>
                <Box px={5}>
                    {count <= 4 &&
                        <Box display={'flex'}>
                            <Typography sx={{ color: COLOURS.title, fontSize: 26, fontFamily: 'Outfit-Bold', letterSpacing: 0.72 }} >
                                {title}
                            </Typography>
                            <Typography fontSize={30} color={COLOURS.textColor}>*</Typography>
                        </Box>}
                    <Box mt={5}>
                        <Grid container justify="center" spacing={5}>
                            {/* Change Tab base on Continue */}
                            {count === 1 && <PersonalTab />}
                            {count === 2 && <BusinesTab />}
                            {count == 3 && <SocialMediaTab />}
                            {count === 4 && <VerificationTab />}
                            {count === 5 && <OTP />}
                            {count === 6 && <OTPDEMO />}


                            <Grid item xs={12}></Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <CustomButton
                                    onClick={NextPage}
                                    width={'30%'}
                                    label={'Continue'}
                                    isIcon={false} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={1} display="flex" justifyContent="center">
                                    {[...Array(4)].map((_, index) => (
                                        <Box key={index} sx={{ width: count === index + 1 ? 14 : 12, height: count === index + 1 ? 14 : 12, borderRadius: '50%', background: count === index + 1 ? COLOURS.textColor : COLOURS.textColorLight, mx: .3 }} />
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={null}>
                                    <ICONS.arrowBack.component sx={ICONS.arrowBack.sx} />
                                    <Typography sx={{ fontSize: 26, fontFamily: 'Outfit-Medium', color: COLOURS.secondary }} onClick={PreviosPage}>GO BACK</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {count === 6 &&
                    <CustomModal open={count === 6 ? openModal : open} close={CloseModal} count={count}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Avatar src={AnimationSucces} sx={{ width: 150, height: 150 }} />
                        </Box>
                        <Box px={5} display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'}>
                            <Typography letterSpacing={1} fontSize={26} sx={{ fontFamily: `Outfit-Bold` }}>Your Account has been Successfully </Typography>
                            <Typography letterSpacing={1} fontSize={26} sx={{ fontFamily: `Outfit-Bold` }}> Registered!</Typography>
                            <Box py={3} display={'flex'} flexDirection={'column'} textAlign={'center'}>
                                <Typography letterSpacing={1} fontSize={26} sx={{ fontFamily: `Outfit-Light` }}>You can log in to your account after the admin has </Typography>
                                <Typography letterSpacing={1} fontSize={26} sx={{ fontFamily: `Outfit-Light` }}>verified and approved your account</Typography>
                            </Box>

                        </Box>

                    </CustomModal>
                }

            </Container>
        </div>
    )
}

export default Register