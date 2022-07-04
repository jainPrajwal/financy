import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { Note } from "../../constants/notes.types";

import { getErrorMessage } from "../../utils/getErrorMessage";

export const deleteNotesService = ({
  videoId,
  noteId,
}: {
  videoId: string;
  noteId: string;
}): Promise<AxiosResponse> => {
 
 
  try {
    const response = axios.delete(
      `${BASE_API}/videos/${videoId}/notes/${noteId}`
    );
    return response;
  } catch (error) {
    console.error(`something went wrong while saving notes`, error);
    throw new Error(getErrorMessage(error));
  }
};
