import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  Trash2, 
  Compass, 
  AlertCircle, 
  CheckCircle2, 
  QrCode, 
  Share2, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function MyBookings({ bookings, onCancelBooking, onShowToast }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'upcoming', 'past', 'cancelled'
  const [cancellingId, setCancellingId] = useState(null);

  // Groupings
  const upcomingBookings = bookings.filter(b => b.status === 'Upcoming');
  const pastBookings = bookings.filter(b => b.status === 'Completed');
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'Upcoming';
    if (activeTab === 'past') return b.status === 'Completed';
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return true; // 'all'
  });

  const handleCancelClick = (booking) => {
    setCancellingId(booking.id);
  };

  const confirmCancel = (bookingId) => {
    try {
      onCancelBooking(bookingId);
      setCancellingId(null);
      onShowToast?.({
        type: 'info',
        title: 'Reservation Cancelled',
        message: 'Your 1-hour reservation was cancelled and the seat was released to the campus pool.'
      });
    } catch (err) {
      onShowToast?.({
        type: 'error',
        title: 'Cancellation Error',
        message: err.message
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-borderLight">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forest-50 text-forest-700 mb-2 border border-forest-100">
            <CalendarCheck className="w-3.5 h-3.5 text-forest-500" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
            My Study Space Bookings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage your hourly reservations, active check-in passes, and study session history.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white text-xs font-semibold shadow-xs transition-colors self-start md:self-auto cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Find More Spaces</span>
        </Link>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 pt-6 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-forest-500 text-white shadow-xs'
              : 'bg-white border border-borderLight text-charcoal-600 hover:bg-charcoal-50'
          }`}
        >
          All Reservations ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-forest-500 text-white shadow-xs'
              : 'bg-white border border-borderLight text-charcoal-600 hover:bg-charcoal-50'
          }`}
        >
          <span>Upcoming</span>
          {upcomingBookings.length > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-forest-50 text-forest-700'
            }`}>
              {upcomingBookings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'past'
              ? 'bg-forest-500 text-white shadow-xs'
              : 'bg-white border border-borderLight text-charcoal-600 hover:bg-charcoal-50'
          }`}
        >
          Past / Completed ({pastBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'cancelled'
              ? 'bg-forest-500 text-white shadow-xs'
              : 'bg-white border border-borderLight text-charcoal-600 hover:bg-charcoal-50'
          }`}
        >
          Cancelled ({cancelledBookings.length})
        </button>
      </div>

      {/* Bookings List or Empty State */}
      <div className="pt-6">
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const isUpcoming = booking.status === 'Upcoming';
              const isCancelled = booking.status === 'Cancelled';
              const isConfirmingCancel = cancellingId === booking.id;

              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-subtle ${
                    isCancelled
                      ? 'border-charcoal-100/80 opacity-75'
                      : 'border-borderLight hover:shadow-elevated'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Space Info & Thumbnail */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <img
                        src={booking.image}
                        alt={booking.spaceName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-borderLight flex-shrink-0"
                      />

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-charcoal-100 text-charcoal-800">
                            ID: {booking.id}
                          </span>

                          {/* Status Badge */}
                          {isUpcoming && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Confirmed &bull; Upcoming
                            </span>
                          )}
                          {booking.status === 'Completed' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-charcoal-100 text-charcoal-700">
                              <CheckCircle2 className="w-3 h-3 text-charcoal-500" />
                              Completed
                            </span>
                          )}
                          {isCancelled && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                              Cancelled
                            </span>
                          )}

                          <span className="text-[11px] font-medium text-charcoal-400">
                            &bull; {booking.category}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-charcoal truncate">
                          {booking.spaceName}
                        </h3>

                        <p className="text-xs text-charcoal-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" />
                          <span>{booking.building} &bull; {booking.floor}</span>
                        </p>

                        {booking.purpose && (
                          <p className="text-xs text-forest-800 font-medium pt-0.5">
                            Focus: <span className="font-normal text-charcoal-600">{booking.purpose}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Time & Action Controls */}
                    <div className="flex flex-col sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-borderLight flex-shrink-0">
                      
                      <div className="sm:text-right space-y-0.5">
                        <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-charcoal">
                          <Clock className="w-3.5 h-3.5 text-forest-500" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        <p className="text-xs text-charcoal-500">
                          Date: <strong className="text-charcoal-800 font-semibold">{booking.date}</strong>
                        </p>
                        <p className="text-[11px] text-charcoal-400">
                          Reserved for: {booking.userName}
                        </p>
                      </div>

                      {/* Cancel Action */}
                      {isUpcoming && (
                        <div>
                          {isConfirmingCancel ? (
                            <div className="flex items-center gap-2 animate-in fade-in duration-150">
                              <span className="text-xs text-rose-700 font-medium">Cancel reservation?</span>
                              <button
                                onClick={() => confirmCancel(booking.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                              >
                                Yes, cancel
                              </button>
                              <button
                                onClick={() => setCancellingId(null)}
                                className="px-2.5 py-1.5 rounded-lg border border-borderLight text-charcoal-600 hover:bg-charcoal-50 text-xs font-medium transition-colors"
                              >
                                Back
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleCancelClick(booking)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                              title="Cancel upcoming reservation and free seat"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Cancel Booking</span>
                            </button>
                          )}
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-borderLight p-10 sm:p-14 text-center max-w-md mx-auto shadow-subtle space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center mx-auto border border-forest-100">
              <CalendarCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-charcoal">
                {activeTab === 'all'
                  ? 'No study reservations yet'
                  : `No ${activeTab} reservations`}
              </h3>
              <p className="text-xs text-charcoal-500 leading-relaxed max-w-xs mx-auto">
                Ready to find a quiet desk or cafe booth? Reserve a 1-hour spot in seconds and guarantee your desk.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Available Spaces</span>
            </Link>
          </div>
        )}
      </div>

      {/* Helpful Campus Reservation Tips Footer */}
      <div className="mt-12 p-5 rounded-2xl bg-white border border-borderLight shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal">StudySpot Campus Etiquette</h4>
            <p className="text-xs text-charcoal-500 mt-0.5">
              If your plans change, please cancel early to free up seats for fellow students.
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="text-xs font-bold text-forest-600 hover:text-forest-700 flex items-center gap-1 group whitespace-nowrap"
        >
          <span>Find more spots</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}

