import { AldousBroderGrid } from "./aldous_broder_grid.ts";
import {Grid} from "./grid.ts";

const grid = new Grid(20, 20);
const aldousBroderGrid = AldousBroderGrid.on(grid);

Bun.write('aldous_broder.svg', aldousBroderGrid.toSvg());
console.log("Saved to aldous_broder.svg");
