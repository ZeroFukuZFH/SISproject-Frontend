export type Group = 'ALL' | 'Group 1' | 'Group 2' | 'Group 3';

export interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  month: number;
  year: number;
  time?: string;
  completed?: boolean;
}

export interface DayEvent {
  id: string;
  title: string;
  time?: string;
  completed?: boolean;
}

export interface WeekDay {
  date: number;
  isToday: boolean;
  events?: DayEvent[];
}

export interface MonthDay {
  date: number | null;
  day?: string;
  isToday?: boolean;
  events?: DayEvent[];
}