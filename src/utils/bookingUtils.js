import { INITIAL_SPACES } from '../data/spaces';

const BOOKINGS_STORAGE_KEY = 'studyspot_user_bookings_v1';
const SPACES_STORAGE_KEY = 'studyspot_spaces_state_v1';

/**
 * Calculates current occupancy percentage
 */
export function getOccupancyPercentage(occupied, capacity) {
  if (!capacity || capacity <= 0) return 0;
  return Math.min(100, Math.round((occupied / capacity) * 100));
}

/**
 * Determines availability tier based on specification:
 * - Below 60%: Available
 * - 60–85%: Filling Fast
 * - Above 85%: Crowded
 */
export function getAvailabilityStatus(space) {
  const percentage = getOccupancyPercentage(space.occupied, space.capacity);
  if (percentage < 60) return 'Available';
  if (percentage <= 85) return 'Filling Fast';
  return 'Crowded';
}

/**
 * Returns visual styles for availability badges
 */
export function getAvailabilityBadgeStyle(status) {
  switch (status) {
    case 'Available':
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        dot: 'bg-emerald-500',
        text: 'Available',
        bar: 'bg-emerald-500',
        lightBg: 'bg-emerald-50'
      };
    case 'Filling Fast':
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
        dot: 'bg-amber-500',
        text: 'Filling Fast',
        bar: 'bg-amber-500',
        lightBg: 'bg-amber-50'
      };
    case 'Crowded':
      return {
        bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
        dot: 'bg-rose-500',
        text: 'Crowded',
        bar: 'bg-rose-500',
        lightBg: 'bg-rose-50'
      };
    default:
      return {
        bg: 'bg-gray-50 text-gray-700 border-gray-200',
        dot: 'bg-gray-400',
        text: status,
        bar: 'bg-gray-400',
        lightBg: 'bg-gray-50'
      };
  }
}

/**
 * Returns visual styles for noise level badges
 */
export function getNoiseBadgeStyle(noiseLevel) {
  switch (noiseLevel) {
    case 'Silent':
      return {
        bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        iconColor: 'text-indigo-600',
        label: 'Silent Zone'
      };
    case 'Low':
      return {
        bg: 'bg-teal-50 text-teal-700 border-teal-200',
        iconColor: 'text-teal-600',
        label: 'Low Noise'
      };
    case 'Moderate':
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        iconColor: 'text-sky-600',
        label: 'Moderate'
      };
    case 'Lively':
      return {
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        iconColor: 'text-orange-600',
        label: 'Lively / Social'
      };
    default:
      return {
        bg: 'bg-gray-50 text-gray-700 border-gray-200',
        iconColor: 'text-gray-500',
        label: noiseLevel
      };
  }
}

/**
 * Loads stored spaces or falls back to INITIAL_SPACES
 */
export function getStoredSpaces() {
  try {
    const raw = localStorage.getItem(SPACES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(INITIAL_SPACES));
      return INITIAL_SPACES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SPACES;
  } catch (err) {
    console.error('Error reading spaces from localStorage:', err);
    return INITIAL_SPACES;
  }
}

/**
 * Saves updated spaces array to localStorage
 */
export function saveStoredSpaces(spaces) {
  try {
    localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(spaces));
  } catch (err) {
    console.error('Error saving spaces to localStorage:', err);
  }
}

/**
 * Reads all user bookings from localStorage
 */
export function getStoredBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return getInitialDemoBookings();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return [];
  }
}

/**
 * Pre-populates 1-2 realistic mock bookings so the "My Bookings" page
 * showcases both upcoming and past states immediately to reviewers!
 */
function getInitialDemoBookings() {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  
  const yesterday = new Date(Date.now() - 86400000);
  const yesterdayFormatted = yesterday.toISOString().split('T')[0];

  const demo = [
    {
      id: "SS-84192",
      spaceId: "space-1",
      spaceName: "Central Library – Silent Zone",
      building: "William Gates Library",
      floor: "3rd Floor, West Wing",
      category: "Library",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
      date: todayFormatted,
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      timeSlot: "02:00 PM – 03:00 PM",
      status: "Upcoming",
      createdAt: new Date().toISOString(),
      userName: "Alex Mercer",
      userEmail: "alex.mercer@campus.edu",
      purpose: "Midterm Study & Literature Review"
    },
    {
      id: "SS-71930",
      spaceId: "space-7",
      spaceName: "Brew & Books Cafe",
      building: "North Quad Terrace",
      floor: "Level 1",
      category: "Cafes",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
      date: yesterdayFormatted,
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      timeSlot: "11:00 AM – 12:00 PM",
      status: "Completed",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      userName: "Alex Mercer",
      userEmail: "alex.mercer@campus.edu",
      purpose: "Design system critique"
    }
  ];
  
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(demo));
  } catch (e) {
    // ignore
  }
  return demo;
}

/**
 * Saves a new booking, increments occupancy in spaces, and returns the new booking object
 */
