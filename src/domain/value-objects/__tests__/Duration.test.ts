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
        'Duration cannot be negative.'
      );
    });
  });
});