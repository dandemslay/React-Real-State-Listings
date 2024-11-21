export interface Listing {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  'Sale Price': number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
}

export interface FilterOptions {
  bedrooms: number | '';
  bathrooms: number | '';
  parking: number | '';
  priceMin: number | '';
  priceMax: number | '';
}
