import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Home, Users, UserCircle, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Layout({ children, currentPath, navigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Listings', path: '/listings', icon: Home },
    { name: 'Roommates', path: '/profiles', icon: Users },
    { name: 'Matches', path: '/matches', icon: Users },
    { name: 'My Profile', path: '/my-profile', icon: UserCircle },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => handleNav('/')} className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  L
                </div>
                <span className="font-bold text-xl tracking-tight text-stone-900">LeaseLink</span>
              </button>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNav(item.path)}
                      className={`${
                        currentPath === item.path
                          ? 'border-emerald-500 text-stone-900'
                          : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="hidden md:flex items-center">
              {user && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-stone-200" referrerPolicy="no-referrer" />
                    <span className="text-sm font-medium text-stone-700">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                    title="Log out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 bg-white">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.path)}
                    className={`${
                      currentPath === item.path
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-transparent text-stone-600 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-800'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex items-center`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-stone-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" referrerPolicy="no-referrer" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-stone-800">{user.name}</div>
                    <div className="text-sm font-medium text-stone-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="block px-4 py-2 text-base font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
