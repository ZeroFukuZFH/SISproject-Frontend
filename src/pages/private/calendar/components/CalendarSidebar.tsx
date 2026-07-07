import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Group } from '../types';
import { GROUPS, WEEK_DAYS } from '../constants';
import { getMonthDays, formatMonthYear, isToday } from '../utils/calendarUtils';

interface CalendarSidebarProps {
  selectedGroup: Group;
  onSelectGroup: (group: Group) => void;
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedGroup,
  onSelectGroup,
  currentDate,
  onMonthChange,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const { daysInMonth, startOffset } = getMonthDays(year, month);

  return (
    <div className="w-72 bg-[#15101a] border-r border-[#2b1d36] p-6 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#d1d1d1] font-semibold">
          {formatMonthYear(currentDate)}
        </h2>
        <div className="flex gap-1">
          <button 
            onClick={() => onMonthChange(new Date(year, month - 1, 1))} 
            className="p-1 hover:bg-[#2b1d36] rounded"
          >
            <ChevronLeft className="w-4 h-4 text-[#7a6a8a]" />
          </button>
          <button 
            onClick={() => onMonthChange(new Date(year, month + 1, 1))} 
            className="p-1 hover:bg-[#2b1d36] rounded"
          >
            <ChevronRight className="w-4 h-4 text-[#7a6a8a]" />
          </button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {WEEK_DAYS.map((day, i) => (
          <div key={i} className="text-center text-xs text-[#7a6a8a] py-1">
            {day[0]}
          </div>
        ))}
        {Array.from({ length: startOffset }, (_, i) => (
          <div key={`empty-${i}`} className="text-center text-sm py-1" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const today = isToday(date, month, year);
          return (
            <div
              key={date}
              className={`text-center text-sm py-1 rounded-lg cursor-pointer transition-all duration-200 ${
                today 
                  ? 'bg-[#887dfa] text-[#15101a] font-semibold scale-105' 
                  : 'text-[#d1d1d1] hover:bg-[#2b1d36]'
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>

      {/* Groups */}
      <div>
        <h3 className="text-sm font-semibold text-[#7a6a8a] mb-3">Groups</h3>
        {GROUPS.map((group) => (
          <label
            key={group}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedGroup === group ? 'bg-[#2b1d36]' : 'hover:bg-[#2b1d36]/50'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedGroup === group}
              onChange={() => onSelectGroup(group)}
              className="w-4 h-4 rounded border-[#3d2a4a] bg-transparent text-[#887dfa] focus:ring-[#887dfa] focus:ring-offset-2 focus:ring-offset-[#15101a]"
            />
            <span className={`text-sm ${selectedGroup === group ? 'text-[#d1d1d1]' : 'text-[#7a6a8a]'}`}>
              {group}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};