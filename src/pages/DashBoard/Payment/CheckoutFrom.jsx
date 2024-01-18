import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import useContexts from "../../../hooks/useContexts";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, card }) => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContexts();
  const { heading } = card;
  const [isPaymentIntent, setIsPaymentIntent] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const paymentsId = uuidv4();
  const userName = user?.displayName;
  const userEmail = user?.email;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isPaymentIntent) {
      axios
        .post("http://localhost:3000/api/v1/payments/create-payment-intent", {
          price,
        })
        .then((res) => {
          setClientSecret(res.data.data.clientSecret);


          setIsPaymentIntent(true);
        });
    }
  }, [price, isPaymentIntent]);
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
    console.log(card);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
          },
        },
      });
    const transitionId = paymentMethod.id;
    const date = Date.now();
    const amount = price;
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      const payments = {
        paymentsId,
        userName,
        userNames: userName,
        userEmail,
        transitionId,
        date,
        amount,
      };
      const res = await axios.post(
        "http://localhost:3000/api/v1/payments/save-payment-history",
        { paymentsData: payments }
      );
      if (res.data.sucsees === true) {
        const res = await axios.patch(
          `http://localhost:3000/api/v1/users/change-user-plane?email=${user?.email}`,
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
                  color: "#0069ff",
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
          disabled={!stripe || !clientSecret}
        >
          Purchase
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