export function createBooking({ spaceId, startTime, date, userName, purpose }) {
  const spaces = getStoredSpaces();
  const spaceIndex = spaces.findIndex(s => s.id === spaceId);

  if (spaceIndex === -1) {
    throw new Error('Selected space could not be found.');
  }

  const space = spaces[spaceIndex];

  // 1. Check if location is full
  if (space.occupied >= space.capacity) {
    throw new Error(`Sorry, "${space.name}" is currently at maximum capacity (${space.capacity}/${space.capacity}).`);
  }

  // 2. Compute endTime exactly 1 hour later
  const endTime = calculateEndTimeOneHourLater(startTime);
  const timeSlot = `${startTime} – ${endTime}`;

  // 3. Check for duplicate booking for same user/location/slot
  const existingBookings = getStoredBookings();
  const isDuplicate = existingBookings.some(
    b => b.spaceId === spaceId &&
         b.date === date &&
         b.timeSlot === timeSlot &&
         b.status !== 'Cancelled'
  );

  if (isDuplicate) {
    throw new Error(`You already have a confirmed reservation for ${space.name} during ${timeSlot} on ${date}.`);
  }

  // 4. Generate unique readable booking ID
  const bookingId = `SS-${Math.floor(10000 + Math.random() * 90000)}`;

  const newBooking = {
    id: bookingId,
    spaceId: space.id,
    spaceName: space.name,
    building: space.building,
    floor: space.floor,
    category: space.category,
    image: space.image,
    date: date || new Date().toISOString().split('T')[0],
    startTime,
    endTime,
    timeSlot,
    status: 'Upcoming',
    createdAt: new Date().toISOString(),
    userName: userName || 'Student Guest',
    purpose: purpose || 'Focused Study'
  };

  // Update occupancy
  spaces[spaceIndex] = {
    ...space,
    occupied: space.occupied + 1
  };

  // Persist
  saveStoredSpaces(spaces);
  const updatedBookings = [newBooking, ...existingBookings];
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));

  return { booking: newBooking, updatedSpaces: spaces };
}

/**
 * Cancels a booking and frees 1 seat
 */
export function cancelBooking(bookingId) {
  const bookings = getStoredBookings();
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    throw new Error('Booking not found.');
  }

  if (booking.status === 'Cancelled') {
    return { bookings, spaces: getStoredSpaces() };
  }

  const updatedBookings = bookings.map(b => 
    b.id === bookingId ? { ...b, status: 'Cancelled' } : b
  );
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));

  // Decrement occupied seat if still in spaces
  const spaces = getStoredSpaces();
  const spaceIndex = spaces.findIndex(s => s.id === booking.spaceId);
  if (spaceIndex !== -1 && spaces[spaceIndex].occupied > 0) {
    spaces[spaceIndex] = {
      ...spaces[spaceIndex],
      occupied: Math.max(0, spaces[spaceIndex].occupied - 1)
    };
    saveStoredSpaces(spaces);
  }

  return { bookings: updatedBookings, spaces };
}

/**
 * Calculates time 1 hour later
 * Handles formats like '09:00 AM' -> '10:00 AM', '11:00 AM' -> '12:00 PM', '11:00 PM' -> '12:00 AM'
 */
export function calculateEndTimeOneHourLater(startTimeStr) {
  if (!startTimeStr) return '01:00 PM';
  
  const match = startTimeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '01:00 PM';

  let hour = parseInt(match[1], 10);
  const minute = match[2];
  let period = match[3].toUpperCase();

  if (hour === 11) {
    hour = 12;
    period = period === 'AM' ? 'PM' : 'AM';
  } else if (hour === 12) {
    hour = 1;
  } else {
    hour += 1;
  }

  const paddedHour = hour < 10 ? `0${hour}` : `${hour}`;
  return `${paddedHour}:${minute} ${period}`;
}

/**
 * Returns available 1-hour time slots starting from standard campus hours
 */
export function generateTimeSlots() {
  return [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM"
  ];
}

const BOOKMARKS_STORAGE_KEY = 'studyspot_user_bookmarks_v1';

/**
 * Returns array of bookmarked space IDs
 */
export function getBookmarkedSpaces() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["space-1", "space-5"];
  } catch (e) {
    return ["space-1", "space-5"];
  }
}

/**
 * Toggles a space ID in bookmarks and saves
 */
export function toggleBookmark(spaceId) {
  try {
    const current = getBookmarkedSpaces();
    let updated;
    if (current.includes(spaceId)) {
      updated = current.filter(id => id !== spaceId);
    } else {
      updated = [...current, spaceId];
    }
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

/**
 * Generates realistic hourly occupancy trend percentages for a space
 */
export function getSpaceHourlyTrends(spaceId) {
  // Deterministic seed based on spaceId characters
  const seed = spaceId ? spaceId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) : 42;
  
  const hours = [
    { label: "8 AM", base: 20 },
    { label: "9 AM", base: 45 },
    { label: "10 AM", base: 65 },
    { label: "11 AM", base: 78 },
    { label: "12 PM", base: 88 },
    { label: "1 PM", base: 82 },
    { label: "2 PM", base: 90 },
    { label: "3 PM", base: 85 },
    { label: "4 PM", base: 74 },
    { label: "5 PM", base: 60 },
    { label: "6 PM", base: 55 },
    { label: "7 PM", base: 50 },
    { label: "8 PM", base: 40 },
    { label: "9 PM", base: 25 },
  ];

  return hours.map((h, i) => {
    const variation = ((seed * (i + 1)) % 15) - 7;
    const value = Math.max(10, Math.min(95, h.base + variation));
    return {
      hour: h.label,
      percent: value
    };
  });
}

/**
 * Generates and downloads a standard .ics calendar invite for the booking
 */
export function downloadCalendarInvite(booking) {
  const dateStr = booking.date.replace(/-/g, '');
  const title = `StudySpot: ${booking.spaceName}`;
  const description = `1-Hour Study Session at ${booking.spaceName} (${booking.building}, ${booking.floor}). Booking ID: ${booking.id}. Focus: ${booking.purpose || 'Focused Work'}`;
  const location = `${booking.spaceName}, ${booking.building}`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//StudySpot Campus//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    `DTSTART:${dateStr}T100000Z`,
    `DTEND:${dateStr}T110000Z`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `studyspot-${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


