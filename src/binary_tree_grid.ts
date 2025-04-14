import { Grid } from "./grid";
import { sample } from "./util";

export class BinaryTree extends Grid {
	/**
	 * Applies the Binary Tree algorithm to the given grid. This algorithm
	 * iterates through each cell in the grid and randomly links it to one
	 * of its northern or eastern neighbors, if available.
	 *
	 * @param grid - The grid on which the Binary Tree algorithm will be applied.
	 * 	The grid is expected to have cells with `neighbors` and `link` methods.
	 * @returns The modified grid with the Binary Tree algorithm applied.
	 */
	static on(grid: Grid): Grid {
		for (const cell of grid.forEachCell()) {
			const neighbors = [];
			if (cell.north) neighbors.push(cell.north);
			if (cell.east) neighbors.push(cell.east);

			const neighbor = sample(neighbors);
			if (neighbor) cell.link(neighbor);
		}
		return grid;
	}
}
