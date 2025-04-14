import { beforeEach, describe, expect, it } from "bun:test";
import { Cell } from "../src/cell";
import { Grid } from "../src/grid";

describe("Grid", () => {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(3, 3); // Create a 3x3 grid for testing.
  });

  describe("constructor", () => {
    it("should initialize the grid with the correct dimensions", () => {
      expect(grid.numberOfRows).toBe(3);
      expect(grid.numberOfColumns).toBe(3);
      expect(grid.grid.length).toBe(3);
      expect(grid.grid[0].length).toBe(3);
    });

    it("should throw an error if rows or columns are not defined", () => {
      expect(() => new Grid(0, 3)).toThrow("Rows and columns must be defined");
      expect(() => new Grid(3, 0)).toThrow("Rows and columns must be defined");
    });

    it("should throw an error if rows or columns are not integers", () => {
      expect(() => new Grid(3.5, 3)).toThrow("Rows and columns must be integers");
      expect(() => new Grid(3, 3.5)).toThrow("Rows and columns must be integers");
    });
  });

  describe("initializeGrid", () => {
    it("should populate the grid with Cell objects", () => {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          expect(grid.grid[row][col]).toBeInstanceOf(Cell);
          expect(grid.grid[row][col].row).toBe(row);
          expect(grid.grid[row][col].column).toBe(col);
        }
      }
    });
  });

  describe("setNeighbors", () => {
    it("should set the neighbors for each cell", async () => {
      const cell = grid.getCell(1, 1);
      expect<Cell | undefined>(cell?.north).toBe(grid.getCell(0, 1));
      expect<Cell | undefined>(cell?.south).toBe(grid.getCell(2, 1));
      expect<Cell | undefined>(cell?.east).toBe(grid.getCell(1, 2));
      expect<Cell | undefined>(cell?.west).toBe(grid.getCell(1, 0));
    });
  });

  describe("getCell", () => {
    it("should return the correct cell for valid indices", () => {
      const cell = grid.getCell(1, 1);
      expect(cell).toBeInstanceOf(Cell);
      expect(cell?.row).toBe(1);
      expect(cell?.column).toBe(1);
    });

    it("should return undefined for out-of-bounds indices", () => {
      expect(grid.getCell(-1, 0)).toBeUndefined();
      expect(grid.getCell(3, 0)).toBeUndefined();
      expect(grid.getCell(0, -1)).toBeUndefined();
      expect(grid.getCell(0, 3)).toBeUndefined();
    });
  });

  describe("randomCell", () => {
    it("should return a random cell from the grid", () => {
      const cell = grid.randomCell();
      expect(cell).toBeInstanceOf(Cell);
      expect(cell?.row).toBeGreaterThanOrEqual(0);
      expect(cell?.row).toBeLessThan(3);
      expect(cell?.column).toBeGreaterThanOrEqual(0);
      expect(cell?.column).toBeLessThan(3);
    });
  });

  describe("getSize", () => {
    it("should return the total number of cells in the grid", () => {
      expect(grid.getSize()).toBe(9); // 3x3 grid.
    });
  });

  describe("forEachRow", () => {
    it("should iterate over each row in the grid", () => {
      const rows: Cell[][] = [];
      for (const row of grid.forEachRow()) {
        rows.push(row);
      }
      expect(rows.length).toBe(3);
      expect(rows[0].length).toBe(3);
    });
  });

  describe("forEachCell", () => {
    it("should asynchronously iterate over each cell in the grid", async () => {
      const cells: Cell[] = [];
      for await (const cell of grid.forEachCell()) {
        cells.push(cell);
      }
      expect(cells.length).toBe(9); // 3x3 grid.
      cells.forEach((cell, index) => {
        expect(cell).toBeInstanceOf(Cell);
        expect(cell.row).toBe(Math.floor(index / 3));
        expect(cell.column).toBe(index % 3);
      });
    });
  });
});
