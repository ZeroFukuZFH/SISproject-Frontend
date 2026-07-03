import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { CalendarSidebar } from './components/CalendarSidebar';
import { MainCalendar } from './components/MainCalendar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getDaysInMonth } from './utils/calendarUtils';
import type { Group, CalendarEvent, WeekDay } from './types';

const CalendarPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useLocalStorage<Group>('calendarSelectedGroup', 'ALL');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonthView, setCurrentMonthView] = useState(() => new Date());

  // TODO: Replace with API data
  const [events] = useState<CalendarEvent[]>([
    { id: '1', title: 'Team Meeting', date: 23, month: 5, year: 2026, time: '10:00 AM' },
    { id: '2', title: 'Project Review', date: 24, month: 5, year: 2026, time: '2:00 PM' },
    { id: '3', title: 'Client Call', date: 25, month: 5, year: 2026, time: '11:30 AM', completed: true },
    { id: '4', title: 'Design Review', date: 15, month: 5, year: 2026, time: '3:00 PM' },
    { id: '5', title: 'Sprint Planning', date: 10, month: 5, year: 2026, time: '9:00 AM', completed: true },
    { id: '6', title: 'Demo Day', date: 28, month: 5, year: 2026, time: '4:00 PM' },
  ]);

  const weekDays = useMemo((): WeekDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const daysInMonth = getDaysInMonth(year, month);
    const result: WeekDay[] = [];
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = events
        .filter(e => e.date === date && e.month === month && e.year === year)
        .map(e => ({ id: e.id, title: e.title, time: e.time, completed: e.completed }));
      result.push({
        date,
        isToday: date === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
        events: dayEvents.length > 0 ? dayEvents : undefined,
      });
    }
    return result;
  }, [currentDate, events]);

  const navigateMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setCurrentMonthView(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentMonthView(today);
  };

  return (
    <div className="min-h-screen bg-[#15101a] flex">
      <Sidebar />
      <CalendarSidebar
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        currentDate={currentMonthView}
        onMonthChange={(date) => {
          setCurrentMonthView(date);
          setCurrentDate(date);
        }}
      />
      <MainCalendar
        weekDays={weekDays}
        currentDate={currentDate}
        onPrev={() => navigateMonth(-1)}
        onNext={() => navigateMonth(1)}
        onToday={goToToday}
      />
    </div>
  );
};

export default CalendarPage;
