import { ColoredGrid } from "./colored_grid";
import { HuntAndKillGrid } from "./hunt_and_kill_grid";

for (const n of [0, 1, 2, 3, 4, 5]) {
	const grid = new ColoredGrid(20, 20);
	HuntAndKillGrid.on(grid);

  const middle = grid.getCell(grid.numberOfRows / 2, grid.numberOfColumns / 2);
  if (middle === undefined) throw new Error("Middle cell is undefined");
  grid.setDistances(middle?.getDistances());

	const filename = `hunt_and_kill_${n}.svg`;
	Bun.write(filename, grid.toSvg());
	console.log(`saved to ${filename}`);
}
