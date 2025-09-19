import { formatRelativeTime } from '@/utils/timeUtils';

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '1주 전'),
  ko: {}
}));

describe('timeUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock current time to a fixed date for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('formatRelativeTime', () => {
    it('returns "방금 전" for times less than 60 seconds ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000).toISOString();
      
      expect(formatRelativeTime(thirtySecondsAgo)).toBe('방금 전');
    });

    it('returns "방금 전" for current time', () => {
      const now = new Date('2024-01-15T12:00:00Z').toISOString();
      
      expect(formatRelativeTime(now)).toBe('방금 전');
    });

    it('returns minutes for times between 1-59 minutes ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
      const fiftyNineMinutesAgo = new Date(now.getTime() - 59 * 60 * 1000).toISOString();
      
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5분 전');
      expect(formatRelativeTime(thirtyMinutesAgo)).toBe('30분 전');
      expect(formatRelativeTime(fiftyNineMinutesAgo)).toBe('59분 전');
    });

    it('returns hours for times between 1-23 hours ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString();
      const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString();
      const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString();
      
      expect(formatRelativeTime(oneHourAgo)).toBe('1시간 전');
      expect(formatRelativeTime(twelveHoursAgo)).toBe('12시간 전');
      expect(formatRelativeTime(twentyThreeHoursAgo)).toBe('23시간 전');
    });

    it('returns days for times between 1-6 days ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString();
      
      expect(formatRelativeTime(oneDayAgo)).toBe('1일 전');
      expect(formatRelativeTime(threeDaysAgo)).toBe('3일 전');
      expect(formatRelativeTime(sixDaysAgo)).toBe('6일 전');
    });

    it('uses date-fns formatDistanceToNow for times more than 7 days ago', () => {
      const dateFns = jest.requireMock('date-fns');
      const now = new Date('2024-01-15T12:00:00Z');
      const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString();
      
      const result = formatRelativeTime(eightDaysAgo);
      
      expect(dateFns.formatDistanceToNow).toHaveBeenCalledWith(
        new Date(eightDaysAgo),
        { addSuffix: true, locale: expect.any(Object) }
      );
      expect(result).toBe('1주 전');
    });

    it('handles edge case of exactly 60 seconds', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000).toISOString();
      
      expect(formatRelativeTime(sixtySecondsAgo)).toBe('1분 전');
    });

    it('handles edge case of exactly 1 hour', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
      
      expect(formatRelativeTime(oneHourAgo)).toBe('1시간 전');
    });

    it('handles edge case of exactly 24 hours', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      
      expect(formatRelativeTime(twentyFourHoursAgo)).toBe('1일 전');
    });

    it('handles edge case of exactly 7 days', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      // 7 days exactly falls into the date-fns range, so it uses date-fns formatting
      expect(formatRelativeTime(sevenDaysAgo)).toBe('1주 전');
    });

    it('handles invalid date strings gracefully', () => {
      expect(() => formatRelativeTime('invalid-date')).toThrow();
    });

    it('handles future dates (should still work with negative differences)', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const futureDate = new Date(now.getTime() + 60 * 1000).toISOString();
      
      // Future dates will have negative diff, should still return "방금 전"
      expect(formatRelativeTime(futureDate)).toBe('방금 전');
    });

    it('handles very old dates', () => {
      const dateFns = jest.requireMock('date-fns');
      const veryOldDate = new Date('2020-01-01T12:00:00Z').toISOString();
      
      formatRelativeTime(veryOldDate);
      
      expect(dateFns.formatDistanceToNow).toHaveBeenCalledWith(
        new Date(veryOldDate),
        { addSuffix: true, locale: expect.any(Object) }
      );
    });

    it('correctly calculates time differences across different timezones', () => {
      const utcDate = new Date('2024-01-15T11:55:00Z').toISOString(); // 5 minutes ago
      
      expect(formatRelativeTime(utcDate)).toBe('5분 전');
    });

    it('handles leap year dates correctly', () => {
      // Set system time to leap year
      jest.setSystemTime(new Date('2024-02-29T12:00:00Z'));
      
      const oneDayAgo = new Date('2024-02-28T12:00:00Z').toISOString();
      expect(formatRelativeTime(oneDayAgo)).toBe('1일 전');
    });

    it('handles daylight saving time transitions', () => {
      // This is a basic test - in real scenarios, you might need more complex DST handling
      const dstDate = new Date('2024-03-10T12:00:00Z');
      jest.setSystemTime(dstDate);
      
      const oneDayBefore = new Date(dstDate.getTime() - 24 * 60 * 60 * 1000).toISOString();
      expect(formatRelativeTime(oneDayBefore)).toBe('1일 전');
    });

    it('returns consistent results for multiple calls with same input', () => {
      const testDate = new Date('2024-01-15T11:30:00Z').toISOString();
      
      const result1 = formatRelativeTime(testDate);
      const result2 = formatRelativeTime(testDate);
      
      expect(result1).toBe(result2);
      expect(result1).toBe('30분 전');
    });
  });
});