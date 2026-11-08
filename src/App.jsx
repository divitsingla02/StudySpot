import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import MyBookings from './pages/MyBookings';
import Toast from './components/Toast';
import AboutModal from './components/AboutModal';
import { 
  getStoredSpaces, 
  getStoredBookings, 
  createBooking, 
  cancelBooking 
} from './utils/bookingUtils';
import { MapPin, Heart, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [spaces, setSpaces] = useState(() => getStoredSpaces());
  const [bookings, setBookings] = useState(() => getStoredBookings());
  const [toast, setToast] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Focus search helper
  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  // Upcoming bookings count for nav badge
  const upcomingCount = bookings.filter(b => b.status === 'Upcoming').length;

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Handler for booking creation
  const handleConfirmBooking = (bookingData) => {
    try {
      const { booking, updatedSpaces } = createBooking(bookingData);
      setSpaces(updatedSpaces);
      setBookings(getStoredBookings());

      showToast({
        type: 'success',
        title: 'Spot Reserved Successfully!',
        message: `Booking #${booking.id} confirmed for 1 hour at ${booking.spaceName} (${booking.timeSlot}).`
      });

      return booking;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Booking Failed',
        message: err.message || 'Unable to reserve this space.'
      });
      throw err;
    }
  };

  // Handler for booking cancellation
  const handleCancelBooking = (bookingId) => {
    try {
      const { bookings: updatedBookings, spaces: updatedSpaces } = cancelBooking(bookingId);
      setBookings(updatedBookings);
      setSpaces(updatedSpaces);
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Cancellation Error',
        message: err.message
      });
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-charcoal font-sans selection:bg-forest-100 selection:text-forest-800">
      
      {/* Top Navigation */}
      <Navbar
        onOpenAbout={() => setIsAboutOpen(true)}
        upcomingCount={upcomingCount}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main Routes */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Discover
                spaces={spaces}
                onConfirmBooking={handleConfirmBooking}
                onShowToast={showToast}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchRef={searchInputRef}
              />
            }
          />
          <Route
            path="/bookings"
            element={
              <MyBookings
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onShowToast={showToast}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Modals & Notifications */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Footer */}
      <footer className="border-t border-borderLight bg-white py-10 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-charcoal-500">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-forest-500 text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 fill-white/20 stroke-white" />
            </div>
            <div>
              <p className="font-bold text-charcoal-900 text-sm">StudySpot</p>
              <p className="text-[11px] text-charcoal-400">Campus Space Discovery & 1-Hour Focus Holds</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-charcoal-900 transition-colors"
            >
              About &amp; Campus Zones
            </button>
            <span className="text-borderLight">&bull;</span>
            <span className="flex items-center gap-1.5 text-forest-700 bg-forest-50 px-2.5 py-1 rounded-md font-medium border border-forest-100">
              <Shield className="w-3.5 h-3.5" />
              Real-time Campus Occupancy
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="font-medium text-charcoal-600">Find your space. Find your focus.</p>
            <p className="text-[11px] text-charcoal-400 mt-0.5">&copy; {new Date().getFullYear()} StudySpot &bull; Built for College Productivity</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

