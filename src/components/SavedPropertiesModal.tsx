import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Listing } from '../types/listing';
import { formatPrice } from '../utils/formatters';

interface SavedPropertiesModalProps {
  savedListings: Listing[];
  onClose: () => void;
  onRemove: (listingId: number) => void;
  onViewDetails: (listing: Listing) => void;
}

export const SavedPropertiesModal: React.FC<SavedPropertiesModalProps> = ({
  savedListings,
  onClose,
  onRemove,
  onViewDetails,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative z-50 w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Saved Properties</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          {savedListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No properties saved yet.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {savedListings.map((listing) => (
                <div
                  key={listing.Id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={listing.ThumbnailURL}
                    alt={listing.Title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {listing.Title}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {formatPrice(listing['Sale Price'])}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {listing.Bedrooms} beds • {listing.Bathrooms} baths • {listing.Location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(listing)}
                      className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemove(listing.Id)}
                      className="p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};