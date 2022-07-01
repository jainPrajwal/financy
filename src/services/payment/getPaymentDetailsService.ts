import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";


export const getPaymentDetailsService = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${BASE_API}/payment`);
    return response;
  } catch (error) {
    console.error(
      `somehting wemt wronh while fetching the payment details`,
      error
    );
    throw new Error(getErrorMessage(error));
  }
};
