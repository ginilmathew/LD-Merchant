import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { COLOURS } from '../../assets/COLORS';
import CutomSearch from './CustomSearch';
import CustomButton from './CustomButton';

const CustomHeading = ({ label, isEnable, buttonLabel ,onClick}) => {
  return (
    <Grid container mt={8} spacing={2} justifyContent="space-between" alignItems="center">
      <Grid item xs={12} xl={9} lg={9} md={9} sm={12}>
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
        <Grid item xs={12} sm={12} xl={3} lg={3} md={3}>
          <Box display="flex" justifyContent="flex-end" gap={2} flexDirection={{md:'row',lg:'row',xl:'row',sm:'column',xs:'column'}}>
          <CustomButton label={buttonLabel}  width={180} onClick={onClick}/> {/* Add the button component here */}
            <CutomSearch />
            
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default CustomHeading;
