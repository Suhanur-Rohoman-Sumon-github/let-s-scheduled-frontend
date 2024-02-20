import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import useContexts from "../../../../hooks/useContexts";

const CheckoutForm = ({ price, card }) => {
  const [clientSecret, setClientSecret] = useState("");

  // get user from custom met hook useContexts()
  const { user } = useContexts();

  // take the heading data from the props
  const { heading } = card;
  const [isPaymentIntent, setIsPaymentIntent] = useState(false);

  // get stripe information there
  const stripe = useStripe();
  const elements = useElements();
  const paymentsId = uuidv4();
  const userName = user?.displayName || "anonyms user";
  const userEmail = user?.email || "anonyms email";
  const navigate = useNavigate();

  // create a new payment intent
  useEffect(() => {
    if (!isPaymentIntent) {
      axios
        .post(
          "https://lets-sheduleit-backend.vercel.app/api/v1/payments/create-payment-intent",
          {
            price,
          }
        )
        .then((res) => {
          setClientSecret(res.data.data.clientSecret);
          setIsPaymentIntent(true);
        });
    }
  }, [price, isPaymentIntent]);

  // handle to make a successful payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log(paymentMethod.id);
    }
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
        },
      },
    });
    const transitionId = paymentMethod.id;
    const date = new Date();
    const amount = price;

    if (paymentIntent.status === "succeeded") {
      const payments = {
        paymentsId,
        userName,
        userNames: userName,
        userEmail,
        transitionId,
        date: date.toISOString(),
        amount,
        packages: heading,
      };

      // save the payment data in the database
      const res = await axios.post(
        "https://lets-sheduleit-backend.vercel.app/api/v1/payments/save-payment-history",
        { paymentsData: payments }
      );
      // if the payment datails is saved successfully in the database then change the current plane to user selected plane
      if (res.data.success === true) {
        const res = await axios.patch(
          `https://lets-sheduleit-backend.vercel.app/api/v1/users/change-user-plane?email=${user?.email}`,
          { plane: heading }
        );

        if (res.data.success === true) {
          navigate(`/payment-success/${paymentsId}`);
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full  my-8">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#0069ff",
                "::placeholder": {
                  color: "",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn-primary w-full mt-8"
          type="submit"
          disabled={!stripe}
        >
          Purchase
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
