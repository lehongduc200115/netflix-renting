import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Box, BoxProps, } from "@mui/material";

type ImgProps = {
  alt: string;
  src: string;
  // add more HTML img attributes you need
}
const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function MomoQrCode() {
  const Img = (props: BoxProps & ImgProps) => <Box object-fit="contain" component='img' {...props} />;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Please scan QR code for payment
      </Typography>
      <Img sx={{width: 300}} alt="khum tai duoc" src="/Qrcode.png" />
    </React.Fragment>
  );
}