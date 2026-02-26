import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Calendar, Coffee, Moon, Cigarette, Dog, X, Heart, CheckCircle, Search } from 'lucide-react';

export default function Discover() {
  const { profiles, interactions, addInteraction } = useData();
  const { user } = useAuth();
  
  const [showMatchPopup, setShowMatchPopup] = useState<string | null>(null);

  const myProfile = useMemo(() => profiles.find(p => p.userId === user?.id), [profiles, user]);

  // Filter out profiles we've already interacted with
  const availableProfiles = useMemo(() => {
    if (!user) return [];
    const interactedUserIds = interactions
      .filter(i => i.fromUserId === user.id)
      .map(i => i.toUserId);
      
    return profiles.filter(p => p.userId !== user.id && !interactedUserIds.includes(p.userId));
  }, [profiles, interactions, user]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProfile = availableProfiles[currentIndex];

  const calculateScore = (profile: any) => {
    if (!myProfile) return 0;
    let score = 0;
    
    const budgetOverlap = Math.max(0, Math.min(myProfile.budgetMax, profile.budgetMax) - Math.max(myProfile.budgetMin, profile.budgetMin));
    if (budgetOverlap > 0) score += 30;
    
    const cleanDiff = Math.abs(myProfile.lifestyle.cleanliness - profile.lifestyle.cleanliness);
    if (cleanDiff <= 1) score += 20;
    
    if (myProfile.lifestyle.sleepSchedule === profile.lifestyle.sleepSchedule || myProfile.lifestyle.sleepSchedule === 'flexible' || profile.lifestyle.sleepSchedule === 'flexible') score += 20;
    if (myProfile.lifestyle.smoking === profile.lifestyle.smoking) score += 15;
    if (myProfile.lifestyle.pets === profile.lifestyle.pets) score += 15;
    
    return score;
  };

  const handleAction = (type: 'like' | 'pass') => {
    if (!user || !currentProfile) return;
    
    addInteraction(currentProfile.userId, type, user.id);
    
    // Check for mutual match
    if (type === 'like') {
      const isMutual = interactions.some(i => i.fromUserId === currentProfile.userId && i.toUserId === user.id && i.type === 'like');
      if (isMutual) {
        setShowMatchPopup(currentProfile.name);
        setTimeout(() => setShowMatchPopup(null), 3000);
      }
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  if (!myProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-stone-900 mb-2">Complete Your Profile</h2>
        <p className="text-stone-500 mb-6">You need to set up your profile preferences before discovering roommates.</p>
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

  if (!currentProfile) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">You're all caught up!</h2>
        <p className="text-stone-500">Check back later for new potential roommates.</p>
      </div>
    );
  }

  const matchScore = calculateScore(currentProfile);

  return (
    <div className="max-w-md mx-auto relative h-[calc(100vh-12rem)] min-h-[600px] flex flex-col">
      <AnimatePresence>
        {showMatchPopup && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-50 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-bold">It's a Match with {showMatchPopup.split(' ')[0]}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white rounded-3xl shadow-md border border-stone-200 overflow-hidden flex flex-col"
          >
            <div className="relative h-64 bg-stone-100 flex-shrink-0">
              <img 
                src={currentProfile.avatar} 
                alt={currentProfile.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-emerald-600 shadow-sm flex items-center gap-1">
                {matchScore}% Match
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                <h2 className="text-3xl font-bold text-white mb-1">{currentProfile.name}</h2>
                <p className="text-white/90 text-sm font-medium">
                  ${currentProfile.budgetMin} - ${currentProfile.budgetMax} / month
                </p>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center bg-stone-100 px-3 py-1 rounded-full text-sm text-stone-700 font-medium">
                  <BookOpen className="w-4 h-4 mr-2 text-stone-400" />
                  {currentProfile.major}
                </span>
                <span className="inline-flex items-center bg-stone-100 px-3 py-1 rounded-full text-sm text-stone-700 font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-stone-400" />
                  {currentProfile.year}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">About Me</h3>
                <p className="text-stone-600 leading-relaxed">
                  "{currentProfile.bio}"
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">Lifestyle</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="flex items-center text-sm text-stone-600">
                    <Coffee className="w-5 h-5 mr-3 text-stone-400" />
                    Cleanliness: {currentProfile.lifestyle.cleanliness}/5
                  </div>
                  <div className="flex items-center text-sm text-stone-600">
                    <Moon className="w-5 h-5 mr-3 text-stone-400" />
                    <span className="capitalize">{currentProfile.lifestyle.sleepSchedule}</span>
                  </div>
                  <div className="flex items-center text-sm text-stone-600">
                    <Cigarette className="w-5 h-5 mr-3 text-stone-400" />
                    {currentProfile.lifestyle.smoking ? 'Smoker' : 'Non-smoker'}
                  </div>
                  <div className="flex items-center text-sm text-stone-600">
                    <Dog className="w-5 h-5 mr-3 text-stone-400" />
                    {currentProfile.lifestyle.pets ? 'Has Pets' : 'No Pets'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6 mt-6 pb-4">
        <button
          onClick={() => handleAction('pass')}
          className="w-16 h-16 bg-white rounded-full shadow-md border border-stone-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all hover:scale-105 active:scale-95"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleAction('like')}
          className="w-16 h-16 bg-white rounded-full shadow-md border border-stone-200 flex items-center justify-center text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200 transition-all hover:scale-105 active:scale-95"
        >
          <Heart className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}
