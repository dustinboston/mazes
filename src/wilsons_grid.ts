import type { Cell } from "./cell";
import { Grid } from "./grid";
import { sample } from "./util";

/**
 * Wilson's algorithm for generating a maze.
 * This algorithm is a randomized algorithm that generates a perfect maze by
 * starting from a random cell and repeatedly visiting unvisited neighbors until
 * all cells have been visited.S
 */
export class WilsonsGrid extends Grid {
	static on(grid: Grid) {
		const unvisited = new Set<Cell>();
		for (const cell of grid.forEachCell()) {
			unvisited.add(cell);
		}

		const first = sample(Array.from(unvisited));
		if (first === undefined) throw new Error("No cells to visit");

		unvisited.delete(first);

		while (unvisited.size > 0) {
			let cell = sample(Array.from(unvisited));
			if (cell === undefined) {
				throw new Error("No cells to visit");
			}

			let path = [cell];

			while (unvisited.has(cell)) {
				cell = sample(cell.getNeighbors());
        if (cell === undefined) {
          throw new Error("No neighbors to visit");
        }
        const position = path.indexOf(cell);
        if (position >= 0) { // Explicitly check if the cell exists in the path
          path = path.slice(0, position + 1);
        } else {
          path.push(cell);
        }
			}

      for (let index = 0; index < path.length - 1; index++) {
        path[index].link(path[index + 1]);
        unvisited.delete(path[index]);
      }
		}

    return grid;
	}
}
