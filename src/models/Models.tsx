import { GalleryTier, NailShape, NailLength } from '../types';

export interface AppointmentModel {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_tier: GalleryTier;
  nail_shape: NailShape;
  nail_length: NailLength;
  appointment_datetime_slot: Date;
  duration: number;
  inspiration_photos: (File|string)[];
  notes: string;
  status: string;
}

export interface InquiryModel {
  name: string;
  email: string;
  design_description: string;
  inspiration_photos: string[];
}

export interface NewsletterModel{
    email: string;
    newsletter_id: number;
};