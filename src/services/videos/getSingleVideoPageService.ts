import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const getSingeVideoPageService = async ({
  videoId,
}: {
  videoId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${BASE_API}/videos/${videoId}`);
    console.log(`FETCHED`)
    return response;
  } catch (error) {
    console.error(
      `somehthing went wrong while getting single video page details`,
      error
    );
    throw new Error(getErrorMessage(error));
  }
};
