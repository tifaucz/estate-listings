export type Listing = {
  id: number;
  dateListed: string;
  title: string;
  description: string;
  price: number;
  thumbURL: string;
  picURL: string;
  location: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  yearBuilt: number;
};
  
export type ContactMessage = {
  fullName: string;
  email: string;
  phoneNumber: string;
  comments: string;
};