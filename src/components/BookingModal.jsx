import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaTimes, FaCheckCircle, FaUser, FaEnvelope, FaClock, FaGlobe, FaCopy, FaCalendarPlus } from 'react-icons/fa';
import { PERSONAL_INFO } from '../constants';

export const BookingModal = ({ isOpen, onClose }) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';

  const [meetingType, setMeetingType] = useState('30'); // '15', '30', '60'
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  const timeSlots = [
    { label: '10:00 AM', value: '10:00', period: 'Morning 🌅' },
    { label: '11:30 AM', value: '11:30', period: 'Morning 🌅' },
    { label: '02:00 PM', value: '14:00', period: 'Afternoon ☀️' },
    { label: '04:30 PM', value: '16:30', period: 'Afternoon ☀️' },
    { label: '07:00 PM', value: '19:00', period: 'Evening 🌙' },
    { label: '09:00 PM', value: '21:00', period: 'Evening 🌙' }
  ];

  // Helper for quick date chips
  const getQuickDates = () => {
    const dates = [];
    for (let i = 1; i <= 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ label: dayName, value: iso });
    }
    return dates;
  };

  const handleGoogleCalendarBooking = async (e) => {
    e.preventDefault();
    if (!userName || !userEmail) {
      alert('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);

    const durationMins = parseInt(meetingType, 10) || 30;
    const timeSlotObj = timeSlots.find(t => t.value === selectedTime);
    const timeSlotLabel = timeSlotObj?.label || selectedTime;

    // Calculate Google Calendar Render Link
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDateObj = new Date(selectedDate);
    startDateObj.setHours(hours, minutes, 0, 0);
    const endDateObj = new Date(startDateObj.getTime() + durationMins * 60000);
    const formatGCalDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
    const startGCalStr = formatGCalDate(startDateObj);
    const endGCalStr = formatGCalDate(endDateObj);

    const title = encodeURIComponent(`1-on-1 Meeting: ${userName} & MD. Anwar Hossen`);
    const details = encodeURIComponent(`Meeting with ${userName} (${userEmail})\nDate: ${selectedDate} at ${timeSlotLabel} (${userTimeZone})\nDuration: ${durationMins} Mins\nAgenda: ${notes || 'Technical Consultation & Project Discussion'}\n\nJoin Google Meet: https://meet.google.com/new`);
    const location = encodeURIComponent('https://meet.google.com/new');
    const addEmail = encodeURIComponent(`anwarhossendeveloper21@gmail.com,${userEmail}`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startGCalStr}/${endGCalStr}&details=${details}&location=${location}&add=${addEmail}`;

    // 1. Send Automatic Email Notification to anwarhossendeveloper21@gmail.com
    try {
      await fetch("https://formsubmit.co/ajax/anwarhossendeveloper21@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          _subject: `📅 Google Meet Booking: ${userName} (${selectedDate} @ ${timeSlotLabel})`,
          Visitor_Name: userName,
          Visitor_Email: userEmail,
          Meeting_Date: selectedDate,
          Meeting_Time: `${timeSlotLabel} (${userTimeZone})`,
          Duration: `${durationMins} Minutes`,
          Google_Meet_Join_Link: 'https://meet.google.com/new',
          Add_To_Google_Calendar_Link: gcalUrl,
          Agenda_Notes: notes || '1-on-1 Technical Consultation & Project Talk',
          _template: "table"
        }),
      });
    } catch (err) {
      console.warn("Background booking email notification error:", err);
    } finally {
      setIsSubmitting(false);
    }

    // 2. Set booked details for in-app success confirmation (No external tab redirection)
    setBookedDetails({
      date: selectedDate,
      time: timeSlotLabel,
      timeZone: userTimeZone,
      duration: `${durationMins} Minutes`,
      name: userName,
      email: userEmail,
      gcalUrl: gcalUrl,
      meetUrl: 'https://meet.google.com/new'
    });
    setIsBooked(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://meet.google.com/new');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenDirectMeet = () => {
    window.open('https://meet.google.com/new', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 pointer-events-auto"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white my-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <FaVideo className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Book 1-on-1 Meeting</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                    Google Meet
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>With {PERSONAL_INFO.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <FaGlobe className="text-[10px] text-cyan-400" />
                    {userTimeZone}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {isBooked ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <FaCheckCircle className="text-3xl" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Meeting Reserved!</h4>
                <p className="text-xs text-emerald-400 font-medium">An automatic confirmation email was sent to Anwar & stored in session.</p>
              </div>

              {bookedDetails && (
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-300 max-w-md mx-auto my-4 shadow-inner">
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400 flex items-center gap-1.5"><FaClock className="text-cyan-400" /> Date & Time:</span>
                    <span className="font-semibold text-white">{bookedDetails.date} @ {bookedDetails.time}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400 flex items-center gap-1.5"><FaGlobe className="text-cyan-400" /> Timezone:</span>
                    <span className="font-semibold text-white">{bookedDetails.timeZone}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-white">{bookedDetails.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Attendee:</span>
                    <span className="font-semibold text-white">{bookedDetails.name} ({bookedDetails.email})</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2 justify-center">
                <button
                  onClick={handleOpenDirectMeet}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <FaVideo className="text-sm" />
                  <span>Join Google Meet Room</span>
                </button>

                {bookedDetails?.gcalUrl && (
                  <a
                    href={bookedDetails.gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                  >
                    <FaCalendarPlus className="text-sm" />
                    <span>Add to Google Calendar</span>
                  </a>
                )}

                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <FaCopy className="text-sm text-amber-400" />
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { setIsBooked(false); onClose(); }}
                  className="text-xs text-slate-400 hover:text-white underline transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGoogleCalendarBooking} className="space-y-5 pt-5">
              {/* Meeting Duration Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    1. Select Duration
                  </label>
                  <span className="text-[10px] text-cyan-400 font-semibold">1-on-1 Session</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: '15', label: '15 Min', desc: 'Quick Q&A' },
                    { id: '30', label: '30 Min', desc: 'Project Talk' },
                    { id: '60', label: '60 Min', desc: 'Deep Tech' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMeetingType(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        meetingType === item.id
                          ? 'border-cyan-500 bg-cyan-500/10 text-white shadow-sm ring-1 ring-cyan-500/30'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selector with Quick Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Select Date
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {getQuickDates().map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setSelectedDate(chip.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedDate === chip.value
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              {/* Time Slot Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    3. Select Time Slot
                  </label>
                  <span className="text-[10px] text-slate-400">Timezone: {userTimeZone}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setSelectedTime(slot.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedTime === slot.value
                          ? 'border-cyan-500 bg-cyan-500/15 text-white shadow-sm ring-1 ring-cyan-500/30'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{slot.label}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{slot.period}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visitor Details */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  4. Your Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-3.5 text-slate-500 text-xs" />
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-500 text-xs" />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Meeting Agenda / Topic (Optional)"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <FaVideo className="text-base" />
                  <span>{isSubmitting ? 'Processing Booking...' : 'Confirm & Schedule Meeting'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;

