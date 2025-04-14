import type { Cell } from './cell.ts';
import type { Distances } from './distances.ts';
import {Grid} from './grid.ts'

export class ColoredGrid extends Grid {
  public distances: Distances | undefined = undefined;
  public maximum = 0;
  
  public setDistances(distances: Distances): [Cell, number] {
    this.distances = distances;

    const [farthestCell, maximum] = distances.max();
    
    if (farthestCell === undefined) {
      throw new Error("Furthest cell is undefined");
    }

    this.maximum = maximum;
    return [farthestCell, maximum];
  }

  public getBackgroundColorForCell(cell: Cell): string | undefined {
    const distance = this.distances?.getCell(cell);
    if (distance === undefined) {
      return undefined;
    }

    if (this.maximum === 0) {
      return 'rgb(255, 255, 255)';
    }

    const intensity = ((this.maximum - distance) / this.maximum);
    const dark = Math.round(intensity * 255);
    const bright = Math.round(128 + (127 * intensity));
    return `rgb(${dark}, ${bright}, ${dark})`;
  }
}
