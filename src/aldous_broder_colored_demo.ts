import { AldousBroderGrid } from "./aldous_broder_grid.ts";
import { ColoredGrid } from "./colored_grid.ts";

for (const n of [0, 1, 2, 3, 4, 5]) {
  const grid = new ColoredGrid(20, 20);
  AldousBroderGrid.on(grid);

  const middle = grid.getCell(grid.numberOfRows / 2, grid.numberOfColumns / 2);
  if (middle === undefined) throw new Error("Middle cell is undefined");
  
  grid.setDistances(middle?.getDistances());

  const filename = `aldous_broder_colored_${n}.svg`;
  Bun.write(filename, grid.toSvg());
  console.log(`Saved to ${filename}`);
}
