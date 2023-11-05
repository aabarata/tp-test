import { getPriorityColor, getPriorityLabel } from "./todo.helpers";

describe("Todo business helpers", () => {
  describe("getPriorityLabel", () => {
    it("Should return the low priority label", () => {
      const priority = 1;
      const label = getPriorityLabel(priority);
      expect(label).toBe("LOW");
    });
    it("Should return the medium priority label", () => {
      const priority = 2;
      const label = getPriorityLabel(priority);
      expect(label).toBe("MEDIUM");
    });
    it("Should return the high priority label", () => {
      const priority = 3;
      const label = getPriorityLabel(priority);
      expect(label).toBe("HIGH");
    });
    it("Should return Unclassified if the priority don't exist", () => {
      const priority = 4;
      const label = getPriorityLabel(priority);
      expect(label).toBe("Unclassified");
    });
  });

  describe("getPriorityColor", () => {
    it("Should return the low priority color", () => {
      const priority = 1;
      const color = getPriorityColor(priority);
      expect(color).toBe("green");
    });
    it("Should return the medium priority color", () => {
      const priority = 2;
      const color = getPriorityColor(priority);
      expect(color).toBe("orange");
    });
    it("Should return the high priority color", () => {
      const priority = 3;
      const color = getPriorityColor(priority);
      expect(color).toBe("red");
    });
    it("Should return inherit if the priority don't exist", () => {
      const priority = 4;
      const color = getPriorityColor(priority);
      expect(color).toBe("inherit");
    });
  });
});
