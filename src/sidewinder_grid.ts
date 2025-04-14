import { Grid } from "./grid.js";
import { sample } from "./util.js";

export class Sidewinder extends Grid{
	static on(grid: Grid) {
		for (const row of grid.forEachRow()) {
			const run = [];
			for (const cell of row) {
				run.push(cell);

				const atEasternBoundary = cell.east === undefined;
				const atNorthernBoundary = cell.north === undefined;

				const randomNumber = Math.floor(Math.random() * 2);
				const shouldCloseOut =
					atEasternBoundary || (!atNorthernBoundary && randomNumber === 0);
        
        if (shouldCloseOut) {
          const randomCell = sample(run);
          if (randomCell !== undefined) {
            if (randomCell.north) {
              randomCell.link(randomCell.north);
            }
          } 
          run.splice(0, run.length); /* Empty the run */
        } else {
          if (cell.east) {
            cell.link(cell.east)
          };
        }
			}
		}
    return grid;
	}
}
