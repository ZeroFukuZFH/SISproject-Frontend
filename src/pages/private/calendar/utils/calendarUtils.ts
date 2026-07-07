export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const isToday = (date: number, month: number, year: number): boolean => {
  const today = new Date();
  return date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
};

export const getMonthDays = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  
  return { daysInMonth, firstDay, startOffset };
};