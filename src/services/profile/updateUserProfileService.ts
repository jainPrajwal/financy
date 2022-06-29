import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const updateUserProfileService = async ({
  updatedProfile,
}: {
  updatedProfile: {
    name: string;
  };
}): Promise<AxiosResponse> => {
    console.log(updatedProfile)
  try {
    const response = await axios.post(`${BASE_API}/profile`, {
      profile: updatedProfile,
    });

    return response;
  } catch (error) {
    console.error(
      `somehting went erong while updating the user profile`,
      error
    );
    throw new Error(getErrorMessage(error));
  }
};
