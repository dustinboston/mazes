import { BinaryTree } from "./binary_tree_grid.ts";
import { DistanceGrid } from "./distance_grid.ts";


const grid: DistanceGrid = new DistanceGrid(10, 10);
BinaryTree.on(grid);

const gridSvg = grid.toSvg(); // or grid.toSvg()
Bun.write("grid.svg", gridSvg);

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

// Log the solution
const solution = grid.toString(); // or grid.toSvg()
Bun.write("solution.txt", solution);
