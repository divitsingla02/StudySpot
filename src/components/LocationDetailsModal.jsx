import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  CalendarCheck,
  Building2,
  BookOpen,
  Coffee,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  getOccupancyPercentage, 
  getAvailabilityStatus, 
  getAvailabilityBadgeStyle, 
  getNoiseBadgeStyle 
} from '../utils/bookingUtils';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80";

export default function LocationDetailsModal({ space, isOpen, onClose, onBookNow }) {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(space?.image || FALLBACK_IMAGE);

  if (!isOpen || !space) return null;

  const occupancyPercent = getOccupancyPercentage(space.occupied, space.capacity);
  const remainingSeats = Math.max(0, space.capacity - space.occupied);
  const status = getAvailabilityStatus(space);
  const statusStyle = getAvailabilityBadgeStyle(status);
  const noiseStyle = getNoiseBadgeStyle(space.noiseLevel);
  const isFull = space.occupied >= space.capacity;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-card max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-borderLight shadow-modal animate-in zoom-in-95 duration-200 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header & Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-charcoal-200 overflow-hidden flex-shrink-0">
          <img
            src={imgSrc}
            alt={space.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Actions: Close & Share */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs backdrop-blur-md ${statusStyle.bg}`}>
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`} />
              {statusStyle.text}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                title="Copy share link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                {space.category}
              </span>
              <span>&bull;</span>
              <span className="text-xs text-white/80">{space.building}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {space.name}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Key Quick Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-charcoal-50 border border-charcoal-100 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-charcoal-400">Available</span>
              <span className="text-base font-bold text-charcoal-900 mt-0.5">
                {remainingSeats} seats
              </span>
              <span className="text-[10px] text-charcoal-400">of {space.capacity} total</span>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-50 border border-charcoal-100 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-charcoal-400">Occupancy</span>
              <span className="text-base font-bold text-charcoal-900 mt-0.5">
                {occupancyPercent}%
              </span>
              <span className="text-[10px] text-charcoal-400">{space.occupied} seated</span>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-50 border border-charcoal-100 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-charcoal-400">Noise Level</span>
              <span className="text-sm font-bold text-charcoal-900 mt-0.5 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-forest-500" />
                {space.noiseLevel}
              </span>
              <span className="text-[10px] text-charcoal-400">Campus acoustic rating</span>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-50 border border-charcoal-100 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-charcoal-400">Hours</span>
              <span className="text-xs font-bold text-charcoal-900 mt-1 truncate" title={space.openingHours}>
                {space.openingHours}
              </span>
              <span className="text-[10px] text-charcoal-400">Daily schedule</span>
            </div>
          </div>

          {/* Live Visual Occupancy Bar */}
          <div className="p-4 rounded-xl bg-sage-50/60 border border-sage-200/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-charcoal-700">Live Space Utilization</span>
              <span className="text-forest-700">{space.occupied} of {space.capacity} seats occupied ({occupancyPercent}%)</span>
            </div>
            <div className="w-full bg-charcoal-200/60 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${statusStyle.bar}`}
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-charcoal-500">
              * Updated automatically based on verified card-swipes and student active reservations.
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-400 mb-2">
              Space Overview
            </h4>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {space.description}
            </p>
          </div>

          {/* Exact Location & Floor Plan */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-charcoal-50 border border-charcoal-100 text-xs text-charcoal-700">
            <MapPin className="w-5 h-5 text-forest-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-900">Exact Campus Location</p>
              <p className="text-charcoal-500 mt-0.5">{space.building} &bull; Floor / Wing: <strong className="text-charcoal-800 font-medium">{space.floor}</strong></p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-400 mb-3">
              Included Amenities & Equipment
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {space.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-borderLight shadow-2xs text-xs text-charcoal-800 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking duration & rules */}
          <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-100/80 flex items-start gap-2.5 text-xs text-forest-900">
            <ShieldCheck className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Simulated 1-Hour Reservation System</p>
              <p className="text-forest-700 mt-0.5 leading-relaxed">
                StudySpot allows fast 1-hour focus holds. After reserving, your seat is guaranteed for the selected window. No fees or credit cards needed.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-borderLight bg-charcoal-50/50 flex items-center justify-between gap-3">
          <div className="text-xs text-charcoal-500 hidden sm:block">
            {isFull ? (
              <span className="text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Capacity reached &bull; Please check other spots
              </span>
            ) : (
              <span>Ready for study session &bull; Instant confirmation</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-borderLight text-xs font-semibold text-charcoal-700 hover:bg-charcoal-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(space);
              }}
              disabled={isFull}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isFull
                  ? 'bg-charcoal-200 text-charcoal-400 cursor-not-allowed'
                  : 'bg-forest-500 hover:bg-forest-600 active:scale-[0.98] text-white shadow-xs cursor-pointer'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve for 1 Hour</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

