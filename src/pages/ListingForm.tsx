import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Listing } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ListingFormProps {
  onClose: () => void;
  listingId: string | null;
}

export default function ListingForm({ onClose, listingId }: ListingFormProps) {
  const { listings, addListing, updateListing } = useData();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<Partial<Listing>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    availableDate: new Date().toISOString().split('T')[0],
    images: ['https://picsum.photos/seed/newroom/600/400'],
    amenities: []
  });

  const availableAmenities = [
    'Furnished', 'WiFi Included', 'In-unit Laundry', 
    'Gym Access', 'Pool', 'Parking', 'Pet Friendly'
  ];

  useEffect(() => {
    if (listingId) {
      const existing = listings.find(l => l.id === listingId);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [listingId, listings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' ? Number(value) : value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => {
      const currentAmenities = prev.amenities || [];
      if (currentAmenities.includes(amenity)) {
        return { ...prev, amenities: currentAmenities.filter(a => a !== amenity) };
      } else {
        return { ...prev, amenities: [...currentAmenities, amenity] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (listingId) {
      updateListing(formData as Listing);
    } else {
      const newListing: Listing = {
        ...formData as Listing,
        id: `l_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
      };
      addListing(newListing);
    }
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
      <button
        onClick={onClose}
        className="flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Listings
      </button>

      <h2 className="text-2xl font-bold text-stone-900 mb-6">
        {listingId ? 'Edit Listing' : 'Create New Listing'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="e.g. Sunny Room near Campus"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Describe the place and what you're looking for..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700">Monthly Rent ($)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="e.g. Northside Apartments"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              required
              min="1"
              value={formData.bedrooms}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              required
              min="1"
              step="0.5"
              value={formData.bathrooms}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Available Date</label>
            <input
              type="date"
              name="availableDate"
              required
              value={formData.availableDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-3">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableAmenities.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(formData.amenities || []).includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
                />
                <span className="ml-2 text-sm text-stone-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-stone-300 rounded-xl shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {listingId ? 'Save Changes' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
