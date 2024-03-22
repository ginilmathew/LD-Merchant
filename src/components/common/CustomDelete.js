import { Backdrop, Box, CircularProgress, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CustomButton from './CustomButton';

import { useSnackbar } from '../../hooks/SnackBarHook';
import { useMutation } from '@tanstack/react-query';
import { ICONS } from '../../assets/ICONS';





const CustomDelete = ({ open, onClose, heading, paragraph, fun, _id, fetch }) => {

  const showSnackbar = useSnackbar();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: fun,
    onSuccess: async (data) => {
      fetch();
      showSnackbar('Delete successfully!', 'success');
      onClose()

    },
    onError: (error, variables, context) => {

      showSnackbar(error?.message, 'error');
    },
    // onSettled: async () => {
    //     console.log("I'm second!")
    // },
  })


  const submitForm = () => {
    mutate(_id)
  }


  return (
    <Dialog
      maxWidth={'md'}
      onClose={onClose} open={open}>

      <DialogContent >
        <Box display={'flex'} justifyContent={'flex-end'}>
          <ICONS.CloseTwoToneIcon.component sx={{
            "&:hover": { color: "#000" }, color: '#FF0000',
            cursor: 'pointer'
          }} onClick={onClose} />
        </Box>

        <Box display={'flex'} justifyContent={'center'} mb={1}>

          <ICONS.ErrorTwoToneIcon.component sx={ICONS.ErrorTwoToneIcon.sx} />

        </Box>
        <DialogContentText id="alert-dialog-description">
          <Box display={'flex'} justifyContent={'center'}>
            <Typography width={'70%'} textAlign={'center'} f fontFamily={'Outfit-Regular'} fontSize={18} fontWeight={'bold'}>Are you sure you want to delete this {paragraph}?</Typography>`
          </Box>
        </DialogContentText>
        <Box display={'flex'} justifyContent={'center'} py={2} >
          <CustomButton
            disabled={false}
            btncolor=''
            height={'100%'}
            IconEnd={""}
            IconStart={''}
            startIcon={false}
            endIcon={false}
            onClick={submitForm}
            label='confirm' />
        </Box>
      </DialogContent>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  )
}

export default CustomDelete