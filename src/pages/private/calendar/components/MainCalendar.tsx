import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WeekDay, MonthDay, DayEvent } from '../types';
import { WEEK_DAYS } from '../constants';
import { getMonthDays, formatMonthYear, isToday } from '../utils/calendarUtils';

interface MainCalendarProps {
  weekDays: WeekDay[];
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const MainCalendar: React.FC<MainCalendarProps> = ({
  weekDays,
  currentDate,
  onPrev,
  onNext,
  onToday,
}) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const { daysInMonth, startOffset } = getMonthDays(year, month);

  const monthDays = useMemo((): MonthDay[] => {
    const days: MonthDay[] = [];
    for (let i = 0; i < startOffset; i++) {
      days.push({ date: null, events: [] });
    }
    for (let date = 1; date <= daysInMonth; date++) {
      const today = isToday(date, month, year);
      const events = weekDays
        .filter(wd => wd.date === date)
        .flatMap(wd => wd.events || []);
      days.push({
        date,
        day: new Date(year, month, date).toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: today,
        events: events.length > 0 ? events : [],
      });
    }
    return days;
  }, [daysInMonth, startOffset, month, year, weekDays]);

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4e18ac] to-[#2b1d36] rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <h1 className="text-4xl font-bold text-[#d1d1d1] tracking-tight">{year}</h1>
          <p className="text-purple-300/70 text-sm mt-1">
            {formatMonthYear(currentDate)}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToday}
            className="px-5 py-2.5 bg-[#887dfa] text-[#15101a] rounded-xl text-sm font-semibold hover:bg-[#9a8ffa] transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
          >
            Today
          </button>
          <div className="flex gap-1 bg-[#1a1a2e] p-1 rounded-xl">
            <button onClick={onPrev} className="p-2 hover:bg-[#2b1d36] rounded-lg">
              <ChevronLeft className="w-4 h-4 text-[#7a6a8a]" />
            </button>
            <button onClick={onNext} className="p-2 hover:bg-[#2b1d36] rounded-lg">
              <ChevronRight className="w-4 h-4 text-[#7a6a8a]" />
            </button>
          </div>
          <span className="text-[#d1d1d1] text-sm font-medium ml-2">
            {formatMonthYear(currentDate)}
          </span>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-3 px-1">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-[#7a6a8a] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((day, index) => {
          if (day.date === null) {
            return <div key={`empty-${index}`} className="bg-[#1a1a2e]/30 rounded-xl min-h-[120px] p-2" />;
          }
          const isHovered = hoveredDay === day.date;
          return (
            <div
              key={day.date}
              className={`bg-[#1a1a2e] rounded-xl p-3 min-h-[120px] transition-all duration-300 cursor-pointer ${
                isHovered ? 'transform -translate-y-1 shadow-2xl shadow-purple-900/20 bg-[#1f1f32]' : ''
              } ${day.isToday ? 'ring-2 ring-[#887dfa]/50 ring-offset-2 ring-offset-[#15101a]' : ''}`}
              onMouseEnter={() => setHoveredDay(day.date as number)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#7a6a8a]">{day.day}</span>
                <span className={`text-sm font-semibold ${day.isToday ? 'text-[#887dfa]' : 'text-[#d1d1d1]'}`}>
                  {day.date}
                </span>
              </div>
              <div className="space-y-1">
                {day.events && day.events.length > 0 ? (
                  <>
                    {day.events.slice(0, 2).map((event: DayEvent) => (
                      <div
                        key={event.id}
                        className={`bg-[#2b1d36] rounded-lg px-2 py-1 text-xs transition-all duration-200 hover:bg-[#3d2a4a] ${
                          event.completed ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#887dfa]" />
                          <span className={`text-[#d1d1d1] truncate ${event.completed ? 'line-through text-[#7a6a8a]' : ''}`}>
                            {event.title}
                          </span>
                        </div>
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-[10px] text-[#7a6a8a] text-center">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-10" /> // Empty space when no events
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};