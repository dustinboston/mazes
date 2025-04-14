import { BinaryTree } from "./binary_tree_grid.ts";
import { ColoredGrid } from "./colored_grid.ts";
import { Sidewinder } from "./sidewinder_grid.ts";

const grid = new ColoredGrid(25, 25);
Sidewinder.on(grid);

const start = grid.getCell(Math.floor(grid.numberOfRows / 2), Math.floor(grid.numberOfColumns / 2));
if (start === undefined) {
  throw new Error("Start cell is undefined");
}

grid.setDistances(start.getDistances());
const svg = grid.toSvg();

Bun.write("colorized.svg", svg);
console.log("Saved to colorized.svg");
