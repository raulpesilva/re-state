/*eslint-disable no-self-compare */
export const isFunction = (data: any) => {
  return typeof data === 'function';
};

export const convertMapToObj = <T extends Record<string, unknown>>(map: Map<keyof T, T[keyof T]>): T => {
  const obj = Object.fromEntries(map.entries());
  return obj as T;
};
