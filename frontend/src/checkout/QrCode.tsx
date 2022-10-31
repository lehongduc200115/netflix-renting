import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, BoxProps, } from "@mui/material";
import { PaymentMethod } from './Checkout';

type ImgProps = {
  alt: string;
  src: string;
}

const paymentSource = {
  MOMO: '/Qrcode.png',
  BANK: '/QrcodeBank.png'
}

export default function QrCode({paymentMethod}: any) {
  let imgSrc = paymentMethod === PaymentMethod.BANK ? paymentSource.BANK : paymentSource.MOMO;

  const Img = (props: BoxProps & ImgProps) => <Box object-fit="contain" component='img' {...props} />;

  return (
    <React.Fragment>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h6" gutterBottom>
          Please scan QR code for payment
        </Typography>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Img sx={{ width: 300 }} alt="khum tai duoc" src={imgSrc} /></div>
    </React.Fragment>
  );
}