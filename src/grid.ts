import { Cell } from "./cell.ts";

export class Grid {
	public numberOfRows: number;
	public numberOfColumns: number;
	public grid: Cell[][] = [];

	static on(_grid: Grid) {
		throw new Error("Method not implemented.");
	}

	constructor(rows: number, columns: number) {
		if (rows === undefined || columns === undefined) {
			throw new Error("Rows and columns must be defined");
		}

		if (!Number.isInteger(rows) || !Number.isInteger(columns)) {
			throw new Error("Rows and columns must be integers");
		}

		if (rows < 1 || columns < 1) {
			throw new Error("Rows and columns must be greater than 0");
		}

		this.numberOfRows = rows;
		this.numberOfColumns = columns;

		this.initializeGrid();
		this.setNeighbors();
	}

	/**
	 * Initializes the grid by creating a 2D array of `Cell` objects.
	 * Each cell is instantiated with its corresponding row and column indices.
	 * This method populates the `grid` property with the initialized cells.
	 */
	public initializeGrid() {
		for (let row = 0; row < this.numberOfRows; row++) {
			if (!Array.isArray(this.grid[row])) this.grid[row] = [];
			for (let col = 0; col < this.numberOfColumns; col++) {
				this.grid[row][col] = new Cell(row, col);
			}
		}
	}

	/**
	 * Sets the neighbors for each cell in the grid.
	 * This method iterates through all cells in the grid using the `forEachCell` method
	 * and assigns neighboring cells (North, South, East, and West) to the `neighbors` property
	 * of each cell. Neighboring cells are determined based on their relative positions
	 * in the grid.
	 */
	public setNeighbors(): void {
		for (const cell of this.forEachCell()) {
			const row = cell.row;
			const col = cell.column;

			cell.north = this.getCell(row - 1, col);
			cell.south = this.getCell(row + 1, col);
			cell.east = this.getCell(row, col + 1);
			cell.west = this.getCell(row, col - 1);
		}
	}

	/**
	 * Retrieves the cell at the specified row and column in the grid.
	 * @param row - The row index of the cell to retrieve. Must be within the range [0, numberOfRows - 1].
	 * @param column - The column index of the cell to retrieve. Must be within the range [0, numberOfCols - 1].
	 * @returns The `Cell` object at the specified position, or `undefined` if the row or column is out of bounds.
	 */
	public getCell(row: number, column: number): Cell | undefined {
		if (row < 0 || row >= this.numberOfRows) return undefined;
		if (column < 0 || column >= this.numberOfColumns) return undefined;
		return this.grid[row][column] || undefined;
	}

	/**
	 * Selects a random cell from the grid.
	 * @returns {Cell | undefined} A randomly selected cell from the grid,
	 * or `undefined` if the cell cannot be retrieved.
	 */
	public randomCell(): Cell | undefined {
		const row = Math.floor(Math.random() * this.numberOfRows);
		const col = Math.floor(Math.random() * this.numberOfColumns);
		return this.getCell(row, col);
	}

	/**
	 * Calculates and returns the total number of cells in the grid.
	 * @returns The total number of cells, computed as the product of the number of rows and columns.
	 */
	public getSize(): number {
		return this.numberOfRows * this.numberOfColumns;
	}

	/**
	 * A generator function that iterates over each row in the grid.
	 * @yields {Cell[]} The next row of cells in the grid.
	 */
	public *forEachRow(): Generator<Cell[], void, unknown> {
		for (const row of this.grid) {
			yield row;
		}
	}

	/**
	 * Iterates over each cell in the grid.
	 * This generator method traverses the grid row by row, yielding each non-null cell.
	 * It relies on the `forEachRow` method to retrieve rows of cells.
	 * @yields {Cell} The next cell in the grid.
	 */
	public *forEachCell(): Generator<Cell, void, unknown> {
		for (const row of this.forEachRow()) {
			for (const cell of row) {
				if (cell) yield cell;
			}
		}
	}

	public getContentsOfCell(cell: Cell) {
		return " ";
	}

	public getBackgroundColorForCell(cell: Cell): string | undefined {
		// return "rgb(255, 255, 255)";
		return undefined;
	}

	/**
	 * Lists all cells in the grid that are dead ends.
	 * @returns An array of cells that are dead ends in the maze.
	 */
	public getDeadEnds(): Cell[] {
		const list: Cell[] = [];
		for (const cell of this.forEachCell()) {
			if (cell.getLinks().length === 1) {
				list.push(cell);
			}
		}
		return list;
	}

	public toString() {
		let output = `+${"---+".repeat(this.numberOfColumns)}\n`;

		for (const row of this.forEachRow()) {
			let top = "|";
			let bottom = "+";

			for (let cell of row) {
				if (cell === undefined) {
					cell = new Cell(-1, -1);
				}

				const body = ` ${this.getContentsOfCell(cell)} `;
				const eastBoundary = cell.isLinked(cell.east) ? " " : "|";
				const southBoundary = cell.isLinked(cell.south) ? "   " : "---";

				top += body + eastBoundary;
				bottom += `${southBoundary}+`;
			}

			output += `${top}\n${bottom}\n`;
		}

		return output;
	}

	/**
	 * Converts the maze to an SVG string.
	 * @returns {string} The SVG representation of the maze.
	 */
	toSvg(cellSize = 10): string {
		const imageWidth = cellSize * this.numberOfColumns;
		const imageHeight = cellSize * this.numberOfRows;
		const backgroundColor = "rgb(255, 255, 255)";
		const wallColor = "rgb(0, 0, 0)";

		const image = [
			`<svg width="${imageWidth}" height="${imageHeight}" xmlns="http://www.w3.org/2000/svg" style="background: ${backgroundColor};">`,
		];

		// for (const cell of this.forEachCell()) {
		// 	const x1 = cell.column * cellSize;
		// 	const y1 = cell.row * cellSize;
		// 	const x2 = (cell.column + 1) * cellSize;
		// 	const y2 = (cell.row + 1) * cellSize;

		// 	if (!cell.neighbors.N) {
		// 		image.push(
		// 			`\t<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
		// 		);
		// 	}

		// 	if (!cell.neighbors.W) {
		// 		image.push(
		// 			`\t<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
		// 		);
		// 	}

		// 	if (!cell.isLinked(cell.neighbors.E)) {
		// 		image.push(
		// 			`\t<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
		// 		);
		// 	}

		// 	if (!cell.isLinked(cell.neighbors.S)) {
		// 		image.push(
		// 			`\t<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
		// 		);
		// 	}
		// }

		for (const mode of ["backgrounds", "walls"]) {
			for (const cell of this.forEachCell()) {
				const x1 = cell.column * cellSize;
				const y1 = cell.row * cellSize;
				const x2 = (cell.column + 1) * cellSize;
				const y2 = (cell.row + 1) * cellSize;

				if (mode === "backgrounds") {
					const color = this.getBackgroundColorForCell(cell);
					if (color) {
						image.push(
							`\t<rect x="${x1}" y="${y1}" width="${cellSize}" height="${cellSize}" fill="${color}" />`,
						);
					}
				} else {
					if (!cell.north) {
						image.push(
							`\t<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
						);
					}

					if (!cell.west) {
						image.push(
							`\t<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
						);
					}

					if (!cell.isLinked(cell.east)) {
						image.push(
							`\t<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
						);
					}

					if (!cell.isLinked(cell.south)) {
						image.push(
							`\t<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="${wallColor}" stroke-width="1" fill="none" stroke-linecap="round" />`,
						);
					}
				}
			}
		}

		image.push("</svg>");

		return image.join("\n");
	}
}
