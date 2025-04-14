import { describe, expect, it } from "bun:test";
import { Cell } from "../src/cell";

describe("Cell", () => {
  describe("constructor", () => {
    it("should initialize with valid row and column", () => {
      const cell = new Cell(1, 2);
      expect(cell.row).toBe(1);
      expect(cell.column).toBe(2);
      expect(cell.north).toBeUndefined();
      expect(cell.south).toBeUndefined();
      expect(cell.east).toBeUndefined();
      expect(cell.west).toBeUndefined();
      expect(cell.links.size).toBe(0);
    });

    it("should throw an error if row or column is undefined", () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing bad parameters
      expect(() => new Cell(undefined as any, 2)).toThrow("Row and column must be defined");
      // biome-ignore lint/suspicious/noExplicitAny: Testing bad parameters
      expect(() => new Cell(1, undefined as any)).toThrow("Row and column must be defined");
    });
  });

  describe("link", () => {
    it("should link two cells bidirectionally by default", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      cell1.link(cell2);

      expect(cell1.isLinked(cell2)).toBe(true);
      expect(cell2.isLinked(cell1)).toBe(true);
    });

    it("should link two cells unidirectionally if specified", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      cell1.link(cell2, false);

      expect(cell1.isLinked(cell2)).toBe(true);
      expect(cell2.isLinked(cell1)).toBe(false);
    });
  });

  describe("unlink", () => {
    it("should unlink two cells bidirectionally by default", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      cell1.link(cell2);
      cell1.unlink(cell2);

      expect(cell1.isLinked(cell2)).toBe(false);
      expect(cell2.isLinked(cell1)).toBe(false);
    });

    it("should unlink two cells unidirectionally if specified", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      cell1.link(cell2);
      cell1.unlink(cell2, false);

      expect(cell1.isLinked(cell2)).toBe(false);
      expect(cell2.isLinked(cell1)).toBe(true);
    });
  });

  describe("getLinks", () => {
    it("should return all linked cells", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);
      const cell3 = new Cell(1, 0);

      cell1.link(cell2);
      cell1.link(cell3);

      const links = cell1.getLinks();
      expect(links).toContain(cell2);
      expect(links).toContain(cell3);
      expect(links.length).toBe(2);
    });
  });

  describe("isLinked", () => {
    it("should return true if two cells are linked", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      cell1.link(cell2);

      expect(cell1.isLinked(cell2)).toBe(true);
    });

    it("should return false if two cells are not linked", () => {
      const cell1 = new Cell(0, 0);
      const cell2 = new Cell(0, 1);

      expect(cell1.isLinked(cell2)).toBe(false);
    });
  });

  describe("getNeighbors", () => {
    it("should return all neighbors of the cell", () => {
      const cell = new Cell(0, 0);
      const north = new Cell(0, 1);
      const south = new Cell(1, 0);
      const east = new Cell(0, 2);
      const west = new Cell(0, -1);

      cell.north = north;
      cell.south = south;
      cell.east = east;
      cell.west = west;

      const neighbors = cell.getNeighbors();
      expect(neighbors).toContain(north);
      expect(neighbors).toContain(south);
      expect(neighbors).toContain(east);
      expect(neighbors).toContain(west);
      expect(neighbors.length).toBe(4);
    });

    it("should return an empty array if there are no neighbors", () => {
      const cell = new Cell(0, 0);
      const neighbors = cell.getNeighbors();
      expect(neighbors.length).toBe(0);
    });
  });
});
