import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  User, 
  FileText,
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getOccupancyPercentage, 
  getAvailabilityStatus, 
  getAvailabilityBadgeStyle,
  calculateEndTimeOneHourLater,
  generateTimeSlots
} from '../utils/bookingUtils';

export default function BookingModal({ space, isOpen, onClose, onConfirmBooking }) {
  if (!isOpen || !space) return null;

  const timeSlots = generateTimeSlots();
  const todayIso = new Date().toISOString().split('T')[0];
  
  // Tomorrow ISO
  const tomorrow = new Date(Date.now() + 86400000);
  const tomorrowIso = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [selectedStartTime, setSelectedStartTime] = useState(timeSlots[1] || "09:00 AM");
  const [userName, setUserName] = useState("Alex Mercer");
  const [purpose, setPurpose] = useState("Focused Deep Work");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const endTime = calculateEndTimeOneHourLater(selectedStartTime);
  const occupancyPercent = getOccupancyPercentage(space.occupied, space.capacity);
  const remainingSeats = Math.max(0, space.capacity - space.occupied);
  const status = getAvailabilityStatus(space);
  const statusStyle = getAvailabilityBadgeStyle(status);
  const isFull = space.occupied >= space.capacity;

  useEffect(() => {
    setErrorMsg(null);
  }, [selectedDate, selectedStartTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFull) {
      setErrorMsg("This space has reached its maximum capacity. Please pick another spot.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const result = onConfirmBooking({
        spaceId: space.id,
        startTime: selectedStartTime,
        date: selectedDate,
        userName,
        purpose
      });

      // Confetti celebratory burst for delightful UX!
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // ignore
      }

      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Failed to confirm reservation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-card max-w-xl w-full max-h-[92vh] overflow-y-auto border border-borderLight shadow-modal animate-in zoom-in-95 duration-200 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-borderLight flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-forest-50 text-forest-700 border border-forest-100">
                1-Hour Reservation
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusStyle.bg}`}>
                {statusStyle.text}
              </span>
            </div>
            <h2 className="text-xl font-bold text-charcoal tracking-tight">
              Reserve Study Spot
            </h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Instant campus focus pass &bull; Guaranteed desk seat
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-50 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Location Summary Box */}
        <div className="p-5 sm:p-6 py-4 bg-charcoal-50/70 border-b border-borderLight">
          <div className="flex items-start gap-3.5">
            <img
              src={space.image}
              alt={space.name}
              className="w-16 h-16 rounded-xl object-cover border border-borderLight shadow-2xs flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-charcoal truncate">
                {space.name}
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" />
                <span className="truncate">{space.building} &bull; {space.floor}</span>
              </p>
              
              <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                <span className="text-charcoal-600">
                  Occupancy: <strong>{space.occupied}/{space.capacity}</strong>
                </span>
                <span className={isFull ? 'text-rose-600 font-bold' : 'text-forest-700 font-bold'}>
                  {remainingSeats} seats available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 flex-1">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Reservation Blocked:</strong> {errorMsg}
              </div>
            </div>
          )}

          {/* Date Selector */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-forest-500" />
              Select Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedDate(todayIso)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  selectedDate === todayIso
                    ? 'border-forest-500 bg-forest-50 text-forest-700 ring-1 ring-forest-500'
                    : 'border-borderLight bg-white text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                Today ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(tomorrowIso)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  selectedDate === tomorrowIso
                    ? 'border-forest-500 bg-forest-50 text-forest-700 ring-1 ring-forest-500'
                    : 'border-borderLight bg-white text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                Tomorrow ({tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
              </button>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-forest-500" />
              Choose Start Time (1 Hour Slot)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 border border-borderLight rounded-xl bg-charcoal-50/50">
              {timeSlots.map((slot) => {
                const isSelected = selectedStartTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedStartTime(slot)}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                      isSelected
                        ? 'bg-forest-500 text-white shadow-xs'
                        : 'bg-white text-charcoal-700 hover:bg-charcoal-100/70 border border-borderLight/80'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Automatic 1-Hour Calculation Summary Banner */}
          <div className="p-3.5 rounded-xl bg-forest-50/80 border border-forest-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest-600" />
              <span className="text-forest-900 font-medium">Automatic Duration:</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-forest-800">
              <span>{selectedStartTime}</span>
              <ArrowRight className="w-3.5 h-3.5 text-forest-500" />
              <span>{endTime}</span>
              <span className="text-[10px] bg-forest-200/60 text-forest-800 px-1.5 py-0.5 rounded ml-1">
                (60 mins)
              </span>
            </div>
          </div>

          {/* User details and purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-forest-500" />
                Student Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full text-xs font-medium text-charcoal-900 bg-charcoal-50 border border-charcoal-200 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-forest-500" />
                Session Focus / Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs font-medium text-charcoal-900 bg-charcoal-50 border border-charcoal-200 rounded-xl px-3 py-2 outline-none focus:border-forest-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="Focused Deep Work">Focused Deep Work</option>
                <option value="Midterm / Final Exam Prep">Midterm / Final Exam Prep</option>
                <option value="Group Coursework Project">Group Coursework Project</option>
                <option value="Thesis & Research Reading">Thesis & Research Reading</option>
                <option value="Online Class / Lecture">Online Class / Lecture</option>
              </select>
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="p-3.5 rounded-xl bg-charcoal-50 border border-charcoal-100 text-xs space-y-1.5">
            <div className="flex justify-between text-charcoal-500">
              <span>Campus Venue</span>
              <strong className="text-charcoal-800 font-semibold">{space.name}</strong>
            </div>
            <div className="flex justify-between text-charcoal-500">
              <span>Date & Window</span>
              <strong className="text-charcoal-800 font-semibold">{selectedDate} &bull; {selectedStartTime} – {endTime}</strong>
            </div>
            <div className="flex justify-between text-charcoal-500">
              <span>Desk Access Fee</span>
              <strong className="text-forest-700 font-bold">Free ($0.00) &bull; Campus Student ID</strong>
            </div>
          </div>

          {/* Notice: Simulated Frontend Reservation */}
          <div className="flex items-center gap-2 text-[11px] text-charcoal-400 bg-charcoal-50/50 p-2.5 rounded-lg border border-charcoal-100/60">
            <Info className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" />
            <span>Simulated reservation: saves locally to your browser and updates live seat occupancy.</span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-borderLight">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-borderLight text-xs font-semibold text-charcoal-700 hover:bg-charcoal-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || isFull}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isFull
                  ? 'bg-charcoal-200 text-charcoal-400 cursor-not-allowed'
                  : 'bg-forest-500 hover:bg-forest-600 active:scale-[0.98] text-white shadow-xs cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{submitting ? 'Confirming...' : 'Confirm Booking'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

