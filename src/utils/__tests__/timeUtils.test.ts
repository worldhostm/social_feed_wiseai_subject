import { formatRelativeTime } from '../timeUtils';

// Mock Date.now to return a consistent timestamp for testing
const mockNow = new Date('2024-01-15T12:00:00Z').getTime();

describe('formatRelativeTime', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(mockNow);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('formats time correctly for seconds ago', () => {
    const fortySecondsAgo = new Date('2024-01-15T11:59:20Z').toISOString();
    const result = formatRelativeTime(fortySecondsAgo);
    expect(result).toBe('방금 전');
  });

  it('formats time correctly for minutes ago', () => {
    const fiveMinutesAgo = new Date('2024-01-15T11:55:00Z').toISOString();
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5분 전');
  });

  it('formats time correctly for hours ago', () => {
    const threeHoursAgo = new Date('2024-01-15T09:00:00Z').toISOString();
    const result = formatRelativeTime(threeHoursAgo);
    expect(result).toMatch(/3시간 전/);
  });

  it('formats time correctly for days ago', () => {
    const twoDaysAgo = new Date('2024-01-13T12:00:00Z').toISOString();
    expect(formatRelativeTime(twoDaysAgo)).toBe('2일 전');
  });

  it('formats time correctly for weeks ago', () => {
    const twoWeeksAgo = new Date('2024-01-01T12:00:00Z').toISOString();
    const result = formatRelativeTime(twoWeeksAgo);
    expect(result).toMatch(/\d+일 전/);
  });

  it('formats time correctly for months ago', () => {
    const twoMonthsAgo = new Date('2023-11-15T12:00:00Z').toISOString();
    expect(formatRelativeTime(twoMonthsAgo)).toBe('2개월 전');
  });

  it('formats time correctly for years ago', () => {
    const twoYearsAgo = new Date('2022-01-15T12:00:00Z').toISOString();
    const result = formatRelativeTime(twoYearsAgo);
    expect(result).toMatch(/2년 전/);
  });

  it('handles edge case of 1 unit correctly', () => {
    const oneMinuteAgo = new Date('2024-01-15T11:59:00Z').toISOString();
    expect(formatRelativeTime(oneMinuteAgo)).toBe('1분 전');
    
    const oneHourAgo = new Date('2024-01-15T11:00:00Z').toISOString();
    const result = formatRelativeTime(oneHourAgo);
    expect(result).toMatch(/1시간 전/);
    
    const oneDayAgo = new Date('2024-01-14T12:00:00Z').toISOString();
    expect(formatRelativeTime(oneDayAgo)).toBe('1일 전');
  });

  it('handles future dates', () => {
    const futureDate = new Date('2024-01-15T13:00:00Z').toISOString();
    const result = formatRelativeTime(futureDate);
    expect(result).toBeDefined();
  });
});