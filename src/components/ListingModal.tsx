import React from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Car,
  CalendarDays,
  Ruler,
  Bookmark,
  Blocks,
} from 'lucide-react';
import { Listing } from '../types/listing';
import { ContactForm } from './ContactForm';
import { formatDate, formatPrice } from '../utils/formatters';

interface ListingModalProps {
  listing: Listing;
  onClose: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  listing,
  onClose,
  onSave,
  isSaved,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="relative z-50 w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={onSave}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bookmark
                className="w-5 h-5 mr-2"
                fill={isSaved ? 'currentColor' : 'none'}
              />
              {isSaved ? 'Saved' : 'Save Property'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <img
                src={listing.PictureURL}
                alt={listing.Title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {listing.Title}
                </h2>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{listing.Location}</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-emerald-600">
                  {formatPrice(listing['Sale Price'])}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {listing.Bedrooms}
                    <br /> Bedrooms
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {listing.Bathrooms}
                    <br />
                    Bathrooms
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Car className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {listing.Parking}
                    <br />
                    Parking
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Ruler className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {listing.Sqft}
                    <br /> sqft
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Blocks className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {listing.YearBuilt} <br /> year built
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  <span>Listed on {formatDate(listing.DateListed)}</span>
                </div>
                <p className="text-gray-600 mt-4">{listing.Description}</p>
              </div>
            </div>

            <div className="md:pl-8">
              <ContactForm
                listingId={listing.Id}
                listingTitle={listing.Title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
