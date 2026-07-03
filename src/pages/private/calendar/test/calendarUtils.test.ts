import { describe, it, expect } from 'vitest';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/calendarUtils';

describe('calendarUtils', () => {
  it('returns correct days in month', () => {
    expect(getDaysInMonth(2024, 0)).toBe(31);
    expect(getDaysInMonth(2024, 1)).toBe(29);
    expect(getDaysInMonth(2023, 1)).toBe(28);
  });

  it('returns correct first day of month', () => {
    expect(getFirstDayOfMonth(2024, 0)).toBe(1);
  });
});