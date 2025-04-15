import {ColoredGrid} from "./colored_grid";
import { WilsonsGrid } from "./wilsons_grid";

for (const n of [0, 1, 2, 3, 4, 5]) {
  const grid = new ColoredGrid(20, 20);
  WilsonsGrid.on(grid);

  const middle = grid.getCell(grid.numberOfRows / 2, grid.numberOfColumns / 2);
  if (middle === undefined) throw new Error("Middle cell is undefined");
  grid.setDistances(middle?.getDistances());

  const deadends = grid.getDeadends();
  console.log(`${deadends.length} dead ends`);

  Bun.write(`wilsons_${n}.svg`, grid.toSvg());
  console.log(`saved to wilsons_${n}.svg`);
}
