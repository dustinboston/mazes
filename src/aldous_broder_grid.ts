import type { Cell } from "./cell";
import { Grid } from "./grid";
import { sample } from "./util";

export class AldousBroderGrid extends Grid {
	static on(grid: Grid) {
		let cell = grid.randomCell();
		if (cell === undefined) {
			throw new Error("Cell is undefined");
		}

		let unvisitedCells = grid.getSize() - 1;
		while (unvisitedCells > 0) {
      if (cell === undefined) continue;
      
      const neighbor: Cell | undefined = sample(cell.getNeighbors());
      if (neighbor === undefined) continue;
      
      if (neighbor.getLinks().length === 0) {
        cell.link(neighbor);
        unvisitedCells--;
      }
      cell = neighbor;
    }
    return grid;
	}
}
