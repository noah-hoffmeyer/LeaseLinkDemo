import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Plus, MapPin, Bed, Bath, Calendar, Edit, Trash2, Search } from 'lucide-react';
import ListingForm from './ListingForm';

export default function Listings() {
  const { listings, deleteListing } = useData();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = useMemo(() => {
    if (!searchQuery.trim()) return listings;
    const query = searchQuery.toLowerCase();
    return listings.filter(l => 
      l.title.toLowerCase().includes(query) || 
      l.location.toLowerCase().includes(query) ||
      l.description.toLowerCase().includes(query)
    );
  }, [listings, searchQuery]);

  const handleEdit = (id: string) => {
    setEditingListingId(id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(id);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingListingId(null);
  };

  if (isFormOpen) {
    return <ListingForm onClose={closeForm} listingId={editingListingId} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Housing Listings</h1>
          <p className="text-stone-500">Find a place or list your spare room.</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-xl leading-5 bg-white placeholder-stone-500 focus:outline-none focus:placeholder-stone-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
            <div className="h-48 bg-stone-200 relative">
              {listing.images && listing.images.length > 0 ? (
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">No Image</div>
              )}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-stone-900 shadow-sm">
                ${listing.price}/mo
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-stone-900 line-clamp-1">{listing.title}</h3>
              <div className="flex items-center text-stone-500 text-sm mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </div>
              
              <div className="flex items-center gap-4 mt-4 text-sm text-stone-600">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1 text-stone-400" />
                  {listing.bedrooms} Beds
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1 text-stone-400" />
                  {listing.bathrooms} Baths
                </div>
              </div>

              <div className="flex items-center text-sm text-stone-600 mt-2">
                <Calendar className="w-4 h-4 mr-1 text-stone-400" />
                Avail: {new Date(listing.availableDate).toLocaleDateString()}
              </div>

              <p className="mt-4 text-sm text-stone-500 line-clamp-2 flex-1">
                {listing.description}
              </p>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {listing.amenities.slice(0, 3).map(amenity => (
                    <span key={amenity} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-800">
                      {amenity}
                    </span>
                  ))}
                  {listing.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-500">
                      +{listing.amenities.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {user?.id === listing.userId && (
                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(listing.id)}
                    className="p-2 text-stone-400 hover:text-emerald-600 transition-colors"
                    title="Edit Listing"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredListings.length === 0 && (
          <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 border-dashed">
            {searchQuery ? 'No listings match your search.' : 'No listings available right now. Be the first to create one!'}
          </div>
        )}
      </div>
    </div>
  );
}
