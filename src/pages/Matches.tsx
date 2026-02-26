import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Profile } from '../types';
import { Star, Check, X, MessageCircle } from 'lucide-react';

export default function Matches() {
  const { profiles } = useData();
  const { user } = useAuth();
  const [messageSentTo, setMessageSentTo] = useState<string | null>(null);

  const myProfile = useMemo(() => profiles.find(p => p.userId === user?.id), [profiles, user]);

  const matches = useMemo(() => {
    if (!myProfile) return [];

    const otherProfiles = profiles.filter(p => p.userId !== user?.id);

    return otherProfiles.map(profile => {
      let score = 0;
      const details = [];

      // Budget Overlap (Max 30 points)
      const budgetOverlap = Math.max(0, Math.min(myProfile.budgetMax, profile.budgetMax) - Math.max(myProfile.budgetMin, profile.budgetMin));
      if (budgetOverlap > 0) {
        score += 30;
        details.push({ label: 'Budget Match', match: true });
      } else {
        details.push({ label: 'Budget Mismatch', match: false });
      }

      // Cleanliness (Max 20 points)
      const cleanDiff = Math.abs(myProfile.lifestyle.cleanliness - profile.lifestyle.cleanliness);
      if (cleanDiff <= 1) {
        score += 20;
        details.push({ label: 'Similar Cleanliness', match: true });
      } else {
        details.push({ label: 'Different Cleanliness', match: false });
      }

      // Sleep Schedule (Max 20 points)
      if (myProfile.lifestyle.sleepSchedule === profile.lifestyle.sleepSchedule || myProfile.lifestyle.sleepSchedule === 'flexible' || profile.lifestyle.sleepSchedule === 'flexible') {
        score += 20;
        details.push({ label: 'Compatible Sleep Schedule', match: true });
      } else {
        details.push({ label: 'Different Sleep Schedule', match: false });
      }

      // Smoking (Max 15 points)
      if (myProfile.lifestyle.smoking === profile.lifestyle.smoking) {
        score += 15;
        details.push({ label: 'Smoking Preference', match: true });
      } else {
        details.push({ label: 'Smoking Mismatch', match: false });
      }

      // Pets (Max 15 points)
      if (myProfile.lifestyle.pets === profile.lifestyle.pets) {
        score += 15;
        details.push({ label: 'Pet Preference', match: true });
      } else {
        details.push({ label: 'Pet Mismatch', match: false });
      }

      return { profile, score, details };
    }).sort((a, b) => b.score - a.score);
  }, [profiles, myProfile, user]);

  const handleMessage = (name: string) => {
    setMessageSentTo(name);
    setTimeout(() => setMessageSentTo(null), 3000);
  };

  if (!myProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-stone-900 mb-2">Complete Your Profile</h2>
        <p className="text-stone-500 mb-6">You need to set up your profile preferences before we can find matches.</p>
        <button 
          onClick={() => {
            window.history.pushState({}, '', '/my-profile');
            window.dispatchEvent(new Event('popstate'));
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Go to My Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Your Top Matches</h1>
        <p className="text-stone-500">Based on your budget and lifestyle preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map(({ profile, score, details }) => (
          <div key={profile.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-4">
                <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-lg font-bold text-stone-900">{profile.name}</h3>
                  <p className="text-sm text-stone-500">{profile.major}, {profile.year}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-emerald-600 font-bold text-2xl">
                  {score}%
                </div>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Match</span>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Compatibility Breakdown</h4>
              <ul className="space-y-3">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    {detail.match ? (
                      <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                    )}
                    <span className={detail.match ? 'text-stone-700 font-medium' : 'text-stone-500'}>
                      {detail.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-stone-100">
                <button 
                  onClick={() => handleMessage(profile.name)}
                  disabled={messageSentTo === profile.name}
                  className={`w-full flex justify-center items-center py-2.5 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${
                    messageSentTo === profile.name 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'border-stone-300 text-stone-700 bg-white hover:bg-stone-50'
                  }`}
                >
                  {messageSentTo === profile.name ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-emerald-500" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" />
                      Message {profile.name.split(' ')[0]}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 border-dashed">
            No matches found yet. Try adjusting your preferences!
          </div>
        )}
      </div>
    </div>
  );
}
