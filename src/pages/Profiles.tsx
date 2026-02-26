import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Calendar, Coffee, Moon, Cigarette, Dog, Search } from 'lucide-react';

export default function Profiles() {
  const { profiles } = useData();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter out the current user's profile and apply search
  const filteredProfiles = useMemo(() => {
    const others = profiles.filter(p => p.userId !== user?.id);
    if (!searchQuery.trim()) return others;
    
    const query = searchQuery.toLowerCase();
    return others.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.major.toLowerCase().includes(query) ||
      p.bio.toLowerCase().includes(query)
    );
  }, [profiles, user, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Roommate Profiles</h1>
          <p className="text-stone-500">Browse other students looking for roommates.</p>
        </div>
        <div className="w-full sm:w-72 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, major, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-xl leading-5 bg-white placeholder-stone-500 focus:outline-none focus:placeholder-stone-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full border-4 border-stone-50" referrerPolicy="no-referrer" />
              <h3 className="text-lg font-bold text-stone-900 mt-3 text-center">{profile.name}</h3>
              <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-1">
                ${profile.budgetMin} - ${profile.budgetMax}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2 text-sm text-stone-600">
                <span className="inline-flex items-center bg-stone-100 px-2.5 py-1 rounded-full">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                  {profile.major}
                </span>
                <span className="inline-flex items-center bg-stone-100 px-2.5 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                  {profile.year}
                </span>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed">
                "{profile.bio}"
              </p>

              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div className="flex items-center text-stone-600">
                  <Coffee className="w-4 h-4 mr-2 text-stone-400" />
                  Cleanliness: {profile.lifestyle.cleanliness}/5
                </div>
                <div className="flex items-center text-stone-600">
                  <Moon className="w-4 h-4 mr-2 text-stone-400" />
                  Sleep: <span className="capitalize ml-1">{profile.lifestyle.sleepSchedule}</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <Cigarette className="w-4 h-4 mr-2 text-stone-400" />
                  Smoking: {profile.lifestyle.smoking ? 'Yes' : 'No'}
                </div>
                <div className="flex items-center text-stone-600">
                  <Dog className="w-4 h-4 mr-2 text-stone-400" />
                  Pets: {profile.lifestyle.pets ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredProfiles.length === 0 && (
          <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 border-dashed">
            {searchQuery ? 'No profiles match your search.' : 'No other profiles found.'}
          </div>
        )}
      </div>
    </div>
  );
}
