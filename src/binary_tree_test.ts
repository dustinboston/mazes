import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { BinaryTree } from "./binary_tree_grid";
import { Cell } from "./cell";
import { Grid } from "./grid";

describe("BinaryTree", () => {
	let grid: Grid;

	beforeEach(() => {
		grid = new Grid(3, 3); // Create a 3x3 grid for testing.
	});

	describe("on", () => {
		// it("should link each cell to at most one of its north or east neighbors", () => {
		//   binaryTree.on(grid);

		//   for (const cell of grid.forEachCell()) {
		//     const links = cell.getLinks();
		//     const neighbors: Cell[] = [];
		//     if (cell.neighbors.N) neighbors.push(cell.neighbors.N);
		//     if (cell.neighbors.E) neighbors.push(cell.neighbors.E);

		//     // Ensure the cell is linked to at most one neighbor
		//     expect(links.length).toBeLessThanOrEqual(1);

		//     // If linked, ensure the link is to a valid neighbor
		//     if (links.length === 1) {
		//       expect(neighbors).toContain(links[0]);
		//     }
		//   }
		// });

		// it("should not link cells without north or east neighbors", () => {
		//   BinaryTree.on(grid);

		//   for (const cell of grid.forEachCell()) {
		//     const links = cell.getLinks();

		//     // If the cell has no north or east neighbors, it should not have any links
		//     if (!cell.neighbors.N && !cell.neighbors.E) {
		//       expect(links.length).toBe(0);
		//     }
		//   }
		// });

		// it("should handle an empty grid without errors", () => {
		//   const emptyGrid = new Grid(0, 0);
		//   expect(() => binaryTree.on(emptyGrid)).not.toThrow();

		//   for (const cell of emptyGrid.forEachCell()) {
		//     expect(cell.getLinks().length).toBe(0);
		//   }
		// });

		it("should call the link method on cells when neighbors exist", () => {
			const spy = spyOn(Cell.prototype, "link");
			BinaryTree.on(grid);

			expect(spy).toHaveBeenCalled();
			spy.mockRestore();
		});

		it("should not call the link method on cells without neighbors", () => {
			const emptyGrid = new Grid(1, 1); // A single cell with no neighbors
			const spy = spyOn(Cell.prototype, "link");

			BinaryTree.on(emptyGrid);

			expect(spy).not.toHaveBeenCalled();
			spy.mockRestore();
		});

		it("should randomly select a neighbor when both north and east neighbors exist", () => {
			const cell = grid.getCell(1, 1);
			const northNeighbor = grid.getCell(0, 1);
			const eastNeighbor = grid.getCell(1, 2);

			if (!cell) {
				throw new Error("Cell not found");
			}

			if (northNeighbor === undefined || eastNeighbor === undefined) {
				throw new Error("North and east neighbors are missing");
			}

			// Mock neighbors
			cell.north = northNeighbor;
			cell.south = eastNeighbor;

			const spy = spyOn(global.Math, "random").mockReturnValue(0.5); // Mock random to always pick the second neighbor

			BinaryTree.on(grid);

			expect(cell.isLinked(eastNeighbor)).toBe(true);
			expect(cell.isLinked(northNeighbor)).toBe(false);

			spy.mockRestore();
		});
	});
});
