import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogContent from '@mui/material/DialogContent';
import { COLOURS } from '../../assets/COLORS';
import CustomBackArrow from './CustomBackArrow';

const CustomModal = ({ children, open, close, label, width,count }) => {

  useEffect(() => {
    let timeoutId;

    if (count === 6) {
      // Set a timeout to navigate to the login page after 5 seconds
      timeoutId = setTimeout(() => {
        // Perform navigation action here
        // For example, you can use window.location.href to navigate to the login page
        window.location.href = '/login';
      }, 5000);
    }

    return () => {
      // Clear the timeout when the component unmounts or Dialog is closed
      clearTimeout(timeoutId);
    };
  }, [count === 6]);



  return (
    <Dialog

      disableEnforceFocus
      // TransitionComponent={Transition}
      // fullWidth
      maxWidth={width ? width : 'md'}
      // fullScreen
      open={open}
      onClose={close}
      aria-describedby="alert-dialog-description"
    >

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal