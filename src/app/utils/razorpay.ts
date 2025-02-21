import axios from "axios";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: number;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

// interface OrderResponse {
//   orderId: string;
// }
const currencyMultipliers: { [key: string]: number } = {
  USD: 100, 
  INR: 100,
  EUR: 100, 
  JPY: 1, 

};
export const handlePayment = async (
  dat: { email: string; phone_number: string; name: string },
  service: { name: string; online_pricing: number },
  
  continueToBooking: (
    dat: { email: string; name: string; phone_number: string },
    response: { razorpay_order_id: string }
  ) => void,
  setIsProcessing: (state: boolean) => void,
  currency:string,
) => {
  setIsProcessing(true);

const multiplier = currencyMultipliers[currency.toUpperCase()] || 100;
const Amount = Number(service.online_pricing) * multiplier;

  try {
    const response = await axios.post("/api/create-order", {
      amount: Amount,
      currency: currency,
    });

    const data = response.data;
    const options: RazorpayOptions = {
      key: process.env.RAZORPAY_KEY_ID || "",
      amount: Amount,
      currency: currency,
      name: "meetxo",
      description: service.name,
      order_id: data.orderId,
      handler: function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        continueToBooking(dat, response);
      },
      prefill: {
        name: dat?.name,
        email: dat?.email,
        contact: Number(dat?.phone_number),
      },
      theme: {
        color: "#3b50c4",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Payment failed", error);
  } finally {
    setIsProcessing(false);
  }
};
