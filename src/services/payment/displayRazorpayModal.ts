import axios from "axios";
import { BASE_API } from "../../constants/api";
import { Payment } from "../../constants/payment.types";
import { Profile as ProfileType } from "../../constants/profile.types";
import { loadScript } from "./loadScript";

export const displayRazorPayModal = async ({
  setPaymentDetails,
  setUserProfile,
}: {
  setPaymentDetails: React.Dispatch<React.SetStateAction<Payment | null>>;
  setUserProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
}) => {
  try {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  } catch (error) {
    console.error(
      `somehting went wrong while loading the razorpay script`,
      error
    );
  }
  try {
    const result = await axios.post(`${BASE_API}/payment`);
    if (!result) {
      console.error(`result is undefined`, result);
    }

    const {
      amount,
      id: orderId,
      currency,
    }: { amount: number; id: string; currency: string } = result.data.order;

    const options = {
      key: `rzp_test_qI8PEnrZgATDiP`,
      amount: amount.toString(),
      currency,
      name: `Financyy Pvt Ltd`,
      description: `test`,
      order_id: orderId,
      handler: async function (response: any) {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(`${BASE_API}/payment/verify`, data);

        const axiosResponse = await axios.post(`${BASE_API}/profile`, {
          profile: {
            isAPremiumMember: true,
          },
        });

        setPaymentDetails({
          orderId: result.data.payment.order_id,
          paymentId: result.data.payment.payment_id,
        });
        setUserProfile((prevState) => ({
          ...prevState,
          ...(axiosResponse.data.profile as ProfileType),
        }));
      },
      prefill: {
        name: "Tube Stox",
        email: "jainprajwal123@gmail.com",
        contact: "965726180",
      },
      notes: {
        address: "Tube Stox Corporate Office",
      },
      theme: {
        color: "#267EF3",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error(`something went wrong while fetching payment details`, error);
  }
};
