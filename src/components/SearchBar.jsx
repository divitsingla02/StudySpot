import React, { useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal, MapPin } from 'lucide-react';

export default function SearchBar({ 
  value, 
  onChange, 
  onClear, 
  selectedCampus, 
  onSelectCampus, 
  campuses,
  inputRef 
}) {
  const localRef = useRef(null);
  const activeInputRef = inputRef || localRef;

  // Global hotkey '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        activeInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeInputRef]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-borderLight shadow-elevated p-2 md:p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2 transition-all focus-within:border-forest-500 focus-within:ring-2 focus-within:ring-forest-100">
        
        {/* Campus Location Selector */}
        <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-borderLight flex-shrink-0">
          <MapPin className="w-4 h-4 text-forest-500 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
              Campus Location
            </span>
            <select
              value={selectedCampus}
              onChange={(e) => onSelectCampus(e.target.value)}
              className="text-xs font-semibold text-charcoal-800 bg-transparent border-none outline-none cursor-pointer pr-4 focus:ring-0 -ml-0.5"
            >
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.name}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Search Input */}
        <div className="flex items-center flex-1 px-3 py-1 gap-2 min-w-0">
          <Search className="w-4 h-4 text-charcoal-400 flex-shrink-0" />
          <input
            ref={activeInputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search classrooms, libraries, cafes, buildings..."
            className="w-full text-sm font-medium text-charcoal-900 placeholder:text-charcoal-400 bg-transparent border-none outline-none focus:ring-0"
          />
          {value && (
            <button
              onClick={onClear}
              className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search quick button */}
        <div className="flex items-center justify-end px-1">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-charcoal-400 px-3 py-2 bg-charcoal-50 rounded-xl font-medium">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-charcoal-200 text-charcoal-700 shadow-2xs">
              /
            </kbd>
            <span>to focus</span>
          </div>
        </div>
      </div>
    </div>
  );
}

