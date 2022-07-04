export type ProviderProps = {
  children: React.ReactNode;
};
type gender = [`male`, `female`, `others`];
export type loading = `idle` | `success` | `loading` | `error`;
export const NO_VIDEOS_FOUND = `No Videos Found..!`;
export const QUERY_LIMIT = 10;

export type ThumbnailObject = {
  default: Thumbnail;
  high: Thumbnail;
  max: Thumbnail;
  medium: Thumbnail;
  standard: Thumbnail;
};
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
  thumbnails: Array<ThumbnailObject>;
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
export const STOCKMARKET = `STOCKMARKET`;
export const GOLD = `GOLD`;
export const CRYPTO = `CRYPTO`;
export const BUSINESSCASESTUDIES = `BUSINESSCASESTUDIES`;
export const SCAMS = `SCAMS`;
export const NFTS = `NFTS`;
export const INVESTMENTSTRATEGIES = `INVESTMENTSTRATEGIES`;

export const CATEGORIES = [
  STOCKMARKET,
  GOLD,
  CRYPTO,
  BUSINESSCASESTUDIES,
  SCAMS,
  NFTS,
  INVESTMENTSTRATEGIES,
];
