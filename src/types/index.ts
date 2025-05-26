// Gallery Types
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tier: 'Artifact' | 'Legendary' | 'Epic' | 'Rare';
  createdAt: Date;
}

export type GalleryTier = 'Artifact' | 'Legendary' | 'Epic' | 'Rare';

// Booking Types
export interface BookingRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceTier: GalleryTier;
  nailShape: NailShape;
  nailLength: NailLength;
  preferredDate: Date;
  preferredTime: string;
  inspirationPhotos: string[];
  status: BookingStatus;
  notes: string;
  createdAt: Date;
}

export type NailShape = 'Square' | 'Round' | 'Almond' | 'Stiletto' | 'Coffin';
export type NailLength = 'Short' | 'Medium' | 'Long' | 'XL';
export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

// Inquiry Types
export interface DesignInquiry {
  id: string;
  clientName: string;
  email: string;
  designDescription: string;
  inspirationPhotos: string[];
  status: InquiryStatus;
  createdAt: Date;
}

export type InquiryStatus = 'New' | 'Reviewed' | 'Responded';

// User Types
export interface User {
  uid: string;
  email: string;
  isAdmin: boolean;
}