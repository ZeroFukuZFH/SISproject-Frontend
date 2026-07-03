

import React, { useState, useEffect, useRef } from 'react';
import './index.css';


interface CalendarDay {
  date: number;
  day: string;
  isToday: boolean;
}

type Group = 'ALL' | 'Group 1' | 'Group 2' | 'Group 3';


function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// --- Components ---

// 1. Fragment and Destructuring example
const DateRange: React.FC<{ start: string; end: string; year: number }> = ({ start, end, year }) => {
  return (
    <>
      <span className="date-range">
        <i className="far fa-calendar-alt" style={{ marginRight: '0.4rem' }}></i>
        {start}–{end}, {year}
      </span>
    </>
  );
};

// 2. Group Tags with conditional classes
const GroupTags: React.FC<{ groups: Group[]; selected: Group; onSelect: (g: Group) => void }> = ({
  groups,
  selected,
  onSelect,
}) => {
  return (
    <div className="group-tags">
      {groups.map((group) => {
        // Ternary + AND for conditional styling
        const isAll = group === 'ALL';
        const isSelected = group === selected;
        return (
          <span
            key={group}
            className={`group-tag ${isAll ? 'all' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(group)}
            style={{ cursor: 'pointer' }}
          >
            <i className="fas fa-circle"></i> {group}
            {/* Conditional AND: show a checkmark if selected */}
            {isSelected && <i className="fas fa-check" style={{ marginLeft: '0.3rem', color: '#4f46e5' }}></i>}
          </span>
        );
      })}
    </div>
  );
};

// 3. Weekday list with iterators and destructuring
const WeekdayList: React.FC<{ days: CalendarDay[] }> = ({ days }) => {
  return (
    <div className="weekdays">
      {days.map(({ date, day, isToday }) => {
        // Conditional: if isToday, add a special class and a dot
        return (
          <div key={date} className={`weekday-row ${isToday ? 'today-indicator' : ''}`}>
            <span className="weekday-name">{day}</span>
            <span className="weekday-number">
              {date}
              {isToday && <span className="today-dot"></span>}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// 4. Main Calendar Page Component
const CalendarPage: React.FC = () => {
  // Custom hook: persist selected group in localStorage
  const [storedGroup, setStoredGroup] = useLocalStorage<Group>('calendarSelectedGroup', 'ALL');
  
  // useState for selected group - initialize directly from stored value
  const [selectedGroup, setSelectedGroup] = useState<Group>(() => storedGroup || 'ALL');

  // useRef to track if it's the first render (just for demo)
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      console.log('CalendarPage mounted (useEffect)');
      firstRender.current = false;
    }
  }, []);

  // Update localStorage when selection changes (no setState in effect!)
  useEffect(() => {
    setStoredGroup(selectedGroup);
  }, [selectedGroup, setStoredGroup]);

  // Data (iterators and destructuring in map)
  const weekDays: CalendarDay[] = [
    { date: 23, day: 'Tuesday', isToday: true },
    { date: 24, day: 'Wednesday', isToday: false },
    { date: 25, day: 'Thursday', isToday: false },
    { date: 26, day: 'Friday', isToday: false },
  ];

  const groups: Group[] = ['ALL', 'Group 1', 'Group 2', 'Group 3'];

  return (
    <div className="calendar-card">
      {/* Header */}
      <div className="calendar-header">
        <span className="year">2026</span>
        <span className="today-badge">
          <i className="fas fa-circle" style={{ fontSize: '0.5rem', color: '#4f46e5' }}></i>
          Today
        </span>
      </div>

      {/* Date Range (uses component with destructuring) */}
      <DateRange start="June 22" end="June 26" year={2026} />

      {/* Groups (uses component with iterators and conditional) */}
      <div className="groups-section">
        <div className="groups-label">
          <i className="fas fa-users" style={{ marginRight: '0.3rem', fontSize: '0.7rem' }}></i> Groups
        </div>
        <GroupTags groups={groups} selected={selectedGroup} onSelect={setSelectedGroup} />
      </div>

      {/* Weekdays (uses component with iterators) */}
      <WeekdayList days={weekDays} />

      {/* Footer */}
      <div className="calendar-footer">
        <span>
          <i className="far fa-clock"></i> week 26 · 2026
        </span>
      </div>
    </div>
  );
};

// --- Export (default export) ---
export default CalendarPage;