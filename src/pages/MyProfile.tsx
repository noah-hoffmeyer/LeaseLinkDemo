import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Profile } from '../types';
import { Save, CheckCircle } from 'lucide-react';

export default function MyProfile() {
  const { profiles, updateProfile } = useData();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<Partial<Profile>>({
    bio: '',
    budgetMin: 500,
    budgetMax: 1000,
    major: '',
    year: 'Freshman',
    lifestyle: {
      cleanliness: 3,
      sleepSchedule: 'flexible',
      smoking: false,
      pets: false
    }
  });

  useEffect(() => {
    if (user) {
      const existing = profiles.find(p => p.userId === user.id);
      if (existing) {
        setFormData(existing);
      } else {
        setFormData(prev => ({
          ...prev,
          name: user.name,
          avatar: user.avatar,
          userId: user.id
        }));
      }
    }
  }, [user, profiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('lifestyle.')) {
      const lifestyleKey = name.split('.')[1];
      let finalValue: any = value;
      
      if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'range') {
        finalValue = Number(value);
      }

      setFormData(prev => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle!,
          [lifestyleKey]: finalValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const profileToSave: Profile = {
      ...(formData as Profile),
      id: formData.id || `p_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    updateProfile(profileToSave);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">My Profile</h1>
        <p className="text-stone-500">Update your preferences to find better roommate matches.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-8">
        {/* Basic Info */}
        <div className="flex items-center gap-6 pb-8 border-b border-stone-100">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-2 border-stone-100" referrerPolicy="no-referrer" />
          <div>
            <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
            <p className="text-stone-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-stone-700">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Tell potential roommates about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">Major</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="e.g. Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">Min Budget ($/mo)</label>
            <input
              type="number"
              name="budgetMin"
              value={formData.budgetMin}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">Max Budget ($/mo)</label>
            <input
              type="number"
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Lifestyle Preferences */}
        <div className="pt-8 border-t border-stone-100">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Lifestyle Preferences</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Cleanliness Level (1 = Messy, 5 = Neat Freak): {formData.lifestyle?.cleanliness}
              </label>
              <input
                type="range"
                name="lifestyle.cleanliness"
                min="1"
                max="5"
                value={formData.lifestyle?.cleanliness}
                onChange={handleChange}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Sleep Schedule</label>
              <select
                name="lifestyle.sleepSchedule"
                value={formData.lifestyle?.sleepSchedule}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              >
                <option value="early">Early Bird</option>
                <option value="night">Night Owl</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div className="flex gap-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="lifestyle.smoking"
                  checked={formData.lifestyle?.smoking}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
                />
                <span className="ml-2 text-sm text-stone-700">I smoke</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="lifestyle.pets"
                  checked={formData.lifestyle?.pets}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
                />
                <span className="ml-2 text-sm text-stone-700">I have pets</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-stone-100">
          {saved && (
            <span className="text-emerald-600 text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Profile saved!
            </span>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
