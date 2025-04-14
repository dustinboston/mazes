import type { Cell } from "./cell";

export class Distances {
	public root: Cell | undefined = undefined;
	public cells: Map<Cell, number> = new Map();

	constructor(root: Cell) {
		this.root = root;
		this.cells.set(root, 0);
	}

	getCell(cell: Cell) {
		return this.cells.get(cell);
	}

	setCell(cell: Cell, distance: number) {
		this.cells.set(cell, distance);
	}

	getCells() {
		return Array.from(this.cells.keys());
	}

	getPathToGoal(goal: Cell) {
		let current = goal;
		const breadcrumbs = new Distances(current);
		breadcrumbs.setCell(current, this.getCell(current) || 0);

		while (current !== this.root) {
			for (const neighbor of current.getLinks()) {
				const neighborDistance = this.getCell(neighbor);
				const currentDistance = this.getCell(current);
				if (neighborDistance !== undefined && currentDistance !== undefined) {
					if (neighborDistance < currentDistance) {
						breadcrumbs.setCell(neighbor, neighborDistance);
						current = neighbor;
					}
				}
			}
		}
		return breadcrumbs;
	}

	max(): [Cell | undefined, number] {
		let maxDistance = 0;
		let maxCell = this.root;

		for (const [cell, distance] of this.cells.entries()) {
			if (distance > maxDistance) {
				maxCell = cell;
				maxDistance = distance;
			}
		}

		return [maxCell, maxDistance];
	}
}
