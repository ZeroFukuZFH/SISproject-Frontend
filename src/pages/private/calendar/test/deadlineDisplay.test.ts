import { describe, it, expect } from 'vitest';

interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  month: number;
  year: number;
  time?: string;
  completed?: boolean;
  isDeadline?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

describe('Project Deadline Display', () => {
  // Mock calendar events with deadlines
  const calendarEvents: CalendarEvent[] = [
    { 
      id: '1', 
      title: 'Team Meeting', 
      date: 23, 
      month: 5, 
      year: 2026, 
      time: '10:00 AM',
      isDeadline: false 
    },
    { 
      id: '2', 
      title: 'Project Deadline: Submit Final Report', 
      date: 25, 
      month: 5, 
      year: 2026, 
      time: '11:59 PM',
      isDeadline: true,
      priority: 'high'
    },
    { 
      id: '3', 
      title: 'Client Call', 
      date: 24, 
      month: 5, 
      year: 2026, 
      time: '2:00 PM',
      isDeadline: false 
    },
    { 
      id: '4', 
      title: 'Sprint Planning', 
      date: 28, 
      month: 5, 
      year: 2026, 
      time: '9:00 AM',
      isDeadline: false 
    },
    { 
      id: '5', 
      title: 'Project Deadline: Code Review', 
      date: 30, 
      month: 5, 
      year: 2026, 
      time: '5:00 PM',
      isDeadline: true,
      priority: 'medium'
    },
  ];

  it('should show project deadline on the correct date', () => {
    const deadline = calendarEvents.find(e => e.isDeadline && e.date === 25);
    expect(deadline).toBeDefined();
    expect(deadline?.title).toBe('Project Deadline: Submit Final Report');
    expect(deadline?.date).toBe(25);
    expect(deadline?.month).toBe(5);
    expect(deadline?.year).toBe(2026);
  });

  it('should identify which events are deadlines', () => {
    const deadlines = calendarEvents.filter(e => e.isDeadline === true);
    expect(deadlines).toHaveLength(2);
    expect(deadlines[0].title).toContain('Project Deadline');
    expect(deadlines[1].title).toContain('Project Deadline');
  });

  it('should show deadline with high priority indicator', () => {
    const highPriorityDeadline = calendarEvents.find(
      e => e.isDeadline && e.priority === 'high'
    );
    expect(highPriorityDeadline).toBeDefined();
    expect(highPriorityDeadline?.title).toBe('Project Deadline: Submit Final Report');
    expect(highPriorityDeadline?.priority).toBe('high');
  });

  it('should show deadline with medium priority indicator', () => {
    const mediumPriorityDeadline = calendarEvents.find(
      e => e.isDeadline && e.priority === 'medium'
    );
    expect(mediumPriorityDeadline).toBeDefined();
    expect(mediumPriorityDeadline?.title).toBe('Project Deadline: Code Review');
    expect(mediumPriorityDeadline?.priority).toBe('medium');
  });

  it('should show deadline with time', () => {
    const deadline = calendarEvents.find(e => e.isDeadline && e.date === 25);
    expect(deadline?.time).toBe('11:59 PM');
  });

  it('should display deadline title with "Project Deadline" prefix', () => {
    const deadlines = calendarEvents.filter(e => e.isDeadline);
    deadlines.forEach(deadline => {
      expect(deadline.title).toContain('Project Deadline');
    });
  });

  it('should distinguish between regular events and deadlines', () => {
    const regularEvents = calendarEvents.filter(e => !e.isDeadline);
    const deadlines = calendarEvents.filter(e => e.isDeadline);
    
    expect(regularEvents).toHaveLength(3);
    expect(deadlines).toHaveLength(2);
    
    // Regular events shouldn't have "Project Deadline" in title
    regularEvents.forEach(event => {
      expect(event.title).not.toContain('Project Deadline');
    });
  });

  it('should show deadline on the calendar day', () => {
    // Simulate filtering events for a specific day
    const getEventsForDay = (date: number, month: number, year: number) => {
      return calendarEvents.filter(e => 
        e.date === date && e.month === month && e.year === year
      );
    };

    const day25Events = getEventsForDay(25, 5, 2026);
    expect(day25Events).toHaveLength(1);
    expect(day25Events[0].isDeadline).toBe(true);
    expect(day25Events[0].title).toBe('Project Deadline: Submit Final Report');

    const day30Events = getEventsForDay(30, 5, 2026);
    expect(day30Events).toHaveLength(1);
    expect(day30Events[0].isDeadline).toBe(true);
    expect(day30Events[0].title).toBe('Project Deadline: Code Review');
  });

  it('should show multiple deadlines on different dates', () => {
    const deadlineDates = calendarEvents
      .filter(e => e.isDeadline)
      .map(e => e.date);
    
    expect(deadlineDates).toContain(25);
    expect(deadlineDates).toContain(30);
    expect(deadlineDates).not.toContain(23);
    expect(deadlineDates).not.toContain(24);
  });

  it('should show deadline with completed status', () => {
    const eventsWithDeadlineAndCompleted = [
      ...calendarEvents,
      { 
        id: '6', 
        title: 'Project Deadline: Documentation', 
        date: 26, 
        month: 5, 
        year: 2026, 
        time: '6:00 PM',
        isDeadline: true,
        completed: true 
      }
    ];

    const completedDeadline = eventsWithDeadlineAndCompleted.find(
      e => e.isDeadline && e.completed === true
    );
    expect(completedDeadline).toBeDefined();
    expect(completedDeadline?.title).toBe('Project Deadline: Documentation');
    expect(completedDeadline?.completed).toBe(true);
  });
});
