export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export type MatrixData = Cell[][];

export interface MatrixParams {
  m: number; // rows
  n: number; // columns
  x: number; // nearest cells count
}
