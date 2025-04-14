import { BinaryTree } from "./binary_tree_grid.ts";
import { Grid } from "./grid.ts";

const gridWidth = 5;
const gridHeight = 5;

const grid: Grid = new Grid(gridWidth, gridHeight);
BinaryTree.on(grid);
console.log(grid.toString()); // or grid.toSvg()
