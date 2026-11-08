import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  CalendarCheck, 
  Compass, 
  Info, 
  Search, 
  Menu, 
  X, 
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenAbout, upcomingCount = 0, onFocusSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/');
    if (onFocusSearch) {
      setTimeout(onFocusSearch, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9F6]/90 backdrop-blur-md border-b border-borderLight/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="StudySpot Home"
          >
            <div className="w-9 h-9 rounded-xl bg-forest-500 text-white flex items-center justify-center shadow-sm group-hover:bg-forest-600 transition-colors">
              <MapPin className="w-5 h-5 fill-white/20 stroke-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-charcoal group-hover:text-forest-600 transition-colors">
                  StudySpot
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-forest-50 text-forest-700 border border-forest-100">
                  Campus
                </span>
              </div>
              <span className="text-[10px] text-charcoal-400 font-medium tracking-tight -mt-0.5">
                Find your space &bull; Find your focus
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forest-50 text-forest-700 font-semibold'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-black/5'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              Discover
            </NavLink>

            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                  isActive
                    ? 'bg-forest-50 text-forest-700 font-semibold'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-black/5'
                }`
              }
            >
              <CalendarCheck className="w-4 h-4" />
              <span>My Bookings</span>
              {upcomingCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-forest-500 text-white">
                  {upcomingCount}
                </span>
              )}
            </NavLink>

            <button
              onClick={onOpenAbout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-charcoal-900 hover:bg-black/5 transition-all"
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </nav>

          {/* Right Action Controls: Quick Search & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-borderLight bg-white/70 hover:bg-white text-xs text-charcoal-400 hover:text-charcoal-700 shadow-subtle transition-all cursor-pointer"
              title="Search campus spaces"
            >
              <Search className="w-3.5 h-3.5 text-charcoal-400" />
              <span className="hidden lg:inline">Quick search</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-charcoal-50 text-charcoal-500 border border-charcoal-100">
                /
              </kbd>
            </button>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-borderLight">
              <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-700 border border-forest-200 flex items-center justify-center font-semibold text-xs shadow-xs">
                AM
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-charcoal-800 leading-tight">Alex Mercer</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <p className="text-[10px] text-charcoal-400">Undergrad &bull; Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-600 hover:text-charcoal-900 hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-borderLight bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-forest-50 text-forest-700 font-semibold' : 'text-charcoal-700 hover:bg-black/5'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-forest-500" />
              <span>Discover Spaces</span>
            </div>
            <span className="text-xs text-charcoal-400">Explore</span>
          </NavLink>

          <NavLink
            to="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive ? 'bg-forest-50 text-forest-700 font-semibold' : 'text-charcoal-700 hover:bg-black/5'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4 text-forest-500" />
              <span>My Bookings</span>
            </div>
            {upcomingCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-forest-500 text-white">
                {upcomingCount} active
              </span>
            )}
          </NavLink>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-black/5 text-left"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-forest-500" />
              <span>About StudySpot</span>
            </div>
            <span className="text-xs text-charcoal-400">Guide</span>
          </button>

          <div className="pt-3 border-t border-borderLight flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center font-semibold text-xs">
                AM
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal-800">Alex Mercer</p>
                <p className="text-[10px] text-charcoal-400">alex.mercer@campus.edu</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              Student ID #20248
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

