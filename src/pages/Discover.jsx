import React, { useState, useMemo, useRef } from 'react';
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Sparkles, 
  SearchX, 
  RotateCcw,
  Users,
  Compass,
  Zap,
  ShieldCheck
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SpaceCard from '../components/SpaceCard';
import LocationDetailsModal from '../components/LocationDetailsModal';
import BookingModal from '../components/BookingModal';
import { CAMPUS_OPTIONS } from '../data/spaces';
import { getAvailabilityStatus } from '../utils/bookingUtils';

export default function Discover({ 
  spaces, 
  onConfirmBooking, 
  onShowToast, 
  searchQuery, 
  setSearchQuery,
  searchRef
}) {
  const [selectedCampus, setSelectedCampus] = useState(CAMPUS_OPTIONS[0].name);
  const [category, setCategory] = useState('All');
  const [noiseLevel, setNoiseLevel] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [minCapacity, setMinCapacity] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');

  // Modals state
  const [detailsSpace, setDetailsSpace] = useState(null);
  const [bookingSpace, setBookingSpace] = useState(null);

  // Dynamic Statistics from live spaces data
  const stats = useMemo(() => {
    const total = spaces.length;
    const available = spaces.filter(s => getAvailabilityStatus(s) === 'Available').length;
    const fillingFast = spaces.filter(s => getAvailabilityStatus(s) === 'Filling Fast').length;
    const crowded = spaces.filter(s => getAvailabilityStatus(s) === 'Crowded').length;
    const totalCapacity = spaces.reduce((acc, s) => acc + s.capacity, 0);
    const totalOccupied = spaces.reduce((acc, s) => acc + s.occupied, 0);
    const freeSeats = Math.max(0, totalCapacity - totalOccupied);

    return { total, available, fillingFast, crowded, freeSeats };
  }, [spaces]);

  // Active filters check
  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    category !== 'All' ||
    noiseLevel !== 'All' ||
    availability !== 'All' ||
    minCapacity > 0 ||
    sortBy !== 'recommended'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setNoiseLevel('All');
    setAvailability('All');
    setMinCapacity(0);
    setSortBy('recommended');
    onShowToast?.({
      type: 'info',
      title: 'Filters Cleared',
      message: 'Restored all campus study spaces.'
    });
  };

  // Filter & Search Logic
  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      // 1. Text search (matches name, building, floor, description, amenities)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = space.name.toLowerCase().includes(q);
        const matchesBuilding = space.building.toLowerCase().includes(q);
        const matchesFloor = space.floor.toLowerCase().includes(q);
        const matchesCategory = space.category.toLowerCase().includes(q);
        const matchesAmenities = space.amenities.some(a => a.toLowerCase().includes(q));
        if (!matchesName && !matchesBuilding && !matchesFloor && !matchesCategory && !matchesAmenities) {
          return false;
        }
      }

      // 2. Category filter
      if (category !== 'All' && space.category !== category) {
        return false;
      }

      // 3. Noise level filter
      if (noiseLevel !== 'All' && space.noiseLevel !== noiseLevel) {
        return false;
      }

      // 4. Availability filter
      if (availability !== 'All') {
        const spaceStatus = getAvailabilityStatus(space);
        if (spaceStatus !== availability) {
          return false;
        }
      }

      // 5. Min capacity filter
      if (minCapacity > 0 && space.capacity < minCapacity) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'availability') {
        // Most available seats first
        const freeA = a.capacity - a.occupied;
        const freeB = b.capacity - b.occupied;
        return freeB - freeA;
      }
      if (sortBy === 'capacity-desc') {
        return b.capacity - a.capacity;
      }
      if (sortBy === 'capacity-asc') {
        return a.capacity - b.capacity;
      }
      if (sortBy === 'occupied-asc') {
        return a.occupied - b.occupied;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // 'recommended' - default stable ordering
      return 0;
    });
  }, [spaces, searchQuery, category, noiseLevel, availability, minCapacity, sortBy]);

  return (
    <div className="min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="pt-10 md:pt-14 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        
        {/* Campus Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-100 text-xs font-semibold text-forest-700 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-forest-500" />
          <span>Real-time Campus Seat Intelligence</span>
        </div>

        {/* Headings */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
            Find your perfect study spot.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Discover available spaces across your campus, based on availability, noise levels and your preferences.
          </p>
        </div>

        {/* Prominent Search Bar with Campus Selector */}
        <div className="pt-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            selectedCampus={selectedCampus}
            onSelectCampus={setSelectedCampus}
            campuses={CAMPUS_OPTIONS}
            inputRef={searchRef}
          />
        </div>

        {/* Dynamic Metric Stat Cards */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          
          {/* Total spaces */}
          <div className="bg-white rounded-2xl p-4 border border-borderLight shadow-subtle text-left flex flex-col justify-between">
            <div className="flex items-center justify-between text-charcoal-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Spaces</span>
              <Building2 className="w-4 h-4 text-charcoal-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-charcoal">{stats.total}</span>
              <p className="text-[11px] text-charcoal-400 mt-0.5">Across 12 campus wings</p>
            </div>
          </div>

          {/* Available now */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-subtle text-left flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Available Now</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-emerald-700">{stats.available}</span>
              <p className="text-[11px] text-emerald-600 mt-0.5">{stats.freeSeats} open seats</p>
            </div>
          </div>

          {/* Filling Fast */}
          <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-subtle text-left flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Filling Fast</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-amber-700">{stats.fillingFast}</span>
              <p className="text-[11px] text-amber-600 mt-0.5">60% to 85% full</p>
            </div>
          </div>

          {/* Crowded */}
          <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-subtle text-left flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Crowded</span>
              <Users className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-rose-700">{stats.crowded}</span>
              <p className="text-[11px] text-rose-600 mt-0.5">&gt;85% capacity</p>
            </div>
          </div>

        </div>

      </section>

      {/* Main Content & Discovery Stream */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Interactive Filter Bar */}
        <FilterBar
          category={category}
          setCategory={setCategory}
          noiseLevel={noiseLevel}
          setNoiseLevel={setNoiseLevel}
          availability={availability}
          setAvailability={setAvailability}
          minCapacity={minCapacity}
          setMinCapacity={setMinCapacity}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredSpaces.length}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Space Cards Grid */}
        {filteredSpaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredSpaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onViewDetails={(s) => setDetailsSpace(s)}
                onBook={(s) => setBookingSpace(s)}
              />
            ))}
          </div>
        ) : (
          /* Empty State for Filters */
          <div className="bg-white rounded-2xl border border-borderLight p-12 text-center max-w-lg mx-auto shadow-subtle my-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center mx-auto border border-forest-100">
              <SearchX className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-charcoal">No study spaces found</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any campus locations matching your exact filters and query. Try clearing filters or lowering minimum seating.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Location Details Modal */}
      <LocationDetailsModal
        space={detailsSpace}
        isOpen={Boolean(detailsSpace)}
        onClose={() => setDetailsSpace(null)}
        onBookNow={(s) => setBookingSpace(s)}
      />

      {/* Booking Modal */}
      <BookingModal
        space={bookingSpace}
        isOpen={Boolean(bookingSpace)}
        onClose={() => setBookingSpace(null)}
        onConfirmBooking={onConfirmBooking}
      />

    </div>
  );
}

