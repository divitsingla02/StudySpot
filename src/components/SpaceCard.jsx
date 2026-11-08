import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Wifi, 
  Zap, 
  Clock, 
  ChevronRight, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Coffee, 
  Building2, 
  CalendarCheck,
  Heart
} from 'lucide-react';
import { 
  getOccupancyPercentage, 
  getAvailabilityStatus, 
  getAvailabilityBadgeStyle, 
  getNoiseBadgeStyle 
} from '../utils/bookingUtils';

// Fallback high quality SVG for spaces if image fails
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80";

export default function SpaceCard({ 
  space, 
  onViewDetails, 
  onBook,
  isBookmarked = false,
  onToggleBookmark
}) {
  const [imgSrc, setImgSrc] = useState(space.image);
  const occupancyPercent = getOccupancyPercentage(space.occupied, space.capacity);
  const remainingSeats = Math.max(0, space.capacity - space.occupied);
  const status = getAvailabilityStatus(space);
  const statusStyle = getAvailabilityBadgeStyle(status);
  const noiseStyle = getNoiseBadgeStyle(space.noiseLevel);
  const isFull = space.occupied >= space.capacity;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Library':
        return <BookOpen className="w-3.5 h-3.5 text-forest-600" />;
      case 'Cafes':
        return <Coffee className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Building2 className="w-3.5 h-3.5 text-sky-600" />;
    }
  };

  return (
    <div className="group bg-white rounded-card border border-borderLight shadow-subtle hover:shadow-elevated transition-card overflow-hidden flex flex-col justify-between relative">
      
      {/* Card Header & Visual Media */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-charcoal-100">
          <img
            src={imgSrc}
            alt={space.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

          {/* Top Badges Floating */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {/* Category Tag */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-charcoal-800 shadow-xs backdrop-blur-xs">
              {getCategoryIcon(space.category)}
              {space.category}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Availability Status Badge */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs backdrop-blur-xs ${statusStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`} />
                {statusStyle.text}
              </span>

              {/* Bookmark Button */}
              {onToggleBookmark && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(space.id);
                  }}
                  className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                    isBookmarked
                      ? 'bg-rose-50 text-rose-600 shadow-xs ring-1 ring-rose-200'
                      : 'bg-black/30 hover:bg-black/50 text-white'
                  }`}
                  title={isBookmarked ? 'Remove from saved spots' : 'Save spot to favorites'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-500 stroke-rose-500' : 'stroke-white'}`} />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Overlay on Image: Noise Badge & Open Hours */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border backdrop-blur-xs ${noiseStyle.bg}`}>
              <Volume2 className={`w-3 h-3 ${noiseStyle.iconColor}`} />
              {noiseStyle.label}
            </span>

            <span className="text-[11px] font-medium bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-white/90">
              {space.openingHours}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-5 space-y-3.5">
          {/* Title & Building */}
          <div>
            <h3 className="text-base font-bold text-charcoal group-hover:text-forest-600 transition-colors line-clamp-1">
              {space.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" />
              <span className="truncate">{space.building} &bull; {space.floor}</span>
            </div>
          </div>

          {/* Live Occupancy Metric Bar */}
          <div className="bg-charcoal-50/70 p-3 rounded-xl border border-charcoal-100/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-1 text-charcoal-600">
                <Users className="w-3.5 h-3.5 text-charcoal-400" />
                <span>Occupancy:</span>
                <strong className="text-charcoal font-semibold">{space.occupied} / {space.capacity}</strong>
              </div>
              <span className={`text-[11px] font-bold ${isFull ? 'text-rose-600' : 'text-forest-700'}`}>
                {isFull ? 'No seats free' : `${remainingSeats} seats free`}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-charcoal-200/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${statusStyle.bar}`}
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
          </div>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {space.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-sage-50 text-forest-800 border border-sage-200/70"
              >
                {amenity}
              </span>
            ))}
            {space.amenities.length > 3 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md text-charcoal-400 bg-charcoal-50">
                +{space.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-4 pb-4 md:px-5 md:pb-5 pt-1 border-t border-borderLight/60 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => onViewDetails(space)}
          className="w-full py-2.5 px-3 rounded-xl border border-borderLight text-xs font-semibold text-charcoal-700 hover:text-charcoal-950 hover:bg-charcoal-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          View Details
        </button>

        <button
          onClick={() => onBook(space)}
          disabled={isFull}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            isFull
              ? 'bg-charcoal-100 text-charcoal-400 cursor-not-allowed'
              : 'bg-forest-500 hover:bg-forest-600 active:scale-[0.98] text-white shadow-xs cursor-pointer'
          }`}
          title={isFull ? 'This study space is currently full' : 'Reserve for 1 Hour'}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>{isFull ? 'Full' : 'Book 1 Hr'}</span>
        </button>
      </div>

    </div>
  );
}

