
export interface Celebrity {
  id: string;
  name: string;
  genre: string;
  country: string;
  image_url?: string;
  followers_count: number;
  verified: boolean;
  bio?: string;
  social_media?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  stats?: {
    posts: number;
    fans: number;
    following: number;
  };
  setlist?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Fan {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  following: string[]; // celebrity IDs
  joined_date: string;
  favorite_genres: string[];
}

export interface AISuggestion {
  id: string;
  name: string;
  genre: string;
  country: string;
  confidence: number;
  reason: string;
  image_url?: string;
}
