import { AldousBroderGrid } from "./aldous_broder_grid";
import { BinaryTree } from "./binary_tree_grid";
import { Grid } from "./grid";
import { HuntAndKillGrid } from "./hunt_and_kill_grid";
import { RecursiveBacktrackerGrid } from "./recursive_backtracker_grid";
import { Sidewinder } from "./sidewinder_grid";
import { WilsonsGrid } from "./wilsons_grid";

const algorithms: (typeof Grid)[] = [
	BinaryTree,
	Sidewinder,
	AldousBroderGrid,
	WilsonsGrid,
	HuntAndKillGrid,
	RecursiveBacktrackerGrid
];

const tries = 100;
const size = 20;

const averages = new Map<typeof Grid, number>();

for (const algorithm of algorithms) {
	console.log(`Running ${algorithm.name}...`);

	const deadEndCounts = [];
	for (let i = 0; i < tries; i++) {
		const grid = new Grid(size, size);
		algorithm.on(grid);
		deadEndCounts.push(grid.getDeadEnds().length);
	}

	const totalDeadEnds = deadEndCounts.reduce((s, a) => s + a, 0);
	averages.set(algorithm, totalDeadEnds / deadEndCounts.length);
}

const totalCells = size * size;

console.log(
	`\nAverage dead-ends per ${size}x${size} maze (${totalCells} cells):\n`,
);

const sortedAlgorithms = algorithms.sort((a, b) => {
	const avgA = averages.get(a) ?? 0;
	const avgB = averages.get(b) ?? 0;
	return avgB - avgA; // Sort in descending order
});

for (const algorithm of sortedAlgorithms) {
  const percentage = (averages.get(algorithm) ?? 0) * 100 / (size * size);
  console.log(`${algorithm.name} : ${averages.get(algorithm)?.toFixed(2)}/${totalCells} (${percentage.toFixed(2)}%)`);
}
