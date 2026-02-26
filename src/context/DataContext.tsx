import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, Listing } from '../types';
import { mockProfiles, mockListings } from '../data/mockData';

interface DataContextType {
  profiles: Profile[];
  listings: Listing[];
  addListing: (listing: Listing) => void;
  updateListing: (listing: Listing) => void;
  deleteListing: (id: string) => void;
  updateProfile: (profile: Profile) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [listings, setListings] = useState<Listing[]>(mockListings);

  const addListing = (listing: Listing) => {
    setListings([listing, ...listings]);
  };

  const updateListing = (updatedListing: Listing) => {
    setListings(listings.map(l => l.id === updatedListing.id ? updatedListing : l));
  };

  const deleteListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const updateProfile = (updatedProfile: Profile) => {
    const exists = profiles.find(p => p.userId === updatedProfile.userId);
    if (exists) {
      setProfiles(profiles.map(p => p.userId === updatedProfile.userId ? updatedProfile : p));
    } else {
      setProfiles([...profiles, updatedProfile]);
    }
  };

  return (
    <DataContext.Provider value={{ profiles, listings, addListing, updateListing, deleteListing, updateProfile }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
