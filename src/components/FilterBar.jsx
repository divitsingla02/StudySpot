import React from 'react';
import { 
  Building2, 
  BookOpen, 
  Coffee, 
  Layers, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ArrowUpDown,
  Users
} from 'lucide-react';

export default function FilterBar({
  category,
  setCategory,
  noiseLevel,
  setNoiseLevel,
  availability,
  setAvailability,
  minCapacity,
  setMinCapacity,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults,
  hasActiveFilters
}) {
  const categories = [
    { id: 'All', label: 'All Spaces', icon: Layers },
    { id: 'Classrooms', label: 'Classrooms', icon: Building2 },
    { id: 'Library', label: 'Library', icon: BookOpen },
    { id: 'Cafes', label: 'Cafes', icon: Coffee },
  ];

  const noiseLevels = [
    { id: 'All', label: 'Any Noise' },
    { id: 'Silent', label: 'Silent Zone' },
    { id: 'Low', label: 'Low Noise' },
    { id: 'Moderate', label: 'Moderate' },
    { id: 'Lively', label: 'Lively' },
  ];

  const availabilities = [
    { id: 'All', label: 'All Statuses' },
    { id: 'Available', label: 'Available (<60%)' },
    { id: 'Filling Fast', label: 'Filling Fast (60-85%)' },
    { id: 'Crowded', label: 'Crowded (>85%)' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-borderLight shadow-subtle p-4 md:p-5 space-y-4">
      
      {/* Category Pills Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-borderLight">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-forest-500 text-white shadow-xs'
                    : 'bg-charcoal-50 text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-charcoal-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clear Filters & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-medium text-charcoal-500">
            Showing <strong className="text-charcoal font-semibold">{totalResults}</strong> {totalResults === 1 ? 'spot' : 'spots'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls: Noise, Availability, Capacity, Sorting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Noise Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-forest-500" />
            Noise Level
          </label>
          <select
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(e.target.value)}
            className="w-full text-xs font-medium text-charcoal-800 bg-charcoal-50 hover:bg-charcoal-100/70 border border-charcoal-100 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all cursor-pointer"
          >
            {noiseLevels.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-forest-500" />
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full text-xs font-medium text-charcoal-800 bg-charcoal-50 hover:bg-charcoal-100/70 border border-charcoal-100 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all cursor-pointer"
          >
            {availabilities.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        </div>

        {/* Min Capacity Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-forest-500" />
            Min Capacity
          </label>
          <select
            value={minCapacity}
            onChange={(e) => setMinCapacity(Number(e.target.value))}
            className="w-full text-xs font-medium text-charcoal-800 bg-charcoal-50 hover:bg-charcoal-100/70 border border-charcoal-100 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value={0}>Any Seating Capacity</option>
            <option value={20}>20+ Seats</option>
            <option value={30}>30+ Seats</option>
            <option value={40}>40+ Seats</option>
            <option value={50}>50+ Seats</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-forest-500" />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-xs font-medium text-charcoal-800 bg-charcoal-50 hover:bg-charcoal-100/70 border border-charcoal-100 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="recommended">Recommended &bull; Default</option>
            <option value="availability">Availability (Most Open first)</option>
            <option value="capacity-desc">Capacity (High to Low)</option>
            <option value="capacity-asc">Capacity (Low to High)</option>
            <option value="occupied-asc">Fewest People Occupying</option>
            <option value="name">Alphabetical (A - Z)</option>
          </select>
        </div>

      </div>
    </div>
  );
}

