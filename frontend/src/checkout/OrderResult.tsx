import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, BoxProps, } from "@mui/material";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';



export default function OrderResult(package1: any) {
  const state = {
    userId: Cookies.get('userId')
  };

  axios({
    method: 'post',
    url: 'http://localhost:8000/addTransaction',
    data: {
      userId: state.userId,
      package1: {
        id: package1.id,
        name: package1.name,
        detail: {
          price: package1.detail.price
        }
      },
      amount: package1.detail.price,
    }
  }).then((data) => {
    console.log(JSON.stringify(data.data.data))
    // setIsLoggedIn(data.data.data)
  });

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is #2001539. We have emailed your order
        confirmation, and will send you an update when your order has
        shipped.
      </Typography>
      <CircularProgress />
      <Typography variant="h5" gutterBottom>
        We are validating your payment, please wait.
      </Typography>
    </React.Fragment>
  );
}
