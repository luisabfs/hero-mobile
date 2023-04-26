export const treatThumbnailUri = ({ path = '', extension = ''}): string => {
    const formattedPath = path.replace("http", "https");
    return `${formattedPath}.${extension}`;
  }