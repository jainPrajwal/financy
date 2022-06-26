import axios, { AxiosResponse } from "axios";
import { BASE_API } from "../../constants/api";
import { Note } from "../../constants/notes.types";

import { getErrorMessage } from "../../utils/getErrorMessage";

export const editNotesService = ({
  videoId,
  note,
  noteId,
}: {
  videoId: string;
  note: Note;
  noteId: string;
}): Promise<AxiosResponse> => {
 
 
  try {
    const response = axios.post(
      `${BASE_API}/videos/${videoId}/notes/${noteId}`,
      {
        note,
      }
    );
    return response;
  } catch (error) {
    console.error(`something went wrong while saving notes`, error);
    throw new Error(getErrorMessage(error));
  }
};
