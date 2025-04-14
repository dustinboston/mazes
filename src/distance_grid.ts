import type { Cell } from "./cell";
import type { Distances } from "./distances";
import { Grid } from "./grid";

export class DistanceGrid extends Grid {
	public distances: Distances | undefined = undefined;

	public getContentsOfCell(cell: Cell): string {
    const distance = this.distances?.getCell(cell);

		if (distance !== undefined) {
			return distance.toString(36);
		}

		return super.getContentsOfCell(cell);
	}
}
