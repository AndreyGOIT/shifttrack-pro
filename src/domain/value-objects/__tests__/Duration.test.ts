import { describe, expect, it } from 'vitest';
import { Duration } from '../Duration';

describe('Duration', () => {
  describe('fromMinutes', () => {
    it('should create duration from positive minutes', () => {
      // Arrange
      const minutes = 480;

      // Act
      const duration = Duration.fromMinutes(minutes);

      // Assert
      expect(duration.toMinutes()).toBe(480);
    });

    it('should allow zero duration', () => {
      // Arrange
      const minutes = 0;

      // Act
      const duration = Duration.fromMinutes(minutes);

      // Assert
      expect(duration.toMinutes()).toBe(0);
    });

    it('should throw when minutes are negative', () => {
      // Arrange
      const minutes = -1;

      // Act & Assert
      expect(() => Duration.fromMinutes(minutes)).toThrow(
        'Duration cannot be negative.',
      );
    });
  });

  describe('zero', () => {
    it('should create zero duration', () => {
      // Act
      const duration = Duration.zero();

      // Assert
      expect(duration.toMinutes()).toBe(0);
    });
  });

  describe('add', () => {
    it('should add two durations', () => {
      // Arrange
      const first = Duration.fromMinutes(300);
      const second = Duration.fromMinutes(180);

      // Act
      const result = first.add(second);

      // Assert
      expect(result.toMinutes()).toBe(480);
    });
  });

  describe('subtract', () => {
    it('should subtract duration', () => {
      // Arrange
      const total = Duration.fromMinutes(480);
      const breakTime = Duration.fromMinutes(30);

      // Act
      const result = total.subtract(breakTime);

      // Assert
      expect(result.toMinutes()).toBe(450);
    });

    it('should throw when subtraction becomes negative', () => {
      // Arrange
      const total = Duration.fromMinutes(20);
      const breakTime = Duration.fromMinutes(30);

      // Act & Assert
      expect(() => total.subtract(breakTime)).toThrow(
        'Duration cannot be negative.',
      );
    });

    it('should return zero when subtracting equal durations', () => {
      // Arrange
      const first = Duration.fromMinutes(480);
      const second = Duration.fromMinutes(480);

      // Act
      const result = first.subtract(second);

      // Assert
      expect(result.equals(Duration.zero())).toBe(true);
    });
  });

  describe('equals', () => {
    it('should return true for equal durations', () => {
      // Arrange
      const first = Duration.fromMinutes(480);
      const second = Duration.fromMinutes(480);

      // Act & Assert
      expect(first.equals(second)).toBe(true);
    });

    it('should return false for different durations', () => {
      // Arrange
      const first = Duration.fromMinutes(480);
      const second = Duration.fromMinutes(450);

      // Act & Assert
      expect(first.equals(second)).toBe(false);
    });
  });
});
