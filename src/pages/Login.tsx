import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, GraduationCap } from 'lucide-react';

export default function Login() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith('.edu')) {
      setError('Please use a valid .edu student email address.');
      return;
    }
    login(email);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Welcome to LeaseLink</h2>
          <p className="text-stone-500 mt-2">Find the perfect roommate and student housing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Student Email (.edu)
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="you@university.edu"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Sign in with Email
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-stone-500">Live Showcase Demo</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={demoLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-stone-300 rounded-xl shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              One-Click Demo Login
            </button>
            <p className="text-xs text-center text-stone-400 mt-3">
              Logs you in as Alex Johnson with preloaded test data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
