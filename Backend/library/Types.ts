export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Nullish<T = null> = T extends null
  ? null | undefined
  : T | null | undefined;
