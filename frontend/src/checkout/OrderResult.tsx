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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function OrderResult({packageType}: any) {
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
    console.log(`package11: ${JSON.stringify(packageType)}`)
    // packageType = packageType.packageType
    const body = {
      username: username,
      id: packageType.id,
      name: packageType.title,
      price: packageType.price,
    }
    console.log(`body: ${JSON.stringify(body)}`)
    axios({
      method: 'post',
      url: 'http://localhost:8000/addTransaction',
      data: body
    }).then((data) => {
      setSendSuccessed(!!data.data.username)
    });

  }

  // setPaidStatus(true)

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

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {paidStatus ? <CheckCircleIcon color="success" sx={{ fontSize: 50 }}></CheckCircleIcon> : <CircularProgress />}
      {/* <CheckCircleIcon color="success" sx={{ fontSize: 50 }}></CheckCircleIcon> */}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Typography variant="h5" gutterBottom>
      {paidStatus ? 'Your order success! Please login via: ${}' : 'We are validating your payment, please wait.'} 
      </Typography>
      </div>
    </React.Fragment>
  );
}
