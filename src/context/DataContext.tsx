import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, Listing, Interaction } from '../types';
import { mockProfiles, mockListings } from '../data/mockData';

interface DataContextType {
  profiles: Profile[];
  listings: Listing[];
  interactions: Interaction[];
  addListing: (listing: Listing) => void;
  updateListing: (listing: Listing) => void;
  deleteListing: (id: string) => void;
  updateProfile: (profile: Profile) => void;
  addInteraction: (toUserId: string, type: 'like' | 'pass', fromUserId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [listings, setListings] = useState<Listing[]>(mockListings);
  
  // Preload some interactions so the demo user has people who already liked them
  const [interactions, setInteractions] = useState<Interaction[]>([
    { fromUserId: 'u2', toUserId: 'u1', type: 'like' }, // Sarah liked Alex
    { fromUserId: 'u3', toUserId: 'u1', type: 'like' }, // Mike liked Alex
    { fromUserId: 'u5', toUserId: 'u1', type: 'like' }, // David liked Alex
    { fromUserId: 'u6', toUserId: 'u1', type: 'like' }, // Jessica liked Alex
    { fromUserId: 'u8', toUserId: 'u1', type: 'pass' }, // Chloe passed Alex
  ]);

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

  const addInteraction = (toUserId: string, type: 'like' | 'pass', fromUserId: string) => {
    setInteractions(prev => [...prev, { fromUserId, toUserId, type }]);
  };

  return (
    <DataContext.Provider value={{ profiles, listings, interactions, addListing, updateListing, deleteListing, updateProfile, addInteraction }}>
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
