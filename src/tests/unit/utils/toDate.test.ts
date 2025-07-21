import { describe, it, expect } from "vitest";
import toDate from "@/utils/toDate";

describe("toDate", () => {
  describe("when handling invalid or null values", () => {
    it("should return null for undefined input", () => {
      expect(toDate(undefined)).toBeNull();
    });

    it("should return null for null input", () => {
      expect(toDate(null)).toBeNull();
    });

    it("should return null for an invalid string input", () => {
      expect(toDate("not a date")).toBeNull();
      expect(toDate("invalid-date-format")).toBeNull();
    });
  });

  describe("when handling Date objects", () => {
    it("should return the same Date object if input is already a Date", () => {
      const today = new Date();
      expect(toDate(today)).toBe(today);
    });
  });

  describe("when handling number (milliseconds timestamp)", () => {
    it("should convert a millisecond timestamp to a Date object", () => {
      const timestampMs = 1678886400000;
      const expectedDate = new Date(timestampMs);
      expect(toDate(timestampMs)?.getTime()).toBe(expectedDate.getTime());
    });
  });

  describe("when handling string inputs", () => {
    it("should convert a valid ISO string to a Date object", () => {
      const isoString = "2023-03-15T10:00:00.000Z";
      const expectedDate = new Date(isoString);
      expect(toDate(isoString)?.getTime()).toBe(expectedDate.getTime());
    });

    it("should convert a valid date string (parsable by Date constructor) to a Date object", () => {
      const dateString = "March 15, 2023 10:00:00 GMT+0000";
      const expectedDate = new Date(dateString);
      expect(toDate(dateString)?.getTime()).toBe(expectedDate.getTime());
    });
  });

  describe("when handling FirebaseTimestamp objects", () => {
    it("should convert FirebaseTimestamp (seconds) to a Date object", () => {
      const firebaseTimestamp = { seconds: 1678886400, nanoseconds: 0 };
      const expectedDate = new Date(firebaseTimestamp.seconds * 1000);
      expect(toDate(firebaseTimestamp)?.getTime()).toBe(expectedDate.getTime());
    });
  });

  describe("when handling UnderscoreTimestamp objects", () => {
    it("should convert UnderscoreTimestamp (_seconds) to a Date object", () => {
      const underscoreTimestamp = { _seconds: 1678886400, _nanoseconds: 0 };
      const expectedDate = new Date(underscoreTimestamp._seconds * 1000);
      expect(toDate(underscoreTimestamp)?.getTime()).toBe(expectedDate.getTime());
    });

    it("should convert UnderscoreTimestamp with only _seconds to a Date object", () => {
      const underscoreTimestamp = { _seconds: 1678886400 };
      const expectedDate = new Date(underscoreTimestamp._seconds * 1000);
      expect(toDate(underscoreTimestamp)?.getTime()).toBe(expectedDate.getTime());
    });
  });

  describe("when handling objects with a toDate() method", () => {
    it("should call and return the result of the toDate() method", () => {
      const mockDate = new Date();
      const hasToDateObject = {
        toDate: () => mockDate,
      };
      expect(toDate(hasToDateObject)).toBe(mockDate);
    });
  });
});
