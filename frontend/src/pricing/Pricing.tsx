import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { PACKAGE1 } from '../constants/package.constant'
import { useNavigate, NavigateOptions } from "react-router-dom";
import axios from 'axios'
import FlipNumbers from 'react-flip-numbers';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



// const footers = [
//   {
//     title: 'Company',
//     description: ['Team', 'History', 'Contact us', 'Locations'],
//   },
//   {
//     title: 'Features',
//     description: [
//       'Cool stuff',
//       'Random feature',
//       'Team feature',
//       'Developer stuff',
//       'Another one',
//     ],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   {
//     title: 'Legal',
//     description: ['Privacy policy', 'Terms of use'],
//   },
// ];

function PricingContent() {
  const navigate = useNavigate()
  let [peopleUsing, setPeopleUsing] = React.useState({
    [PACKAGE1.ONEDAY.id]: 0,
    [PACKAGE1.THREEDAYS.id]: 0,
    [PACKAGE1.WEEK.id]: 0
  });

  React.useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/getBuyHistory'
    }).then((data) => {
      console.log(`data.data: ${JSON.stringify(data.data)}`)
      // peopleUsing = (data.data)
      setPeopleUsing(() => data.data)
      console.log(`peopleUsing: ${JSON.stringify(peopleUsing)}`)
    });
  }, [])

  const tiers = [
    {
      id: PACKAGE1.ONEDAY.id,
      title: `${PACKAGE1.ONEDAY.name}`,
      price: PACKAGE1.ONEDAY.detail.price,
      description: [
        '1 day using Netflix',
        `Over ${peopleUsing[PACKAGE1.ONEDAY.id]} people using this plan`,
      ],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      id: PACKAGE1.THREEDAYS.id,
      title: `${PACKAGE1.THREEDAYS.name}`,
      subheader: 'Most popular',
      price: PACKAGE1.THREEDAYS.detail.price,
      description: [
        '3 days using Netflix',
        `Over ${peopleUsing[PACKAGE1.THREEDAYS.id]} people using this plan`
      ],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      id: PACKAGE1.WEEK.id,
      title: `${PACKAGE1.WEEK.name}`,
      price: PACKAGE1.WEEK.detail.price,
      description: [
        '1 week using Netflix',
        `Over ${peopleUsing[PACKAGE1.WEEK.id]} people using this plan`
      ],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    }
  ];
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          We provide Netflix access with the cheapest price on the market. Allow you to trial Netflix at the price of {PACKAGE1.ONEDAY.detail.price}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === PACKAGE1.THREEDAYS.name ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === PACKAGE1.THREEDAYS.name ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}đ
                    </Typography>
                    {/* <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography> */}
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                    onClick={() => {
                      // const navigate = useNavigate();
                      return navigate("/checkout", {
                        state: tier,
                      })
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <div>
        <FlipNumbers
            height={12}
            width={12}
            color="red"
            background="white"
            numbers="12345"
            perspective={100}
            play={true}
            numberStyles={{ color: "black" }}
      />
    </div> */}
      </Container>
      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}