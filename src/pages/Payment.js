import { useState, useEffect, useCallback } from 'react';
import Stripe from 'stripe';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery } from '@material-ui/core';
// utils
import fakeRequest from '../utils/fakeRequest';
// components
import Page from '../components/Page';
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../components/_external-pages/payment';
import { useAsync } from '../hooks/useAsync';
import { paymentIntent } from '../apis/payment';
// ----------------------------------------------------------------------
const stripeService = new Stripe(
  'sk_test_51JRNMVHZZ1uIMGYFo86EAfFwmJzlKzEFUAMh8fj8TryaVHfmPIKz8rzqUYyTeRiNdCPBFzfzmakbqpjjEjFnc33C00XuHocfvM'
);

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));
// ----------------------------------------------------------------------

export default function Payment() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { data, status, error, run } = useAsync({
    status: 'idle'
  });
  const stripe = useStripe();
  const elements = useElements();
  const [asyncState, setAsyncState] = useState('');
  const [settings, setSettings] = useState(null);

  const PaymentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    address: Yup.string().required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      subscription: 'premium',
      isMonthly: false,
      method: 'paypal',
      card: 'mastercard',
      newCardName: '',
      newCardNumber: '',
      newCardExpired: '',
      newCardCvv: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
          enqueueSnackbar(result.error.message, { variant: 'error' });
        }

        const submitData = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
          detail: 'premium'
        };
        setSettings(submitData);
        if (values.method === 'paypal') {
          alert(
            JSON.stringify(
              {
                ...submitData,
                method: values.method
              },
              null,
              2
            )
          );
        } else if (values.method !== 'paypal') {
          run(
            paymentIntent({
              ...submitData,
              token: result.token,
              amount: 100,
              currency: 'usd'
            })
          );
          setAsyncState('paymentIntent');
        }
        resetForm();
      } catch (err) {
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }
  });

  const confirm = useCallback(
    async (clientSecret) => {
      if (!stripe || !elements) {
        return;
      }
      const billingDetails = {
        name: settings.name,
        email: settings.email
      };
      const card = elements.getElement(CardElement);
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: billingDetails
      });
      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq?.paymentMethod?.id
      });
      if (confirmedCardPayment?.paymentIntent?.status === 'succeeded') {
        enqueueSnackbar('Payment success', { variant: 'success' });
      } else {
        enqueueSnackbar('Payment Error', { variant: 'error' });
      }
    },
    [stripe, elements, enqueueSnackbar, settings]
  );

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'paymentIntent') {
        confirm(data?.data?.body?.clientSecret);
      }
    } else if (status === 'rejected') {
      console.log(error);
    }
  }, [status, run, data, error, asyncState, confirm]);

  return (
    <RootStyle title="Payment | Minimal-UI">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" paragraph>
            Let's finish powering you up!
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Professional plan is right for you.
          </Typography>
        </Box>

        <Card>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Grid container spacing={upMd ? 5 : 2}>
                <Grid item xs={12} md={4}>
                  <PaymentBillingAddress formik={formik} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PaymentMethods formik={formik} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PaymentSummary formik={formik} />
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
      </Container>
    </RootStyle>
  );
}
