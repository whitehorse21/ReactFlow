import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAsync } from '../../../hooks/useAsync';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#303238',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#CFD7DF'
      }
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238'
      }
    }
  }
};

function CardSection() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: 20 }}>Card details</div>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

const Stripe = forwardRef((props, ref) => (
  <div style={{ paddingBottom: 20 }}>
    <CardSection />
  </div>
));

export default Stripe;
