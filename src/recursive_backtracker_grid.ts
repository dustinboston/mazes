import type { Cell } from "./cell";
import { Grid } from "./grid";
import { sample } from "./util";

export class RecursiveBacktrackerGrid extends Grid {
	static on(grid: Grid, start?: Cell) {
		let startAt = start;
		if (startAt === undefined) {
			const cell = grid.randomCell();
			if (cell === undefined) {
				throw new Error("Cell is undefined");
			}
      startAt = cell;
		}

		const stack: Cell[] = [];
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		stack.push(startAt!);

		while (stack.length > 0) {
			const current = stack[stack.length - 1];
			if (current === undefined) {
				break;
			}

			const neighbors = current?.getNeighbors().filter((n) => {
				return n.getLinks().length === 0;
			});

			if (neighbors === undefined) {
				throw new Error("Neighbors is undefined");
			}

			if (neighbors.length === 0) {
				stack.pop();
			} else {
				const neighbor = sample(neighbors);
				if (neighbor === undefined) {
					throw new Error("Neighbor is undefined");
				}

				current.link(neighbor);
				stack.push(neighbor);
			}
		}
    return grid;
	}
}
