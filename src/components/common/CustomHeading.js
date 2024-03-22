import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { COLOURS } from '../../assets/COLORS';
import CutomSearch from './CustomSearch';
import CustomButton from './CustomButton';

const CustomHeading = ({ label, isEnable, buttonLabel ,onClick,setState}) => {
  return (
    <Grid container mt={8} spacing={2} justifyContent="space-between" alignItems="center">
      <Grid item xs={12} xl={8} lg={8} md={8} sm={12}>
        <Typography sx={{
          fontSize: {
            lg: 30,
            md: 26,
            sm: 20,
            xs: 18,
          }, letterSpacing: 0.79, color: COLOURS.secondary, fontFamily: 'Outfit-ExtraBold'
        }}>{label}</Typography>
      </Grid>
      {!isEnable && (
        <Grid item xs={12} sm={12} xl={4} lg={4} md={4}>
          <Box display="flex" justifyContent="flex-end" gap={2} flexDirection={{md:'row',lg:'row',xl:'row',sm:'column',xs:'column'}}>
          <CustomButton label={buttonLabel}  width={180} onClick={onClick}/> {/* Add the button component here */}
            <CutomSearch setState={setState}/>
            
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default CustomHeading;
