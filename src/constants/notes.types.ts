export type UserDefinedNote = {
    title: string | null;
    description: string | null;
  };
  
  export type Note = {
    _id: string;
    title: string;
    description: string;
    user: string;
    video: string;
  };
  
  export type NotesInitialState = {
    notes: Array<Note>;
  };
  