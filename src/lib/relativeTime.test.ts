import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRelativeTime } from './relativeTime';

describe('getRelativeTime', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for dates within the last minute', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:00:00Z'));
    expect(getRelativeTime('2025-03-10T11:59:30Z')).toBe('just now');
    vi.useRealTimers();
  });

  it('returns "X minutes ago" for dates within the last hour', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:30:00Z'));
    expect(getRelativeTime('2025-03-10T12:00:00Z')).toBe('30 minutes ago');
    expect(getRelativeTime('2025-03-10T12:29:00Z')).toBe('1 minute ago');
    vi.useRealTimers();
  });

  it('returns "X hours ago" for dates within the last day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T15:00:00Z'));
    expect(getRelativeTime('2025-03-10T12:00:00Z')).toBe('3 hours ago');
    expect(getRelativeTime('2025-03-10T14:00:00Z')).toBe('1 hour ago');
    vi.useRealTimers();
  });

  it('returns "X days ago" for dates within the last week', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:00:00Z'));
    expect(getRelativeTime('2025-03-08T12:00:00Z')).toBe('2 days ago');
    expect(getRelativeTime('2025-03-09T12:00:00Z')).toBe('1 day ago');
    vi.useRealTimers();
  });

  it('returns locale date string for older dates', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:00:00Z'));
    const result = getRelativeTime('2024-01-01T12:00:00Z');
    expect(result).toMatch(/\d/);
    vi.useRealTimers();
  });
});
