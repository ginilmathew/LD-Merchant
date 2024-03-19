import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { Box, Grid, Stack, styled, Typography } from '@mui/material'


const OTP = () => {





    const [otp, setOTP] = useState(['', '', '', '']);



    const customId = "custom-id-yes";
    const customIdError = "custom-id-yesError";
    const inputRefs = useRef([]);

    const handleOTPChange = (index, event) => {
        const { value } = event.target;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        // Move focus to the next input
        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (index, event) => {
        // Prevent entering non-numeric characters
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }

        // Move focus to the previous input on Backspace/Delete if the current input is empty
        if ((event.key === 'Backspace' || event.key === 'Delete') && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        // Focus the first input when the component mounts
        inputRefs.current[0]?.focus();
    }, []);

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
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <Typography letterSpacing={1} fontSize={26} sx={{ fontFamily: `Outfit-Bold` }}>Enter OTP</Typography>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'}>
                <Typography letterSpacing={1} fontSize={30} sx={{ fontFamily: `Outfit-Light` }}>A OTP has been sent to your registered </Typography>
                <Typography letterSpacing={1} fontSize={28} sx={{ fontFamily: `Outfit-Light` }}> mobile number</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    {otp.map((value, index) => (
                        <input
                            style={{ width: 50, textAlign: 'center', height: 50, border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: 5, fontSize: 18 }}
                            key={index}
                            type="text"
                            maxLength={1} // Specify the maximum length of each input
                            value={value}
                            onChange={(event) => handleOTPChange(index, event)}
                            onKeyUpCapture={(event) => handleKeyPress(index, event)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    ))}
                </Box>

            </Grid>



        </>


    )
}

export default OTP

