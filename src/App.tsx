import React, { useState, useEffect } from 'react';
import { Home, BookmarkPlus } from 'lucide-react';
import { ListingCard } from './components/ListingCard';
import { FilterBar } from './components/FilterBar';
import { ListingModal } from './components/ListingModal';
import { SavedPropertiesModal } from './components/SavedPropertiesModal';
import { Listing, FilterOptions } from './types/listing';
import { MOCK_LISTINGS } from './data/mockListings';
import { useSavedListings } from './hooks/useSavedListings';

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    bedrooms: '',
    bathrooms: '',
    parking: '',
    minPrice: '',
    maxPrice: '',
  });

  const { savedListings, saveListing, removeListing, isListingSaved } =
    useSavedListings();

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, filters]);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        'https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setListings(data);
      setFilteredListings(data);
    } catch (err) {
      console.log('Using mock data due to API error:', err);
      setListings(MOCK_LISTINGS);
      setFilteredListings(MOCK_LISTINGS);
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = [...listings];

    if (filters.bedrooms !== '') {
      filtered = filtered.filter(
        (listing) => listing.Bedrooms >= filters.bedrooms
      );
    }
    if (filters.bathrooms !== '') {
      filtered = filtered.filter(
        (listing) => listing.Bathrooms >= filters.bathrooms
      );
    }
    if (filters.parking !== '') {
      filtered = filtered.filter(
        (listing) => listing.Parking >= filters.parking
      );
    }
    if (filters.priceMax !== '') {
      filtered = filtered.filter(
        (listing) => listing['Sale Price'] >= filters.priceMax
      );
    }

    setFilteredListings(filtered);
  };

  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setShowSavedModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-emerald-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Real Estate Listings
              </h1>
            </div>
            <button
              onClick={() => setShowSavedModal(true)}
              className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <BookmarkPlus className="w-5 h-5 mr-2" />
              Saved Properties ({savedListings.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No listings found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.Id}
                listing={listing}
                onViewDetails={handleViewDetails}
                onSave={() => saveListing(listing)}
                isSaved={isListingSaved(listing.Id)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSave={() => saveListing(selectedListing)}
          isSaved={isListingSaved(selectedListing.Id)}
        />
      )}

      {showSavedModal && (
        <SavedPropertiesModal
          savedListings={savedListings}
          onClose={() => setShowSavedModal(false)}
          onRemove={removeListing}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
}

export default App;
