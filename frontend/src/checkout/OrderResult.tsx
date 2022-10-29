import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, BoxProps, } from "@mui/material";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../App'


export default function OrderResult(package1: any) {
  const [paidStatus, setPaidStatus] = React.useState(false)
  const [sendSuccessed, setSendSuccessed] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { username } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:8000/getTransaction',
        data: {
          username: username || 'ducle'
        }
      });

      console.log(result)
  
      setPaidStatus(result.data.paid);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      fetchData()
    }, 5000);

    // fetchData()
    return () => clearInterval(interval);
  }, []);


  if (!sendSuccessed) {
    console.log(`package1: ${JSON.stringify(package1)}`)
    package1 = package1.packageType
    const body = {
      username: username || 'ducle',
      id: package1.id,
      name: package1.name,
      price: package1.detail.price,
    }
    console.log(`body: ${JSON.stringify(body)}`)
    axios({
      method: 'post',
      url: 'http://localhost:8000/addTransaction',
      data: body
    }).then((data) => {
      // console.log(JSON.stringify(data.data))
      setSendSuccessed(!!data.data.username)
    });

  }



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
      {paidStatus ? 'paid roi' : <CircularProgress />}
      <Typography variant="h5" gutterBottom>
        We are validating your payment, please wait.
      </Typography>
    </React.Fragment>
  );
}
