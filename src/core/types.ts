export type FnVoid = () => void;
export type UniqueKey = string | symbol;
export type SetReStateAction<S> = S | ((prevState: S) => S) | undefined;
export type CompareStore = (prevStore: any, newStore: any) => void;
