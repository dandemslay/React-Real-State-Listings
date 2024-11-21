import { useState, useEffect } from 'react';
import { Listing } from '../types/listing';

const STORAGE_KEY = 'savedListings';

export const useSavedListings = () => {
  const [savedListings, setSavedListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedListings));
  }, [savedListings]);

  const saveListing = (listing: Listing) => {
    setSavedListings((prev) => {
      if (prev.some((l) => l.Id === listing.Id)) {
        return prev;
      }
      return [...prev, listing];
    });
  };

  const removeListing = (listingId: number) => {
    setSavedListings((prev) => prev.filter((l) => l.Id !== listingId));
  };

  const isListingSaved = (listingId: number) => {
    return savedListings.some((l) => l.Id === listingId);
  };

  return {
    savedListings,
    saveListing,
    removeListing,
    isListingSaved,
  };
};