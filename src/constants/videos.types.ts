export type ProviderProps = {
    children: React.ReactNode;
  };
  type gender = [`male`, `female`, `others`];
  export type loading = `idle` | `success` | `loading` | `error`;
  export const QUERY_LIMIT = 10;
  
  export type Thumbnail = {
    url: string;
    width: number;
    height: number;
  };
  
  export type publisher = {
    isAPremiumMember: Boolean;
    _id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
    gender?: gender[number];
    dateOfBirth?: string;
  };
  export type Video = {
    category: string;
    channelId: string;
    createdAt: Date;
    description: string;
    duration: string;
    isPremium: Boolean;
    likes: {
      male: number;
      female: number;
      others: number;
    };
    title: string;
    updatedAt?: Date;
    url: string;
    views: {
      male: number;
      female: number;
      others: number;
    };
    _id: string;
    __v?: number;
    publisher: publisher;
    thumbnails: Array<Thumbnail>;
  };
  
  export type VideosInitialState = {
    videos: Array<Video>;
    loading: `idle` | `loading` | `error` | `success`;
    sortBy: string | null;
    categories: [`stockmarket`, `scams`];
    searchQuery: string;
    selectedCategory: string;
    currentPageNumber: number;
  };
  
  export type UserUploadedVideo = {
    url: string | null;
    category: string | null;
  };
  