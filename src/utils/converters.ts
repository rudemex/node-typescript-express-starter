export const toStringify = (data: any, replace: any = null, space: number = 2): string => {
  return JSON.stringify(data, replace, space);
};
