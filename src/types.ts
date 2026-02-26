export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

export type Lifestyle = {
  cleanliness: number; // 1-5
  sleepSchedule: 'early' | 'night' | 'flexible';
  smoking: boolean;
  pets: boolean;
};

export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  budgetMin: number;
  budgetMax: number;
  lifestyle: Lifestyle;
  major: string;
  year: string;
};

export type Listing = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  availableDate: string;
  images: string[];
  amenities: string[];
};

export type Interaction = {
  fromUserId: string;
  toUserId: string;
  type: 'like' | 'pass';
};
