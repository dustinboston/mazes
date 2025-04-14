import { Grid } from "./grid.ts";
import { Sidewinder } from "./sidewinder_grid.ts";

const gridWidth = 20;
const gridHeight = 20;

const grid: Grid = new Grid(gridWidth, gridHeight);
Sidewinder.on(grid);
console.log(grid.toSvg()); // or grid.toString()
