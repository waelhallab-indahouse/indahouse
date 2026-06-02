// ============================================================
// INDAHOUSE — Stripe Payments
// File: src/lib/payments.js
//
// Setup:
// 1. stripe.com → create account → get keys
// 2. npm install @stripe/stripe-js
// 3. Add keys to .env
// ============================================================

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

/**
 * Charge the host for a DJ booking.
 * Creates a Stripe Checkout session and redirects to payment.
 *
 * @param {object} booking - { id, dj.name, fee, duration, date }
 */
export async function checkoutBooking(booking) {
  const stripe = await stripePromise;

  // Call your backend to create a Stripe Checkout session
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId:   booking.id,
      djName:      booking.dj.stage_name,
      amount:      booking.fee * 100,   // Stripe uses cents
      duration:    booking.duration,
      date:        booking.date,
      successUrl:  `${window.location.origin}/sessions?payment=success&booking=${booking.id}`,
      cancelUrl:   `${window.location.origin}/sessions?payment=cancelled`,
    }),
  });

  const { sessionId } = await res.json();

  // Redirect to Stripe hosted checkout page
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) throw error;
}

/**
 * Check payment status after redirect back from Stripe
 */
export function getPaymentStatus() {
  const params = new URLSearchParams(window.location.search);
  return {
    status:    params.get('payment'),    // 'success' | 'cancelled'
    bookingId: params.get('booking'),
  };
}
