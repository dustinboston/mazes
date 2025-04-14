import { BinaryTree } from "./binary_tree_grid.ts";
import { DistanceGrid } from "./distance_grid.ts";

const grid = new DistanceGrid(5, 5);
BinaryTree.on(grid);

console.log(grid.toString()); // or grid.toSvg()

// Find the longest distance starting from 0, 0.
const start = grid.getCell(0, 0);
if (start === undefined) {
	throw new Error("Start cell not found");
}

// Get the distances from the start cell and then get the furthest cell.
// This is the END cell for the maze.
const distances = start.getDistances();
const [newStart, distance] = distances.max();


if (newStart === undefined) {
	throw new Error("New start cell not found");
}

// Find the furthest cell from the end cell. 
// This will be the START cell for the maze
const newDistances = newStart.getDistances();
const [goal, goalDistance] = newDistances.max();

if (goal === undefined) {
	throw new Error("Goal cell not found");
}

grid.distances = newDistances.getPathToGoal(goal);
console.log(grid.toString());
