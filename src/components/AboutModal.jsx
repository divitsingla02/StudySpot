import React from 'react';
import { X, MapPin, Sparkles, ShieldCheck, Zap, HeartHandshake, Compass } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-card max-w-lg w-full max-h-[90vh] overflow-y-auto border border-borderLight shadow-modal p-6 md:p-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between pb-4 border-b border-borderLight">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal">About StudySpot</h3>
              <p className="text-xs text-charcoal-400 font-medium">Smart Campus Space Discovery & Booking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-400 hover:text-charcoal-700 p-1.5 rounded-lg hover:bg-charcoal-50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm text-charcoal-600 leading-relaxed">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forest-50 text-forest-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tagline
            </span>
            <p className="text-base font-semibold text-charcoal-800 italic">
              "Find your space. Find your focus."
            </p>
          </div>

          <p>
            StudySpot is engineered for collegiate productivity. We eliminate the frustration of wandering through multistory libraries and crowded campus cafes trying to find an open desk with power outlets and the right noise ambiance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-forest-50/50 border border-forest-100">
              <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs mb-1">
                <Zap className="w-4 h-4" />
                Live Occupancy Logic
              </div>
              <p className="text-xs text-charcoal-500">
                Spaces are categorized as Available (&lt;60%), Filling Fast (60–85%), or Crowded (&gt;85%).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200">
              <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs mb-1">
                <Compass className="w-4 h-4" />
                Ambiance Matching
              </div>
              <p className="text-xs text-charcoal-500">
                Filter by Silent, Low, Moderate, or Lively zones depending on whether you need silence or teamwork.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-charcoal-50 border border-charcoal-100">
            <div className="flex items-center gap-2 text-charcoal-800 font-semibold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-forest-500" />
              Simulated Frontend Reservation System
            </div>
            <p className="text-xs text-charcoal-500">
              Bookings and seat occupancy are saved in browser LocalStorage. Reservations automatically reserve 1 hour and guard against overcapacity or double-booking.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-borderLight text-xs text-charcoal-400">
            <span>StudySpot v1.2 &bull; Campus Edition</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white font-medium rounded-lg transition-colors"
            >
              Back to Spaces
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

