declare module 'react-native' {
  export const unstable_batchedUpdates: <TResult>(callback: () => TResult) => TResult;
}
