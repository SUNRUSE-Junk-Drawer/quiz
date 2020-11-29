export function findColumnIndex(
  fileName: string,
  csv: ReadonlyArray<ReadonlyArray<string>>,
  columnName: string
): number {
  if (csv.length === 0) {
    throw new Error(`The ${fileName} file is empty.`);
  } else {
    const index = csv[0].indexOf(columnName);

    if (index === -1) {
      throw new Error(
        `The ${fileName} file does not contain a "${columnName}" column.`
      );
    } else {
      return index;
    }
  }
}
