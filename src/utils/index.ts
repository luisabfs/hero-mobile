export const treatThumbnailUri = ({ path = '', extension = ''}): string => {
  const formattedPath = path.replace("http", "https");
  return `${formattedPath}.${extension}`;
}

export function groupArrayByThree([a,b,c,...rest]: number[]): Array<number[]>{
  if (rest.length === 0) return [[a,b,c].filter(x => x!==undefined)]
  return [[a,b,c]].concat(groupArrayByThree(rest))
}