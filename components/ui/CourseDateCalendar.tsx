"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { COURSE_DATES } from "@/lib/constants/course";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseCourseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const allCourseDates = COURSE_DATES.flatMap((session) =>
  session.dates.map((d) => ({ date: parseCourseDate(d), session }))
);

const sessionStartDates = COURSE_DATES.map((session) => ({
  date: parseCourseDate(session.dates[0]),
  session,
}));

interface CourseDateCalendarProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CourseDateCalendar({ value, onChange, error }: CourseDateCalendarProps) {
  const firstAvailable = sessionStartDates[0]?.date ?? new Date();
  const [viewYear, setViewYear] = useState(firstAvailable.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstAvailable.getMonth());

  const selectedSession = COURSE_DATES.find((s) => s.label === value) ?? null;

  const selectedDates = useMemo(
    () => (selectedSession ? selectedSession.dates.map(parseCourseDate) : []),
    [selectedSession]
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const monthHasSession = allCourseDates.some(
    (d) => d.date.getFullYear() === viewYear && d.date.getMonth() === viewMonth
  );

  const canGoPrev = viewYear > firstAvailable.getFullYear() ||
    (viewYear === firstAvailable.getFullYear() && viewMonth > firstAvailable.getMonth());

  const lastSession = sessionStartDates[sessionStartDates.length - 1]?.date ?? firstAvailable;
  const canGoNext = viewYear < lastSession.getFullYear() ||
    (viewYear === lastSession.getFullYear() && viewMonth < lastSession.getMonth());

  function goToPrevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function goToNextMonth() {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function handleDayClick(day: number) {
    const clickedDate = new Date(viewYear, viewMonth, day);
    const match = sessionStartDates.find((s) => isSameDay(s.date, clickedDate));
    if (match) {
      onChange(match.session.label);
    }
  }

  function getDayState(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    const isSelected = selectedDates.some((d) => isSameDay(d, date));
    const isStartDate = sessionStartDates.some((s) => isSameDay(s.date, date));
    const isSessionDay = allCourseDates.some((d) => isSameDay(d.date, date));
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
    return { isSelected, isStartDate, isSessionDay, isPast };
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Course Date & Time <span className="text-red-400 ml-1">*</span>
      </label>

      <div className={cn(
        "rounded-2xl border bg-white overflow-hidden transition-colors",
        error ? "border-red-300" : "border-gray-200",
      )}>
        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 py-3 bg-navy-700">
          <button
            type="button"
            onClick={goToPrevMonth}
            disabled={!canGoPrev}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-white tracking-wide">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!canGoNext}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="py-2 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 p-2 gap-0.5">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const { isSelected, isStartDate, isSessionDay, isPast } = getDayState(day);

            return (
              <button
                key={day}
                type="button"
                disabled={!isStartDate || isPast}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative w-full aspect-square flex items-center justify-center text-sm rounded-xl transition-all duration-150",
                  isSelected
                    ? "bg-navy-700 text-white font-bold shadow-md"
                    : isStartDate && !isPast
                      ? "bg-gold-50 text-gold-700 font-semibold border-2 border-gold-300 hover:bg-gold-100 hover:border-gold-400 cursor-pointer"
                      : isSessionDay
                        ? "bg-navy-50 text-navy-600 font-medium"
                        : isPast
                          ? "text-gray-300 cursor-default"
                          : "text-gray-500 cursor-default",
                )}
              >
                {day}
                {isStartDate && !isPast && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        {monthHasSession && (
          <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border-2 border-gold-300 bg-gold-50" />
              <span className="text-[11px] text-gray-500">Start date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-navy-50" />
              <span className="text-[11px] text-gray-500">Class day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-navy-700" />
              <span className="text-[11px] text-gray-500">Selected</span>
            </div>
          </div>
        )}

        {/* Selected session details */}
        <AnimatePresence mode="wait">
          {selectedSession && (
            <motion.div
              key={selectedSession.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-3 bg-navy-50 border-t border-navy-100">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-navy-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">{selectedSession.days}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">9:00 AM – 5:00 PM PST each day</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
