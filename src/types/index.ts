// أنواع البيانات لتطبيق بازار ريلز

export interface Reel {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  author: User;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
  tags: string[];
}

export interface Ad {
  id: string;
  shopName: string;
  shopId: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  price?: number;
  hasPrice: boolean;
  category: string;
  websiteUrl?: string;
  whatsappNumber?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isVerified: boolean;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isMerchant: boolean;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  reelId: string;
  author: User;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface LocalVideo {
  id: string;
  name: string;
  path: string;
  size: number;
  duration: number;
  thumbnail?: string;
}

export const FeedType = {
  REEL: 'reel',
  AD: 'ad',
  LOCAL: 'local'
} as const;

export type FeedTypeValue = typeof FeedType[keyof typeof FeedType];

export interface FeedItem {
  type: FeedTypeValue;
  reel?: Reel;
  ad?: Ad;
  localVideo?: LocalVideo;
}

export interface Merchant {
  id: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  logo: string;
  category: string;
  address: string;
  wallet: number;
  adsCount: number;
  totalViews: number;
  isVerified: boolean;
}
