import { describe, expect, it } from "vitest";
import getFirstAndLastName from "@/utils/getFirstAndLastName";

describe("getFirstAndLastName", () => {
  const errorMessage = "Nome não encontrado";

  describe("when handling invalid or empty values", () => {
    it("should return the default error message", () => {
      expect(getFirstAndLastName(null)).toBe(errorMessage);
      expect(getFirstAndLastName(undefined)).toBe(errorMessage);
      expect(getFirstAndLastName("     ")).toBe(errorMessage);
      expect(getFirstAndLastName("")).toBe(errorMessage);
    });
  });

  describe("when handling different name formats", () => {
    it("should return the first and last name for full names", () => {
      expect(getFirstAndLastName("Jon Doe Ambrozio")).toBe("Jon Ambrozio");
      expect(getFirstAndLastName("Maria da Silva Souza")).toBe("Maria Souza");
    });

    it("should return only the first name if there is only one name", () => {
      expect(getFirstAndLastName("Jon")).toBe("Jon");
      expect(getFirstAndLastName("   Maria   ")).toBe("Maria");
    });
  });
});
