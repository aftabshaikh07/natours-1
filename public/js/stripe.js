/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe(
      'pk_test_51O3GQ9SEHbpE3E5DpDS3gGU3PzwSe1ycYyNfubtQhcv6mnphfZclFZ592Zv4QNsFaAjKfgsw8jVyLyJh09BEygeB00mP7IKsVl'
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
