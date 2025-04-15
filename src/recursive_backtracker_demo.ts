/**
 * Recursive Backtracker is more efficient than Hunt and Kill but it uses more memory.
 */
import { DistanceGrid } from "./distance_grid";
import { Grid } from "./grid";
import { RecursiveBacktrackerGrid } from "./recursive_backtracker_grid";


const grid = new DistanceGrid(40, 40);
RecursiveBacktrackerGrid.on(grid);

// Find the best start and finish points
const start = grid.getCell(0, 0);
if (!start) {
	throw new Error("Start cell not found");
}

const distances = start.getDistances();
grid.distances = distances;

// Path from northwest corner to southwest corner.
grid.distances = distances.getPathToGoal(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	grid.getCell(grid.numberOfRows - 1, 0)!,
);

const filename = "recursive_backtracker_grid";
const svg = grid.toSvg();
Bun.write(`${filename}.svg`, svg);
console.log(`saved to ${filename}.svg`);

// Log the solution
const solution = grid.toString(); // or grid.toSvg()
Bun.write(`${filename}_solution.txt`, solution);
