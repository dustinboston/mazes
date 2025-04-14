import { Distances } from "./distances";

type Links = Map<Cell, boolean>;

export class Cell {
	public row: number;
	public column: number;
	public north: Cell | undefined;
	public south: Cell | undefined;
	public east: Cell | undefined;
	public west: Cell | undefined;
	public links: Links = new Map();

	constructor(row: number, column: number) {
		if (row === undefined || column === undefined) {
			throw new Error("Row and column must be defined");
		}
		this.row = row;
		this.column = column;
	}

	/**
	 * Link this cell to another cell.
	 * @param cell - The cell to link to.
	 * @param bidirectional - Record the connection in both cells.
	 * @returns this
	 */
	link(cell: Cell, bidirectional = true): this {
		this.links.set(cell, true);
		if (bidirectional) cell.link(this, false);
		return this;
	}

	/**
	 * Unlink this cell from another cell.
	 * @param cell - The cell to unlink.
	 * @param bidirectional - Remove the connection in both cells.
	 * @returns this
	 */
	unlink(cell: Cell, bidirectional = true): this {
		this.links.delete(cell);
		if (bidirectional) cell.unlink(this, false);
		return this;
	}

	/**
	 * Get a list of all cells linked to this cell.
	 * @returns An array of cells.
	 */
	getLinks(): Cell[] {
		return Array.from(this.links.keys());
	}

	/**
	 * Check if this cell is linked to another cell.
	 * @param cell - The cell to check.
	 * @returns True if linked, false otherwise.
	 */
	isLinked(cell?: Cell) {
		return (cell === undefined) ? false : this.links.has(cell);
	}

	/**
	 * Get all neighbors of this cell.
	 * @returns An array of neighboring cells.
	 */
	getNeighbors() {
		const neighbors: Cell[] = [];
		if (this.north !== undefined) neighbors.push(this.north);
		if (this.south !== undefined) neighbors.push(this.south);
		if (this.east !== undefined) neighbors.push(this.east);
		if (this.west !== undefined) neighbors.push(this.west);
		return neighbors;
	}

	getDistances(): Distances {
    const distances = new Distances(this);
    let frontier: Cell[] = [this];

    while (frontier.length > 0) {
      const newFrontier: Cell[] = [];

      for (const cell of frontier) {
        for (const linked of cell.getLinks()) {
          if (distances.getCell(linked) !== undefined) continue;

          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          distances.setCell(linked, distances.getCell(cell)! + 1);
          newFrontier.push(linked);
        }
      }
      frontier = newFrontier;
    }

    return distances;
  }
}
