import React from 'react';
import { Home, MapPin, Bed, Bath, Car, Bookmark } from 'lucide-react';
import { Listing } from '../types/listing';
import { formatPrice } from '../utils/formatters';

interface ListingCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
  onSave: () => void;
  isSaved: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onViewDetails,
  onSave,
  isSaved,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.ThumbnailURL}
          alt={listing.Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-emerald-600 font-semibold">
            {formatPrice(listing['Sale Price'])}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {listing.Title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className={`p-2 rounded-full transition-colors ${
              isSaved
                ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                : 'text-gray-400 hover:text-emerald-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark
              className="w-5 h-5"
              fill={isSaved ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{listing.Location}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-2 text-gray-500" />
            <span>{listing.Bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-2 text-gray-500" />
            <span>{listing.Bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-2 text-gray-500" />
            <span>{listing.Parking} park</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(listing)}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
