import { Grid } from "./grid";
import { sample } from "./util";

export class HuntAndKillGrid extends Grid {
	static on(grid: Grid) {
		let current = grid.randomCell();

		while (current) {
			const unvisitedNeighbors = current.getNeighbors().filter((n) => {
				return n.getLinks().length === 0;
			});

      if (unvisitedNeighbors.length > 0) {
        const neighbor = sample(unvisitedNeighbors);
        if (neighbor === undefined) {
          throw new Error("No unvisited neighbors found");
        }
        current.link(neighbor);
        current = neighbor;
      } else {
        current = undefined;

        for (const cell of grid.forEachCell()) {
          const visitedNeighbors = cell.getNeighbors().filter((n) => {
            return n.getLinks().length > 0;
          });
          if (cell.getLinks().length === 0 && visitedNeighbors.length > 0) {
            current = cell;

            const neighbor = sample(visitedNeighbors);
            if (neighbor === undefined) {
              throw new Error("No visited neighbors found");
            }
            current.link(neighbor);
            break;
          }
        }
      }
		}
    return grid;
	}
}
