import { COLUMN_NUMBER } from "app-const";

export const getColumnKey = (col: string, row: number) => {
  const rowNumber = COLUMN_NUMBER[col] + row;
  return Object.keys(COLUMN_NUMBER).find((key) => COLUMN_NUMBER[key] === rowNumber);
};
